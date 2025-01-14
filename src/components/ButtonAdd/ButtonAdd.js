import React, { useState } from "react";
import RecipeForm from "../Form/RecipeForm";
import RecipeList from "../List/RecipeList";
import RecipeDetails from "../List/RecipeDetails";

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

  const addRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const showDetails = (index) => {
    setSelectedRecipe(index);
  };

  const deleteRecipe = (index) => {
    setRecipes((prevRecipes) => prevRecipes.filter((_, i) => i !== index));
    setSelectedRecipe(null);
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