import React from 'react';

const RecipeList = ({ recipes, onShowDetails, onClose, onDelete }) => {
  return (
    <div className="recipe-list-container">
      <button className="close-button" onClick={onClose}>&times;</button>
      <h2>Lista Przepisów</h2>
      {recipes.length === 0 ? (
        <p>Brak zapisanych przepisów.</p>
      ) : (
        <ul>
          {recipes.map((recipe, index) => (
            <li key={recipe.id || index}>
              <button 
                className="recipe-title" 
                onClick={() => onShowDetails(index)}
              >
                {recipe.fields?.["recipe-title"] || "Brak tytułu"}
              </button>
              <button 
                onClick={() => onDelete(recipe.id)} 
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
