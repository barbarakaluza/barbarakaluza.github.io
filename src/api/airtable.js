import axios from 'axios';

const API_URL = 'https://api.airtable.com/v0/app62rzZFUnrD0MxA/Recipes';
const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;

// Funkcja dodawania przepisu
export const addRecipeToAirtable = async (recipeData) => {
  try {
    const response = await axios.post(API_URL, recipeData, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding recipe to Airtable:', error);
  }
};

// Funkcja usuwania przepisu
export const deleteRecipeFromAirtable = async (recipeId) => {
  try {
    const response = await axios.delete(`${API_URL}/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting recipe from Airtable:', error);
  }
};

// Funkcja pobierania przepisów
export const fetchRecipes = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return response.data.records;  // W Airtable dane są w polu 'records'
  } catch (error) {
    console.error('Error fetching recipes from Airtable:', error);
  }
};
