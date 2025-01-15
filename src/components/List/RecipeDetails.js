import React from 'react';

const RecipeDetails = ({ recipe, onClose, onDelete }) => {
  return (
    <div className="recipe-details-container">
      <button className="close-button" onClick={onClose}>&times;</button>
      <h2>{recipe.title}</h2>
      <p><strong>Składniki:</strong></p>
      <p>{recipe.ingredients}</p>
      <p><strong>Kroki:</strong></p>
      <p>{recipe.steps}</p>
      <p><strong>Czas przygotowania:</strong> {recipe.preparationTime} minut</p>
      <button onClick={onDelete} className="delete-button">Usuń przepis</button>
    </div>
  );
};

export default RecipeDetails;
