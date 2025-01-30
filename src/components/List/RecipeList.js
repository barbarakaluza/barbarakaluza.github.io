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
    console.log('Załadowano formularz dla przepisu o ID:', recipeId);
    try {
      const recipeData = await fetchRecipeById(recipeId);
      console.log('Pobrany przepis:', recipeData);
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

  return (
    <div className="recipe-list-container">
      <h2>Lista Przepisów</h2>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id} className="recipe-title">
              {recipe.fields?.['recipe-title'] || 'Brak tytułu'}
              <EditButton onClick={() => handleShowForm(recipe.id)} />
              <DeleteButton recipeId={recipe.id} onDelete={handleDeleteRecipe} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak przepisów. Dodaj nowy!</p>
      )}

      {showForm && selectedRecipe && !loading ? (
        <>
          {console.log('Renderujemy formularz...')}
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
        </>
      ) : (
        loading && <p>Ładowanie danych...</p>
      )}
    </div>
  );
};

export default RecipeList;
