import React from 'react';

const RecipeDetails = ({ recipe, onClose, onDelete }) => {
  const { "recipe-title": title, "recipe-ingredients": ingredients, "recipe-steps": steps, "recipe-time": preparationTime } = recipe.fields || {};

  return (
    <div className="recipe-details-container">
      <button className="close-button" onClick={onClose}>&times;</button>
      <h2>{title}</h2>
      <p><strong>Składniki:</strong></p>
      <p>{ingredients}</p>
      <p><strong>Kroki:</strong></p>
      <p>{steps}</p>
      <p><strong>Czas przygotowania:</strong> {preparationTime} minut</p>
      <button onClick={onDelete} className="delete-button">Usuń przepis</button>
    </div>
  );
};

export default RecipeDetails;
