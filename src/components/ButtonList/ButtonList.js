import React, { useState } from "react";
import RecipeList from "../List/RecipeList";

const ButtonList = ({ recipes = [] }) => {
  const [showList, setShowList] = useState(false);

  const toggleList = () => {
    setShowList((prev) => !prev);
  };

  return (
    <div>
      <button className="button button-recepies" onClick={toggleList}>
        Przepisy ☰
      </button>

      {showList && <RecipeList recipes={recipes} />}
    </div>
  );
};

export default ButtonList;
