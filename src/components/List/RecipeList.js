import React from "react";

const RecipeList = ({ recipes, onShowDetails, onClose, onDelete }) => {
  // Zapewnienie, że `recipes` jest tablicą
  const safeRecipes = Array.isArray(recipes) ? recipes : [];

  return (
    <div className="recipe-list-container">
      <button className="close-button" onClick={onClose}>
        &times; {/* Przycisk zamykający listę */}
      </button>
      <h2>Lista Przepisów</h2>
      {safeRecipes.length === 0 ? (
        <p>Brak zapisanych przepisów.</p>
      ) : (
        <ul>
          {safeRecipes.map((recipe, index) => (
            <li key={recipe.id || index}>
              <button
                className="recipe-title"
                onClick={() => onShowDetails(index)} // Pokazuje szczegóły przepisu
              >
                {recipe.fields?.["recipe-title"] || "Brak tytułu"}
              </button>
              <button
                onClick={() => onDelete(recipe.id)} // Usuwa przepis
                className="delete-button"
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
