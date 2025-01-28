import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ButtonAdd from "./ButtonAdd";
import { addRecipeToAirtable } from "../../api/airtable"; // Mockujemy tę funkcję w testach

jest.mock("../../api/airtable", () => ({
  addRecipeToAirtable: jest.fn(),
}));

describe("ButtonAdd", () => {
  it("should show the form when clicked", () => {
    render(<ButtonAdd onAddRecipe={jest.fn()} />);

    // Kliknij przycisk, aby pokazać formularz
    fireEvent.click(screen.getByText(/Dodaj przepis/i));

    // Sprawdź, czy formularz jest widoczny (np. na podstawie jakiegoś elementu formularza)
    expect(screen.getByText(/Wprowadź dane przepisu/i)).toBeInTheDocument();
  });

  it("should call onAddRecipe when recipe is added", async () => {
    const mockAddRecipe = jest.fn();
    const newRecipe = { title: "Test Recipe" };

    // Mockujemy odpowiedź z API
    addRecipeToAirtable.mockResolvedValue({
      id: "123",
      fields: {
        "recipe-title": "Test Recipe",
      },
    });

    render(<ButtonAdd onAddRecipe={mockAddRecipe} />);

    // Kliknij przycisk, aby pokazać formularz
    fireEvent.click(screen.getByText(/Dodaj przepis/i));

    // Wypełnij formularz (symulujemy wpisywanie)
    fireEvent.change(screen.getByLabelText(/Tytuł/i), { target: { value: newRecipe.title } });

    // Kliknij przycisk dodania przepisu
    fireEvent.submit(screen.getByText(/Dodaj przepis/i));

    // Sprawdź, czy funkcja `onAddRecipe` została wywołana po dodaniu przepisu
    await waitFor(() => {
      expect(mockAddRecipe).toHaveBeenCalledTimes(1);
    });

    // Opcjonalnie: sprawdź, czy formularz został zamknięty po dodaniu
    expect(screen.queryByText(/Wprowadź dane przepisu/i)).not.toBeInTheDocument();
  });

  it("should handle errors when adding a recipe", async () => {
    const mockAddRecipe = jest.fn();
    const newRecipe = { title: "Test Recipe" };

    // Mockujemy, aby API zwróciło błąd
    addRecipeToAirtable.mockRejectedValue(new Error("Failed to add recipe"));

    render(<ButtonAdd onAddRecipe={mockAddRecipe} />);

    fireEvent.click(screen.getByText(/Dodaj przepis/i));

    fireEvent.change(screen.getByLabelText(/Tytuł/i), { target: { value: newRecipe.title } });
    fireEvent.submit(screen.getByText(/Dodaj przepis/i));

    // Sprawdź, czy w przypadku błędu, odpowiednia funkcjonalność jest zaimplementowana
    await waitFor(() => {
      expect(mockAddRecipe).toHaveBeenCalledTimes(0); // Funkcja `onAddRecipe` nie powinna być wywołana
    });

    // Opcjonalnie: możesz dodać test sprawdzający, czy w przypadku błędu wyświetlono komunikat
    expect(screen.getByText(/Błąd dodawania przepisu/i)).toBeInTheDocument();
  });
});
