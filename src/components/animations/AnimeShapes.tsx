'use client';

import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

interface ShapeProps {
  type: 'circle' | 'square' | 'triangle' | 'blob';
  color: string;
  size: string;
  className?: string;
  delay?: number;
  duration?: number;
}

// Seeded random function to ensure consistency between server and client
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Export the Shape component
export const Shape: React.FC<ShapeProps> = ({ type, color, size, className = '', delay = 0, duration = 8000 }) => {
  const shapeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!shapeRef.current) return;
    
    const element = shapeRef.current;
    
    // Generate random positions within 80% of the parent container
    const xPos = 10 + Math.random() * 80; // between 10% and 90%
    const yPos = 10 + Math.random() * 80; // between 10% and 90%
    
    // Set initial position
    element.style.left = `${xPos}%`;
    element.style.top = `${yPos}%`;
    
    // Animate with a random path
    anime({
      targets: element,
      translateX: [
        { value: anime.random(-50, 50) + 'px', duration: anime.random(duration - 1000, duration + 1000) },
        { value: anime.random(-50, 50) + 'px', duration: anime.random(duration - 1000, duration + 1000) }
      ],
      translateY: [
        { value: anime.random(-50, 50) + 'px', duration: anime.random(duration - 1000, duration + 1000) },
        { value: anime.random(-50, 50) + 'px', duration: anime.random(duration - 1000, duration + 1000) }
      ],
      rotate: [
        { value: anime.random(-15, 15) + 'deg', duration: anime.random(duration - 1000, duration + 1000) },
        { value: anime.random(-15, 15) + 'deg', duration: anime.random(duration - 1000, duration + 1000) }
      ],
      scale: [
        { value: anime.random(0.8, 1.2), duration: anime.random(duration - 1000, duration + 1000) },
        { value: anime.random(0.8, 1.2), duration: anime.random(duration - 1000, duration + 1000) }
      ],
      opacity: [
        { value: anime.random(0.3, 0.7), duration: anime.random(duration - 1000, duration + 1000) },
        { value: anime.random(0.3, 0.7), duration: anime.random(duration - 1000, duration + 1000) }
      ],
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true,
      delay: delay
    });
  }, [delay, duration]);
  
  // Create shape elements with consistent properties
  let shapeElement;
  
  switch (type) {
    case 'circle':
      shapeElement = <div className={`rounded-full ${color} ${size}`}></div>;
      break;
    case 'square':
      shapeElement = <div className={`${color} ${size}`}></div>;
      break;
    case 'triangle':
      shapeElement = (
        <div 
          className={`${size} overflow-hidden`} 
          style={{ 
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            backgroundColor: '' // Let the className handle the color
          }}
        ></div>
      );
      break;
    case 'blob':
      // Keep just one blob path to ensure consistency
      const blobPath = 'M81.6,-89.9C103.7,-74.6,118.8,-43.9,125.8,-10.1C132.8,23.7,131.6,60.7,113.6,85.1C95.5,109.5,60.6,121.3,26.6,128.2C-7.3,135.1,-41.3,137.1,-69.5,121.4C-97.7,105.8,-120.1,72.3,-129.6,36.4C-139.2,0.6,-135.9,-37.7,-117.5,-60.8C-99.1,-83.9,-65.6,-91.7,-37.3,-103.9C-9,-116.1,14.1,-132.6,39.8,-128.6C65.6,-124.6,94,-106.2,81.6,-89.9Z';
      
      shapeElement = (
        <div 
          className={`${size}`}
          style={{
            backgroundColor: '',
            WebkitMaskImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><path d='${blobPath}' transform='translate(100 100)' /></svg>")`,
            maskImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><path d='${blobPath}' transform='translate(100 100)' /></svg>")`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center'
          }}
        ></div>
      );
      break;
  }
  
  return (
    <div 
      ref={shapeRef} 
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 opacity-40 ${className}`}
      style={{ filter: 'blur(1px)' }}
    >
      {shapeElement}
    </div>
  );
};

interface AnimeShapesProps {
  count?: number;
  className?: string;
  children?: React.ReactNode;
}

const AnimeShapes: React.FC<AnimeShapesProps> = ({ count = 10, className = '', children }) => {
  const [isClient, setIsClient] = useState(false);
  
  // Only render once we're on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // If children are provided, just render them client-side only
  if (children) {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {isClient ? children : null}
      </div>
    );
  }
  
  // Don't render shapes on the server to avoid hydration issues
  if (!isClient) {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}></div>
    );
  }
  
  // Generate shapes with deterministic properties based on index
  const shapes = Array.from({ length: count }).map((_, index) => {
    const seed = index * 100;
    const types: ('circle' | 'square' | 'triangle' | 'blob')[] = ['circle', 'square', 'triangle', 'blob'];
    const colors = [
      'bg-blue-500/20', 'bg-purple-500/20', 'bg-indigo-500/20', 
      'bg-violet-500/20', 'bg-fuchsia-500/20'
    ];
    const sizes = ['w-16 h-16', 'w-24 h-24', 'w-32 h-32', 'w-40 h-40', 'w-12 h-12'];
    
    // Use deterministic random selection based on index
    const typeIndex = Math.floor(seededRandom(seed) * types.length);
    const colorIndex = Math.floor(seededRandom(seed + 1) * colors.length);
    const sizeIndex = Math.floor(seededRandom(seed + 2) * sizes.length);
    
    return {
      id: index,
      type: types[typeIndex],
      color: colors[colorIndex],
      size: sizes[sizeIndex],
      delay: index * 300,
      duration: 7000 + seededRandom(seed + 3) * 5000
    };
  });
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map(shape => (
        <Shape 
          key={shape.id}
          type={shape.type}
          color={shape.color}
          size={shape.size}
          delay={shape.delay}
          duration={shape.duration}
        />
      ))}
    </div>
  );
};

export default AnimeShapes; 