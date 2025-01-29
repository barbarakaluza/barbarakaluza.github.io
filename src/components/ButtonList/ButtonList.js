import React, { useState } from "react";

const ButtonList = ({ recipes = [] }) => {
  const [showList, setShowList] = useState(false);
  
  const toggleList = () => {
    setShowList((prev) => !prev);
  };

  return (
    <div>
      <button className="button" onClick={toggleList}>
        Przepisy ☰
      </button>

      {showList && (
        <div className="recipe-list-container">
          <h2>Lista Przepisów</h2>
          {recipes.length > 0 ? (
            <ul>
              {recipes.map((recipe) => (
                <li key={recipe.id} className="recipe-title">
                  {recipe.fields?.["recipe-title"] || "Brak tytułu"}
                </li>
              ))}
            </ul>
          ) : (
            <p>Brak przepisów. Dodaj nowy!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ButtonList;
