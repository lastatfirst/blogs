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
        snowflake.style.left = `${Math.random() * 100}vw`; // Random X position across the full width of the viewport
        snowflake.style.animationDuration = `${Math.random() * (6 - 4) + 4}s`; // Random fall duration
        snowContainer.appendChild(snowflake);
      }

      // Cleanup on component unmount
      return () => {
        snowContainer.remove();
      };
    };

    // Create snowflakes when the component mounts
    createSnowflakes();
  }, []);

  return null; // This component doesn't need to render anything itself
};

export default Snowfall;
