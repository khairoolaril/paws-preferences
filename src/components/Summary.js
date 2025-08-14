import React from "react";

function Summary({ likedCats }) {
  return (
    <div className="summary">
      <h2>You liked {likedCats.length} cats 🐾</h2>
      <div className="liked-list">
        {likedCats.map((cat) => (
          <img
            key={cat._id}
            src={`https://cataas.com/cat/${cat._id}`}
            alt="liked cat"
          />
        ))}
      </div>
    </div>
  );
}

export default Summary;
