const RecipeList = ({ recipes, onShowDetails, onClose }) => {
    return (
      <div className="recipe-list-container">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Lista Przepisów</h2>
        {recipes.length === 0 ? (
          <p>Brak zapisanych przepisów.</p>
        ) : (
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>
                <button className="recipe-title" onClick={() => onShowDetails(index)}>
                  {recipe.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  export default RecipeList;