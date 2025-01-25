import React from 'react';

const RecipeList = ({ recipes, onShowDetails, onClose, onDelete }) => {
  // Sprawdzamy, czy `recipes` jest tablicą, jeśli nie to ustawiamy pustą tablicę
  const safeRecipes = Array.isArray(recipes) ? recipes : [];

  return (
    <div className="recipe-list-container">
      <button className="close-button" onClick={onClose}>&times;</button>
      <h2>Lista Przepisów</h2>
      {safeRecipes.length === 0 ? (
        <p>Brak zapisanych przepisów.</p>
      ) : (
        <ul>
          {safeRecipes.map((recipe, index) => (
            <li key={recipe.id || index}> {/* Unikalny klucz */}
              <button 
                className="recipe-title" 
                onClick={() => onShowDetails(index)} // Pokazuje szczegóły przepisu
              >
                {recipe.fields?.["recipe-title"] || "Brak tytułu"}  {/* Zapewnienie wartości domyślnej */}
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
