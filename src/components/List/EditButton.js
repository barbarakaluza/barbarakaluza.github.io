import React from "react";

function EditButton({ onClick }) {
  return (
    <button className="button edit-button" onClick={onClick}>Edit</button>
  );
}

export default EditButton;