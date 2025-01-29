import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import ButtonAdd from "../components/ButtonAdd/ButtonAdd"; // Przycisk do dodawania przepisów
import Footer from "../components/Footer/Footer";
import RecipeList from "../components/List/RecipeList"; // Komponent listy przepisów
import ButtonList from "../components/ButtonList/ButtonList"; // Komponent przycisku wyświetlającego listę
import RecipeDetails from "../components/List/RecipeDetails"; // Komponent szczegółów przepisu
import { fetchRecipes, deleteRecipeFromAirtable } from "../api/airtable"; // Funkcje do pobierania i usuwania przepisów

function Home() {
  const [recipes, setRecipes] = useState([]); // Lista przepisów
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Wybrany przepis
  const [isListVisible, setIsListVisible] = useState(false); // Stan widoczności listy przepisów
  // Pobieranie przepisów z API
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipes();
        setRecipes(fetchedRecipes || []);
      } catch (error) {
        console.error("Błąd podczas ładowania przepisów:", error);
      }
    };

    loadRecipes();
  }, []);

  // Dodawanie nowego przepisu do listy
  const addRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  // Usuwanie przepisu z listy
  const deleteRecipe = async (recipeId) => {
    try {
      await deleteRecipeFromAirtable(recipeId);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== recipeId));
      setSelectedRecipe(null); // Zamknięcie szczegółów przepisu po usunięciu
    } catch (error) {
      console.error("Błąd podczas usuwania przepisu:", error);
    }
  };

  // Toggle listy przepisów
  const toggleListVisibility = () => {
    setIsListVisible((prev) => !prev);
  };

  return (
    <div>
      <Header />
      <div className="button-container">
        <ButtonAdd onAddRecipe={addRecipe} /> {/* Przycisk do dodawania przepisu */}
        
        {/* Komponent ButtonList z przyciskiem do wyświetlania/ukrywania listy */}
        <ButtonList recipes={recipes} />
      </div>

      {/* Lista przepisów pojawia się, gdy isListVisible jest true */}
      {isListVisible && (
        <RecipeList
          recipes={recipes}
          onShowDetails={(index) => setSelectedRecipe(index)}
          onDelete={deleteRecipe}
          onClose={toggleListVisibility}
        />
      )}

      {/* Wyświetlanie szczegółów przepisu */}
      {selectedRecipe !== null && (
        <RecipeDetails
          recipe={recipes[selectedRecipe]}
          onClose={() => setSelectedRecipe(null)}
          onDelete={() => deleteRecipe(recipes[selectedRecipe].id)}
        />
      )}

      <Footer />
    </div>
  );
}

export default Home;
