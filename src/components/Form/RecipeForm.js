import React, { useState, useEffect } from "react";

const RecipeForm = React.memo(({ onClose, onAddRecipe, recipe = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    preparationTime: "",
  });

  useEffect(() => {
    if (recipe) {
      // Jeżeli mamy przepis (edycja), to ustawiamy dane w formularzu
      setFormData({
        title: recipe['recipe-title'] || "",
        ingredients: recipe['recipe-ingredients'] || "",
        steps: recipe['recipe-steps'] || "",
        preparationTime: recipe['recipe-time'] || "",
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const preparationTime = Number(formData.preparationTime);

    if (isNaN(preparationTime)) {
      alert('Czas przygotowania musi być liczbą!');
      return;
    }

    const recipeData = {
      title: formData.title,
      ingredients: formData.ingredients,
      steps: formData.steps,
      preparationTime: preparationTime,
    };

    try {
      const updatedRecipe = recipe
        ? { ...recipeData, id: recipe.id }
        : recipeData;

      onAddRecipe(updatedRecipe);

      alert("Przepis został zapisany!");

      setFormData({ title: "", ingredients: "", steps: "", preparationTime: "" });
      onClose();
    } catch (error) {
      console.error("Błąd przy zapisywaniu przepisu:", error);
      alert("Wystąpił błąd podczas zapisywania przepisu.");
    }
  };

  return (
    <div className="overlay">
      <div className="recipe-form-container centered-form">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit} className="recipe-form">
          <h2>{recipe ? "Edytuj przepis" : "Dodaj nowy przepis"}</h2>

          <div>
            <label htmlFor="title">Nazwa przepisu:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
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
              value={formData.ingredients}
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
              value={formData.steps}
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
              value={formData.preparationTime}
              onChange={handleChange}
              placeholder="Wpisz czas w minutach"
              required
            />
          </div>

          <button className="button button-save" type="submit">
            Zapisz przepis
          </button>
        </form>
      </div>
    </div>
  );
});

export default RecipeForm;
