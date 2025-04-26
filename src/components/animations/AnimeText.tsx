'use client';

import React, { useEffect, useRef } from 'react';

type AnimeTextProps = {
  children: string;
  className?: string;
  animation: 'reveal' | 'typewriter' | 'letterFade' | 'letterScale';
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  letterDelay?: number;
  easing?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
};

const AnimeText: React.FC<AnimeTextProps> = ({
  children,
  className = '',
  animation = 'reveal',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  rootMargin = '0px',
  letterDelay = 30,
  easing = 'easeOutSine',
  as = 'div'
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
        
        // Import anime.js dynamically
        const animeModule = await import('animejs');
        const anime = animeModule.default;

        switch (animation) {
          case 'reveal': {
            // Reveal animation (slide up with a mask)
            if (!element.getAttribute('data-prepared')) {
              element.style.overflow = 'hidden';
              const originalText = element.textContent || '';
              
              // Create the inner text element
              const innerTextEl = document.createElement('div');
              innerTextEl.textContent = originalText;
              innerTextEl.style.transform = 'translateY(100%)';
              innerTextEl.style.opacity = '0';
              
              // Clear and append
              element.textContent = '';
              element.appendChild(innerTextEl);
              element.setAttribute('data-prepared', 'true');
              
              // Animate
              anime({
                targets: innerTextEl,
                translateY: ['100%', '0%'],
                opacity: [0, 1],
                duration: duration,
                easing: easing,
                delay: delay
              });
            }
            break;
          }
          
          case 'typewriter': {
            // Typewriter effect
            if (!element.getAttribute('data-prepared')) {
              const text = element.textContent || '';
              element.textContent = '';
              element.setAttribute('data-prepared', 'true');
              
              // Create a cursor element
              const cursor = document.createElement('span');
              cursor.textContent = '|';
              cursor.style.opacity = '1';
              cursor.classList.add('anime-cursor');
              
              // Append cursor
              element.appendChild(cursor);
              
              // Animate cursor blinking
              anime({
                targets: cursor,
                opacity: [1, 0],
                duration: 600,
                easing: 'steps(2)',
                loop: true,
                delay: text.length * letterDelay + delay
              });
              
              // Type each character
              Array.from(text).forEach((char, i) => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.style.opacity = '0';
                charSpan.style.display = 'inline-block';
                
                // Insert before cursor
                element.insertBefore(charSpan, cursor);
                
                // Animate character appearance
                anime({
                  targets: charSpan,
                  opacity: [0, 1],
                  duration: 10,
                  easing: 'linear',
                  delay: i * letterDelay + delay
                });
              });
            }
            break;
          }
          
          case 'letterFade':
          case 'letterScale': {
            // Letter-by-letter animation
            if (!element.getAttribute('data-prepared')) {
              const text = element.textContent || '';
              element.innerHTML = '';
              element.setAttribute('data-prepared', 'true');
              
              // Create a wrapper for each letter
              Array.from(text).forEach((char, i) => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
                charSpan.style.opacity = '0';
                charSpan.style.display = 'inline-block';
                if (animation === 'letterScale') {
                  charSpan.style.transform = 'scale(0.5)';
                }
                element.appendChild(charSpan);
              });
              
              // Animate all letters
              anime({
                targets: element.children,
                opacity: [0, 1],
                ...(animation === 'letterScale' ? { scale: [0.5, 1] } : {}),
                duration: duration,
                delay: anime.stagger(letterDelay, { start: delay }),
                easing: easing
              });
            }
            break;
          }
        }
      } catch (error) {
        console.error('Failed to load anime.js or run animation:', error);
      }
    };

    // Set up Intersection Observer
    if (elementRef.current && !hasAnimatedRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            loadAnime();
            hasAnimatedRef.current = true;
            if (observerRef.current) {
              observerRef.current.disconnect();
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
  }, [animation, delay, duration, letterDelay, easing, threshold, rootMargin]);

  const Element = as;
  
  return (
    <Element 
      ref={elementRef as any} 
      className={`anime-text ${animation === 'reveal' ? 'overflow-hidden' : ''} ${className}`}
    >
      {children}
    </Element>
  );
};

export default AnimeText; 