import React from "react";

const StarsBox = () => {
  // Generate random stars with different positions and sizes
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}vh`,
    left: `${Math.random() * 100}vw`,
    size: `${Math.random() * 11 + 1}px`, // Random size between 1px and 4px
    animationDuration: `${Math.random() * 5 + 5}s`, // Random duration between 5s and 10s
    animationDelay: `${Math.random() * 5}s`, // Random delay
  }));

  return (
    <div className="stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
          }}
        ></div>
      ))}
    </div>
  );
};

export default StarsBox;
