import React, { useState } from "react";

function ButtonList() {
  const [showList, setShowList] = useState(false);

  const recipes = [
    { id: 1, title: "Spaghetti Carbonara" },
    { id: 2, title: "Kurczak Tikka Masala" },
    { id: 3, title: "Brownie Czekoladowe" },
  ];

  return (
    <div>
      <button className="button" onClick={() => setShowList(!showList)}>
        Przepisy ☰
      </button>

      {showList && (
        <div className="recipe-list-container">
          <h2>Lista Przepisów</h2>
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id} className="recipe-title">
                {recipe.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ButtonList;