import React from "react";

function CatCard({ cat }) {
  const imageUrl = `https://cataas.com/cat/${cat._id}`;
  return (
    <div className="cat-card">
      <img src={imageUrl} alt="cat" draggable="false" />
    </div>
  );
}

export default CatCard;
