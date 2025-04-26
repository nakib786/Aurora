'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ParallaxScrollerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Scroll speed multiplier (1 = normal, 0.5 = half speed, 2 = double speed)
  direction?: 'up' | 'down' | 'left' | 'right';
  easing?: string; // Easing function for smoother animations
}

export const ParallaxScroller: React.FC<ParallaxScrollerProps> = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
  easing = 'easeOutExpo',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animeLoaded, setAnimeLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0); // Track previous scroll position
  const [windowHeight, setWindowHeight] = useState(0);
  const animationRef = useRef<any>(null);
  
  // Load anime.js
  useEffect(() => {
    const loadAnime = async () => {
      try {
        await import('animejs');
        setAnimeLoaded(true);
      } catch (error) {
        console.error('Failed to load anime.js:', error);
      }
    };
    
    loadAnime();
    
    // Initialize window height
    setWindowHeight(window.innerHeight);
    
    // Add resize listener
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setPrevScrollY(scrollY); // Save previous scroll position before updating
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);
  
  // Apply parallax effect when dependencies change
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !animeLoaded) return;
    
    const applyParallax = async () => {
      const animeModule = await import('animejs');
      const anime = animeModule.default;
      
      // If previous animation exists, pause it
      if (animationRef.current) {
        anime.remove(container);
      }
      
      // Get element position relative to viewport
      const rect = container.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;
      
      // Calculate how far the element is from the viewport center
      const viewportCenter = scrollY + windowHeight / 2;
      const distanceFromCenter = elementTop - viewportCenter + elementHeight / 2;
      
      // Calculate transform based on direction and speed
      let translateX = 0;
      let translateY = 0;
      
      switch (direction) {
        case 'up':
          translateY = distanceFromCenter * speed;
          break;
        case 'down':
          translateY = -distanceFromCenter * speed;
          break;
        case 'left':
          translateX = distanceFromCenter * speed;
          break;
        case 'right':
          translateX = -distanceFromCenter * speed;
          break;
        default:
          translateY = distanceFromCenter * speed;
      }
      
      // Check if element is actually visible
      const isElementVisible = 
        rect.bottom > 0 && 
        rect.top < windowHeight;
      
      // Only animate if element is visible
      if (isElementVisible) {
        // Create animation
        animationRef.current = anime({
          targets: container,
          translateX: translateX,
          translateY: translateY,
          duration: 800, // Smoothing duration
          easing: easing,
        });
      }
      
      return animationRef.current;
    };
    
    applyParallax();
    
    // Cleanup
    return () => {
      const cleanup = async () => {
        if (animationRef.current && container) {
          const animeModule = await import('animejs');
          const anime = animeModule.default;
          anime.remove(container);
        }
      };
      cleanup();
    };
  }, [scrollY, windowHeight, speed, direction, easing, animeLoaded]);
  
  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

// Additional parallax components for specific directions
export const ParallaxUp: React.FC<Omit<ParallaxScrollerProps, 'direction'>> = (props) => (
  <ParallaxScroller {...props} direction="up" />
);

export const ParallaxDown: React.FC<Omit<ParallaxScrollerProps, 'direction'>> = (props) => (
  <ParallaxScroller {...props} direction="down" />
);

export const ParallaxLeft: React.FC<Omit<ParallaxScrollerProps, 'direction'>> = (props) => (
  <ParallaxScroller {...props} direction="left" />
);

export const ParallaxRight: React.FC<Omit<ParallaxScrollerProps, 'direction'>> = (props) => (
  <ParallaxScroller {...props} direction="right" />
); 