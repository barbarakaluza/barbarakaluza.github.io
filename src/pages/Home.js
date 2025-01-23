import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import ButtonAdd from "../components/ButtonAdd/ButtonAdd";
import Footer from "../components/Footer/Footer";
import RecipeList from "../components/List/RecipeList";
import RecipeDetails from "../components/List/RecipeDetails";
import { fetchRecipes, deleteRecipeFromAirtable } from "../api/airtable"; // Funkcje do API Airtable

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Funkcja usuwająca przepis z Airtable
  const deleteRecipe = async (recipeId) => {
    // Wywołanie funkcji usuwającej z Airtable
    await deleteRecipeFromAirtable(recipeId);
    // Zaktualizowanie stanu przepisów po usunięciu
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== recipeId));
    setSelectedRecipe(null);  // Zamknięcie widoku szczegółów przepisu
  };

  // Funkcja dodająca nowy przepis do stanu
  const addRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const loadRecipes = async () => {
    const fetchedRecipes = await fetchRecipes();
    setRecipes(fetchedRecipes);
  };

  useEffect(() => {
    loadRecipes(); // Załadowanie przepisów przy pierwszym renderze
  }, []);

  return (
    <div>
      <div className="button-container">
        <ButtonAdd onAddRecipe={addRecipe} />  {/* Przekazujemy funkcję dodawania przepisu */}
      </div>

      <Header />
      <Footer />
      <RecipeList 
        recipes={recipes} 
        onShowDetails={(index) => setSelectedRecipe(index)} 
        onDelete={deleteRecipe} // Przekazujemy funkcję usuwania do listy
        onClose={() => setSelectedRecipe(null)} 
      />
      {selectedRecipe !== null && (
        <RecipeDetails
          recipe={recipes[selectedRecipe]}
          onClose={() => setSelectedRecipe(null)}
          onDelete={() => deleteRecipe(recipes[selectedRecipe].id)} // Usuwanie przepisu z bazy
        />
      )}
    </div>
  );
}

export default Home;
