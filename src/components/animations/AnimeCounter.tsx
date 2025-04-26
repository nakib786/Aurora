'use client';

import React, { useEffect, useRef, useState } from 'react';

type AnimeCounterProps = {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  format?: (value: number) => string;
  easing?: string;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

const AnimeCounter: React.FC<AnimeCounterProps> = ({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  format,
  easing = 'easeOutExpo',
  className = '',
  threshold = 0.1,
  rootMargin = '0px',
  decimals = 0,
  prefix = '',
  suffix = ''
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [displayValue, setDisplayValue] = useState<string>(
    format ? format(start) : formatNumber(start, decimals, prefix, suffix)
  );
  const hasAnimatedRef = useRef(false);

  // Helper function to format numbers with commas and decimals
  function formatNumber(num: number, decimalPlaces: number, prefix: string, suffix: string): string {
    const fixedNum = num.toFixed(decimalPlaces);
    const [integerPart, decimalPart] = fixedNum.split('.');
    
    // Add commas to integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Combine with decimal part if it exists
    const formatted = decimalPlaces > 0 ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    
    return `${prefix}${formatted}${suffix}`;
  }

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const loadAnime = async () => {
      try {
        // Import anime.js dynamically
        const animeModule = await import('animejs');
        const anime = animeModule.default;
        
        // Create an object to animate
        const obj = { value: start };
        
        // Start the animation
        anime({
          targets: obj,
          value: end,
          duration: duration,
          delay: delay,
          easing: easing,
          round: decimals === 0, // Only round if no decimals are needed
          update: function() {
            // Update the displayed value
            setDisplayValue(
              format ? format(obj.value) : formatNumber(obj.value, decimals, prefix, suffix)
            );
          }
        });
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
            
            // Disconnect the observer after triggering once
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
  }, [start, end, duration, delay, format, easing, decimals, prefix, suffix, threshold, rootMargin]);

  return (
    <div ref={elementRef} className={`counter ${className}`}>
      {displayValue}
    </div>
  );
};

export default AnimeCounter; 