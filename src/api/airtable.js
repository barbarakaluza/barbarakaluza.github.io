import axios from 'axios';

const API_URL = `https://api.airtable.com/v0/appuLEuwyXhM60qVx/Recipes`;
const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;

console.log("API_URL:", API_URL);
console.log("API_KEY:", API_KEY ? "Klucz dostępny" : "Brak klucza API!");

export const addRecipeToAirtable = async (recipeData) => {
  try {
    console.log("Dodawanie przepisu:", recipeData);

    // Zastosowanie odpowiednich nazw pól z Airtable
    const recipeFields = {
      'recipe-title': recipeData.title,
      'recipe-ingredients': recipeData.ingredients,
      'recipe-steps': recipeData.steps,
      'recipe-time': recipeData.preparationTime
    };

    const recipesToAdd = {
      records : [{ fields : recipeFields }]
    }

    const response = await axios.post(API_URL, recipesToAdd, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log("Przepis zapisany:", response.data.records[0]);

    return response.data.records[0];
  } catch (error) {
    console.error('Error adding recipe to Airtable:', error.response ? error.response.data : error);
    throw error; 
  }
};

    

// Funkcja usuwania przepisu
export const deleteRecipeFromAirtable = async (recipeId) => {
  try {
    console.log("Usuwanie przepisu o ID:", recipeId);
    const response = await axios.delete(`${API_URL}/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    console.log("Przepis usunięty:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting recipe from Airtable:', error);
  }
};

export const fetchRecipes = async () => {
  try {
    console.log("Pobieranie przepisów z Airtable...");
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    console.log("Pobrane przepisy:", response.data.records); // Logowanie danych
    return response.data.records;  // Zwrócenie tylko 'records', ponieważ to są właściwe dane
  } catch (error) {
    console.error('Error fetching recipes from Airtable:', error);
  }
};
