'use client';

import React, { useEffect, useRef } from 'react';

type AnimeWrapperProps = {
  children: React.ReactNode;
  className?: string;
  animation: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'stagger';
  delay?: number;
  duration?: number;
  easing?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  staggerDelay?: number;
  staggerSelector?: string;
};

const AnimeWrapper: React.FC<AnimeWrapperProps> = ({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 800,
  easing = 'easeOutElastic(1, .6)',
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  staggerDelay = 50,
  staggerSelector = '.stagger-item'
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const loadAnime = async () => {
      try {
        const element = elementRef.current;
        if (!element) return;
        
        // Define animation settings based on animation type
        const animationSettings: any = {
          targets: element,
          duration: duration,
          easing: easing,
          delay: delay
        };
        
        // Animation-specific properties
        switch (animation) {
          case 'fadeIn':
            animationSettings.opacity = [0, 1];
            break;
          case 'slideUp':
            animationSettings.translateY = [30, 0];
            animationSettings.opacity = [0, 1];
            break;
          case 'slideLeft':
            animationSettings.translateX = [-30, 0];
            animationSettings.opacity = [0, 1];
            break;
          case 'slideRight':
            animationSettings.translateX = [30, 0];
            animationSettings.opacity = [0, 1];
            break;
          case 'scale':
            animationSettings.scale = [0.9, 1];
            animationSettings.opacity = [0, 1];
            break;
          case 'stagger':
            // For stagger, we need to identify the children to animate
            const staggerItems = element.querySelectorAll(staggerSelector);
            if (staggerItems.length > 0) {
              const animeModule = await import('animejs');
              const anime = animeModule.default;
              
              anime({
                targets: staggerItems,
                translateY: [20, 0],
                opacity: [0, 1],
                duration: duration,
                delay: anime.stagger(staggerDelay, { start: delay }),
                easing: easing
              });
              return; // Early return as we've already handled the animation
            }
            break;
        }

        // Import anime.js dynamically
        const animeModule = await import('animejs');
        const anime = animeModule.default;
        
        // Run the animation
        anime(animationSettings);
      } catch (error) {
        console.error('Failed to load anime.js or run animation:', error);
      }
    };

    // Set up Intersection Observer to trigger animation when element is visible
    if (elementRef.current && !hasAnimatedRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            loadAnime();
            
            if (triggerOnce) {
              hasAnimatedRef.current = true;
              if (observerRef.current) {
                observerRef.current.disconnect();
              }
            }
          }
        },
        {
          threshold,
          rootMargin
        }
      );

      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [animation, delay, duration, easing, threshold, rootMargin, triggerOnce, staggerDelay, staggerSelector]);

  // Choose the className based on the animation type
  const animationClassName = 
    animation === 'fadeIn' ? 'anime-fade-in' :
    animation === 'slideUp' ? 'anime-slide-up' :
    animation === 'slideLeft' ? 'anime-slide-left' :
    animation === 'slideRight' ? 'anime-slide-right' :
    animation === 'scale' ? 'anime-scale-in' :
    '';

  return (
    <div ref={elementRef} className={`${animationClassName} ${className}`}>
      {children}
    </div>
  );
};

export default AnimeWrapper; 