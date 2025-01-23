import React, { useState } from "react";
import RecipeForm from "../Form/RecipeForm";
import RecipeList from "../List/RecipeList";
import RecipeDetails from "../List/RecipeDetails";

// Funkcja do dodania przepisu do Airtable
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
  return data;
};

const ButtonAdd = () => {
  const [showForm, setShowForm] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [showList, setShowList] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const toggleList = () => {
    setShowList((prev) => !prev);
  };

  const addRecipe = async (newRecipe) => {
    // Dodajemy przepis do Airtable
    const savedRecipe = await addRecipeToAirtable(newRecipe);

    // Po zapisaniu w Airtable, dodajemy przepis do stanu aplikacji
    setRecipes((prevRecipes) => [...prevRecipes, savedRecipe]);
  };

  const showDetails = (index) => {
    setSelectedRecipe(index);
  };

  const deleteRecipe = (index) => {
    const recipeToDelete = recipes[index];
    setRecipes((prevRecipes) => prevRecipes.filter((_, i) => i !== index));
    setSelectedRecipe(null);

    // Opcjonalnie, jeśli chcesz usunąć przepis z Airtable:
    deleteRecipeFromAirtable(recipeToDelete.id);
  };

  // Funkcja do usunięcia przepisu z Airtable
  const deleteRecipeFromAirtable = async (recipeId) => {
    const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
    const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
    const TABLE_NAME = process.env.REACT_APP_AIRTABLE_TABLE_NAME;

    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${recipeId}`;
    
    await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
  };

  return (
    <div>
      <div className="button-container">
        <button onClick={toggleForm} className="button add-button">
          Dodaj przepis +
        </button>
        <button onClick={toggleList} className="button list-button">
          Przepisy ☰
        </button>
      </div>

      {showForm && (
        <div className="overlay">
          <RecipeForm onClose={() => setShowForm(false)} onAddRecipe={addRecipe} />
        </div>
      )}
      {showList && (
        <div className="overlay">
          <RecipeList
            recipes={recipes}
            onShowDetails={showDetails}
            onClose={() => setShowList(false)}
          />
        </div>
      )}
      {selectedRecipe !== null && (
        <div className="overlay">
          <RecipeDetails
            recipe={recipes[selectedRecipe]}
            onClose={() => setSelectedRecipe(null)}
            onDelete={() => deleteRecipe(selectedRecipe)}
          />
        </div>
      )}
    </div>
  );
};

export default ButtonAdd;
