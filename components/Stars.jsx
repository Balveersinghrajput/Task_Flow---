"use client";

import { useEffect, useState } from "react";

const random = (min, max) => Math.random() * (max - min) + min;

const Stars = ({ count = 150, shootingCount = 3 }) => {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    setStars(
      Array.from({ length: count }, () => ({
        top: random(0, 100) + "%",
        left: random(0, 100) + "%",
        size: random(1, 3) + "px",
        delay: random(0, 2) + "s",
      }))
    );

    setShootingStars(
      Array.from({ length: shootingCount }, () => ({
        top: random(0, 50) + "%",
        left: random(0, 100) + "%",
        size: random(2, 4) + "px",
        delay: random(0, 10) + "s",
        duration: random(3, 5) + "s",
      }))
    );
  }, [count, shootingCount]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((star, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
          }}
        />
      ))}
      {shootingStars.map((shoot, i) => (
        <div
          key={i}
          className="falling-star"
          style={{
            top: shoot.top,
            left: shoot.left,
            width: shoot.size,
            height: shoot.size,
            animationDelay: shoot.delay,
            animationDuration: shoot.duration,
          }}
        />
      ))}
    </div>
  );
};

export default Stars;
