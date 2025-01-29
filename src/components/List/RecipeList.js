import { useEffect, useState} from "react";
import DeleteButton from "./DeleteButton";
import { fetchRecipes } from '../../api/airtable'; // Dopasuj ścieżkę

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  // Funkcja do pobrania przepisów przy załadowaniu komponentu
  useEffect(() => {
    const getRecipes = async () => {
      const recipesData = await fetchRecipes();
      setRecipes(recipesData);
    };
    getRecipes();
  }, []);

  // Funkcja do usuwania przepisu z lokalnego stanu
  const handleDeleteRecipe = (recipeId) => {
    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
  };

  return (
    <div className="recipe-list-container">
      <h2>Lista Przepisów</h2>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id} className="recipe-title">
              {recipe.fields?.['recipe-title'] || 'Brak tytułu'}
              <DeleteButton recipeId={recipe.id} onDelete={handleDeleteRecipe} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak przepisów. Dodaj nowy!</p>
      )}
    </div>
  );
};

export default RecipeList;

