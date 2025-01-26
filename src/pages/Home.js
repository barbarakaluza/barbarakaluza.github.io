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
  const [isListVisible, setIsListVisible] = useState(false);  // Nowy stan kontrolujący widoczność listy

  // Funkcja usuwająca przepis z Airtable
  const deleteRecipe = async (recipeId) => {
    try {
      await deleteRecipeFromAirtable(recipeId);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== recipeId));
      setSelectedRecipe(null);  // Zamknięcie widoku szczegółów przepisu
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  // Funkcja dodająca nowy przepis do stanu
  const addRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const loadRecipes = async () => {
    try {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error("Error loading recipes:", error);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  // Funkcja do toggle'owania widoczności listy
  const toggleListVisibility = () => {
    setIsListVisible(prevState => !prevState);
  };

  
  return (
    <div>
      <div className="button-container">
        <ButtonAdd onAddRecipe={addRecipe} />
        <button className="button display" onClick={toggleListVisibility}>
          {isListVisible ? "Hide List" : "Show List"}  {/* Zmieniamy tekst przycisku */}
        </button>
      </div>

      <Header />
      <Footer />

      {/* Lista przepisów tylko, jeśli isListVisible jest true */}
      {isListVisible && (
        <RecipeList 
          recipes={recipes} 
          onShowDetails={(index) => setSelectedRecipe(index)} 
          onDelete={deleteRecipe} 
          onClose={() => setSelectedRecipe(null)} 
        />
      )}

      {selectedRecipe !== null && (
        <RecipeDetails
          recipe={recipes[selectedRecipe]}
          onClose={() => setSelectedRecipe(null)}
          onDelete={() => deleteRecipe(recipes[selectedRecipe].id)}
        />
      )}
    </div>
  );
}

export default Home;
