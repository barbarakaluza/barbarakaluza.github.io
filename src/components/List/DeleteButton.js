import React from 'react';
import { deleteRecipeFromAirtable } from '../../api/airtable';

const DeleteButton = ({ recipeId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteRecipeFromAirtable(recipeId); // Wywołanie funkcji usuwania przepisu
      onDelete(recipeId); // Funkcja callback, która powinna zaktualizować stan w rodzicu (np. usunięcie przepisu z listy)
    } catch (error) {
      console.error("Błąd przy usuwaniu przepisu:", error);
    }
  };

  return (
    <button className="button-delete" onClick={handleDelete}>
      Usuń
    </button>
  );
};

export default DeleteButton;
