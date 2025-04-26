'use client';

import React, { useEffect, useState } from 'react';

interface ParticleBackgroundProps {
  particleCount?: number;
  colors?: string[];
  speed?: number;
  size?: { min: number; max: number };
  glow?: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  particleCount = 40, 
  colors = ['#60A5FA', '#8B5CF6', '#3B82F6', '#F472B6', '#C084FC'],
  speed = 1,
  size = { min: 3, max: 12 },
  glow = true
}) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Set the component as mounted
    setMounted(true);
    
    // Generate particles only on the client side
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container absolute inset-0';
    
    // Apply a CSS style for the particle animation
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @keyframes float-particle {
        0% {
          transform: translate(0, 0);
        }
        25% {
          transform: translate(var(--x-drift), var(--y-drift-up));
        }
        50% {
          transform: translate(var(--x-drift-alt), 0);
        }
        75% {
          transform: translate(var(--x-drift-neg), var(--y-drift-down));
        }
        100% {
          transform: translate(0, 0);
        }
      }
      
      @keyframes pulse-particle {
        0%, 100% {
          opacity: var(--min-opacity);
        }
        50% {
          opacity: var(--max-opacity);
        }
      }
    `;
    document.head.appendChild(styleElement);
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // Apply glow effect if enabled
      if (glow) {
        particle.className = 'absolute rounded-full blur-md';
      } else {
        particle.className = 'absolute rounded-full';
      }
      
      // Apply random styles
      const width = Math.random() * (size.max - size.min) + size.min;
      particle.style.width = `${width}px`;
      particle.style.height = `${width}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Set random color from the colors array
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.backgroundColor = randomColor + (glow ? '40' : '30'); // 40 = 25% opacity, 30 = 19% opacity
      
      // Set custom properties for the animation
      particle.style.setProperty('--x-drift', `${(Math.random() * 100 - 50) * speed}px`);
      particle.style.setProperty('--y-drift-up', `${-(Math.random() * 100) * speed}px`);
      particle.style.setProperty('--y-drift-down', `${(Math.random() * 100) * speed}px`);
      particle.style.setProperty('--x-drift-alt', `${(Math.random() * 100 - 50) * speed}px`);
      particle.style.setProperty('--x-drift-neg', `${-(Math.random() * 100) * speed}px`);
      particle.style.setProperty('--min-opacity', `${Math.random() * 0.3 + 0.1}`);
      particle.style.setProperty('--max-opacity', `${Math.random() * 0.4 + 0.6}`);
      
      // Set animation properties
      particle.style.animation = `
        float-particle ${Math.random() * 20 + 20}s infinite ease-in-out,
        pulse-particle ${Math.random() * 5 + 3}s infinite ease-in-out
      `;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particleContainer.appendChild(particle);
    }
    
    // Append to document
    const container = document.querySelector('.particle-container-wrapper');
    if (container) {
      container.appendChild(particleContainer);
    }
    
    // Cleanup
    return () => {
      if (container && container.contains(particleContainer)) {
        container.removeChild(particleContainer);
      }
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, [particleCount, colors, speed, size, glow]);
  
  if (!mounted) return null;
  
  // Return an empty div as a mounting point
  return <div className="particle-container-wrapper absolute inset-0 z-0" />;
};

export default ParticleBackground; 