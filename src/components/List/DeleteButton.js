import React from 'react';
import { deleteRecipeFromAirtable } from '../../api/airtable';

const DeleteButton = ({ recipeId, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Czy na pewno chcesz usunąć ten przepis?");

    if (confirmDelete) {
      try {
        await deleteRecipeFromAirtable(recipeId); // Wywołanie funkcji usuwania przepisu
        onDelete(recipeId); // Funkcja callback, która powinna zaktualizować stan w rodzicu (np. usunięcie przepisu z listy)
        alert("Przepis został usunięty!"); // Potwierdzenie usunięcia
      } catch (error) {
        console.error("Błąd przy usuwaniu przepisu:", error);
        alert("Wystąpił błąd przy usuwaniu przepisu.");
      }
    } else {
      // Jeśli użytkownik kliknie "Anuluj", nic się nie stanie
      console.log("Usuwanie przepisu zostało anulowane.");
    }
  };

  return (
    <button className="button button-delete" onClick={handleDelete}>
      Usuń
    </button>
  );
};

export default DeleteButton;
