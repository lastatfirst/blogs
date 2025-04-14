'use client'

import { useEffect } from "react";

const Snowfall = () => {
  useEffect(() => {
    const createSnowflakes = () => {
      const snowContainer = document.createElement('div');
      snowContainer.className = 'snow';
      document.body.appendChild(snowContainer); 
      // Create 50 snowflakes
      for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = `${Math.random() * 100}vw`; 
        snowflake.style.animationDuration = `${Math.random() * (6 - 4) + 4}s`;
        snowContainer.appendChild(snowflake);
      }
      return () => {
        snowContainer.remove();
      };
    };
    createSnowflakes();
  }, []);

  return null;
};

export default Snowfall;
