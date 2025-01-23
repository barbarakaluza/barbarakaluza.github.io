import React, { useState } from "react";

// Funkcja do wysyłania przepisu do Airtable
const addRecipeToAirtable = async (newRecipe) => {
  const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
  const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
  const TABLE_NAME = process.env.REACT_APP_AIRTABLE_TABLE_NAME;

  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        "recipe-title": newRecipe.title,
        "recipe-ingredients": newRecipe.ingredients,
        "recipe-steps": newRecipe.steps,
        "recipe-time": newRecipe.preparationTime,
      },
    }),
  });

  const data = await response.json();
  return data; // Zwrócenie odpowiedzi z Airtable, np. zapisanego przepisu
};

const RecipeForm = ({ onClose, onAddRecipe }) => {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    steps: "",
    preparationTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Przygotowanie danych w formacie, który odpowiada Twojej tabeli w Airtable
    const recipeData = {
      title: recipe.title,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      preparationTime: recipe.preparationTime,
    };

    // Wysłanie przepisu do Airtable
    const savedRecipe = await addRecipeToAirtable(recipeData);

    // Wywołanie funkcji onAddRecipe, aby przekazać dane do głównej aplikacji
    onAddRecipe(savedRecipe);

    alert("Przepis został zapisany!");

    // Resetowanie formularza
    setRecipe({ title: "", ingredients: "", steps: "", preparationTime: "" });
    onClose(); // Zamknięcie formularza po zapisaniu
  };

  return (
    <div className="recipe-form-container">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <form onSubmit={handleSubmit} className="recipe-form">
        <h2>Dodaj nowy przepis</h2>

        <div>
          <label htmlFor="title">Nazwa przepisu:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            placeholder="Wpisz nazwę przepisu"
            required
          />
        </div>

        <div>
          <label htmlFor="ingredients">Składniki:</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            placeholder="Wpisz składniki, każdy w osobnej linii"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="steps">Kroki przygotowania:</label>
          <textarea
            id="steps"
            name="steps"
            value={recipe.steps}
            onChange={handleChange}
            placeholder="Opisz kroki przygotowania"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="preparationTime">Czas przygotowania (minuty):</label>
          <input
            type="number"
            id="preparationTime"
            name="preparationTime"
            value={recipe.preparationTime}
            onChange={handleChange}
            placeholder="Wpisz czas w minutach"
            required
          />
        </div>

        <button className="button" type="submit">Zapisz przepis</button>
      </form>
    </div>
  );
};

export default RecipeForm;
