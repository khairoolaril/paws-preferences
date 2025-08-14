import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import CatCard from "./components/CatCard.js";
import Summary from "./components/Summary.js";
import "./App.css";

function App() {
  const [cats, setCats] = useState([]);
  const [likedCats, setLikedCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [lastDirection, setLastDirection] = useState(null);

  useEffect(() => {
    async function fetchCats() {
      const res = await fetch("https://cataas.com/api/cats?limit=10");
      const data = await res.json();
      setCats(data);
    }
    fetchCats();
  }, []);

  const handleSwipe = (direction, cat) => {
    setLastDirection(direction);
    if (direction === "right") {
      setLikedCats((prev) => [...prev, cat]);
    }
    if (currentIndex === cats.length - 1) {
      setShowSummary(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (showSummary) {
    return <Summary likedCats={likedCats} />;
  }

  return (
    <div className="app">
      <h1>Paws & Preferences 🐾</h1>

      <div className="card-container">
        {cats
          .slice(currentIndex)
          .reverse()
          .map((cat) => (
            <TinderCard
              className="swipe"
              key={cat._id}
              onSwipe={(dir) => handleSwipe(dir, cat)}
              preventSwipe={["up", "down"]}
            >
              <div className="card-wrapper">
                {lastDirection === "right" && currentIndex === cats.indexOf(cat) && (
                  <div className="feedback like">LIKE</div>
                )}
                {lastDirection === "left" && currentIndex === cats.indexOf(cat) && (
                  <div className="feedback nope">NOPE</div>
                )}
                <CatCard cat={cat} />
              </div>
            </TinderCard>
          ))}
      </div>
    </div>
  );
}

export default App;
