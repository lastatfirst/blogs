"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedUnderlineProps {
  className?: string;
}

const AnimatedUnderline: React.FC<AnimatedUnderlineProps> = ({ className = "" }) => {
  const [contentWidth, setContentWidth] = useState(200);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current && containerRef.current.parentElement) {
        // Get the actual content width by measuring the text content
        const parent = containerRef.current.parentElement;
        const textElement = parent.querySelector('h1, h2, h3, h4, h5, h6');
        if (textElement) {
          // Create a temporary element to measure text width
          const temp = document.createElement('span');
          temp.style.visibility = 'hidden';
          temp.style.position = 'absolute';
          temp.style.whiteSpace = 'nowrap';
          temp.style.font = window.getComputedStyle(textElement).font;
          temp.textContent = textElement.textContent || '';
          document.body.appendChild(temp);
          
          const width = temp.getBoundingClientRect().width;
          document.body.removeChild(temp);
          
          setContentWidth(Math.max(width, 100)); // Minimum width of 100px
        }
      }
    };

    // Initial measurement
    updateWidth();

    // Update on resize
    window.addEventListener('resize', updateWidth);
    
    // Also update after a short delay to ensure fonts are loaded
    const timer = setTimeout(updateWidth, 100);

    return () => {
      window.removeEventListener('resize', updateWidth);
      clearTimeout(timer);
    };
  }, []);

  // Generate cloud-like curly path based on content width
  const generateCurlyPath = (width: number) => {
    const cloudBumps = Math.max(6, Math.floor(width / 40)); // More frequent bumps for cloud effect
    const bumpWidth = (width - 20) / cloudBumps; // Leave 10px padding on each side
    
    let path = `M10,6`;
    
    for (let i = 0; i < cloudBumps; i++) {
      const startX = 10 + (i * bumpWidth);
      const endX = 10 + ((i + 1) * bumpWidth);
      const midX = startX + (bumpWidth / 2);
      
      // Create random cloud bump heights with more variation
      const bumpVariation = Math.sin(i * 1.3) * 0.8 + Math.cos(i * 0.9) * 0.6;
      const bumpHeight = 2.5 + bumpVariation; // Heights between 1.1 and 3.9
      
      // Create fluffy cloud-like bumps
      const topY = 6 - Math.abs(bumpHeight);
      const bottomY = 6 + Math.abs(bumpHeight) * 0.2;
      
      // Control points for fluffy cloud curves
      const cp1X = startX + (bumpWidth * 0.2);
      const cp2X = startX + (bumpWidth * 0.8);
      const cp3X = midX;
      
      if (i === 0) {
        // First bump - start smooth
        path += ` Q${cp1X},${topY} ${midX},${topY} Q${cp2X},${topY} ${endX},6`;
      } else {
        // Create overlapping cloud bumps
        const prevHeight = 2.5 + Math.sin((i-1) * 1.3) * 0.8 + Math.cos((i-1) * 0.9) * 0.6;
        const connectY = 6 - Math.abs(prevHeight) * 0.3;
        
        // Multiple small curves to create fluffy cloud texture
        path += ` Q${startX + bumpWidth * 0.15},${topY} ${startX + bumpWidth * 0.35},${topY - 0.5}`;
        path += ` Q${startX + bumpWidth * 0.5},${topY - 0.8} ${startX + bumpWidth * 0.65},${topY - 0.5}`;
        path += ` Q${startX + bumpWidth * 0.85},${topY} ${endX},6`;
      }
    }
    
    return path;
  };

  const pathLength = contentWidth * 1.2; // Approximate path length for dash array

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ width: `${contentWidth}px` }}>
      <svg
        viewBox={`0 0 ${contentWidth} 12`}
        className="h-2 -mt-1"
        style={{ width: `${contentWidth}px` }}
        preserveAspectRatio="none"
      >
        <path
          d={generateCurlyPath(contentWidth)}
          stroke="#e53e3e"
          strokeWidth="2.5"
          fill="none"
          className="animate-draw-underline"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength}
        />
        <defs>
          <style>{`
            .animate-draw-underline {
              animation: draw 2s ease-in-out 0.5s forwards;
              opacity: 0;
            }
            
            @keyframes draw {
              0% {
                stroke-dashoffset: ${pathLength};
                opacity: 0;
              }
              20% {
                opacity: 1;
              }
              100% {
                stroke-dashoffset: 0;
                opacity: 1;
              }
            }
          `}</style>
        </defs>
      </svg>
    </div>
  );
};

export default AnimatedUnderline;
