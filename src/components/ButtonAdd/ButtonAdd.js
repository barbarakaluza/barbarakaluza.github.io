import React, { useState } from "react";
import RecipeForm from "../Form/RecipeForm";
import { addRecipeToAirtable } from "../../api/airtable"; 


const ButtonAdd = ({ onAddRecipe }) => {
  const [showForm, setShowForm] = useState(false);

  // Funkcja otwierająca lub zamykająca formularz
  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  // Funkcja obsługująca dodanie przepisu
  const handleAddRecipe = async (newRecipe) => {
    try {
      const savedRecipe = await addRecipeToAirtable(newRecipe);
      onAddRecipe(savedRecipe); // Dodanie przepisu do stanu w `Home.js`
      setShowForm(false); // Zamknięcie formularza po dodaniu przepisu
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div>
      <button onClick={toggleForm} className="button add-button">
        Dodaj przepis +
      </button>

      {showForm && (
        <div className="overlay">
          <RecipeForm
            onClose={() => setShowForm(false)}
            onAddRecipe={handleAddRecipe}
          />
        </div>
      )}
    </div>
  );
};

export default ButtonAdd;
