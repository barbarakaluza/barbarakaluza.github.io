import React, { useState } from "react";
import RecipeForm from "../Form/RecipeForm";


const ButtonAdd = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleForm} className="button">
        Dodaj przepis +
      </button>
      {showForm && (
        <div className="overlay">
          <RecipeForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default ButtonAdd;