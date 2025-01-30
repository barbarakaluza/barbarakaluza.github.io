import { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { fetchRecipes, fetchRecipeById } from '../../api/airtable';
import RecipeForm from "../Form/RecipeForm";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(true);  // Stan kontrolujący widoczność całego kontenera

  useEffect(() => {
    const getRecipes = async () => {
      const recipesData = await fetchRecipes();
      setRecipes(recipesData);
    };
    getRecipes();
  }, []);

  const handleDeleteRecipe = (recipeId) => {
    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
  };

  const handleShowForm = async (recipeId) => {
    setLoading(true);
    try {
      const recipeData = await fetchRecipeById(recipeId);
      setSelectedRecipe(recipeData);
      setShowForm(true);
    } catch (error) {
      console.error('Błąd przy pobieraniu przepisu:', error);
      alert('Wystąpił błąd przy pobieraniu przepisu.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedRecipe(null);
  };

  // Funkcja, która ukrywa cały kontener listy przepisów
  const handleCloseList = () => {
    setShowList(false);  // Ustawienie stanu na false ukrywa cały kontener
  };

  return (
    <>
      {showList && (
        <div className="recipe-list-container">
          {/* Przycisk zamknięcia całego kontenera */}
          <h2 className="list-title">Lista Przepisów</h2>
          <button className="close-button" onClick={handleCloseList}>
            &times;
          </button>

          {/* Renderowanie listy tylko jeśli showList jest true */}
          {recipes.length > 0 ? (
            <ul>
              {recipes.map((recipe) => (
                <li key={recipe.id} className="recipe-title">
                  <span>{recipe.fields?.['recipe-title'] || 'Brak tytułu'}</span>
                  <EditButton onClick={() => handleShowForm(recipe.id)} />
                  <DeleteButton recipeId={recipe.id} onDelete={handleDeleteRecipe} />
                </li>
              ))}
            </ul>
          ) : (
            <p>Brak przepisów. Dodaj nowy!</p>
          )}
        </div>
      )}

      {showForm && selectedRecipe && !loading ? (
        <RecipeForm
          recipe={selectedRecipe}
          onClose={handleCloseForm}
          onAddRecipe={(updatedRecipe) => {
            setRecipes((prevRecipes) =>
              prevRecipes.map((recipe) =>
                recipe.id === updatedRecipe.id ? updatedRecipe : recipe
              )
            );
            handleCloseForm();
          }}
        />
      ) : (
        loading && <p>Ładowanie danych...</p>
      )}
    </>
  );
};

export default RecipeList;
