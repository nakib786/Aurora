'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimeEffectsProps {
  children?: React.ReactNode;
  className?: string;
  animationType?: 'fadeIn' | 'slideUp' | 'stagger' | 'text' | 'path' | 'auroraLogo';
  delay?: number;
}

const AnimeEffects: React.FC<AnimeEffectsProps> = ({
  children,
  className = '',
  animationType = 'fadeIn',
  delay = 0,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [animeLoaded, setAnimeLoaded] = useState(false);
  
  // Import anime.js only on client side
  useEffect(() => {
    let animeModule: any = null;
    const loadAnime = async () => {
      try {
        animeModule = await import('animejs');
        setAnimeLoaded(true);
      } catch (error) {
        console.error('Failed to load anime.js:', error);
      }
    };
    
    loadAnime();
  }, []);
  
  // Handle animations after anime.js is loaded
  useEffect(() => {
    if (!elementRef.current || !animeLoaded) return;
    
    // We need to get a fresh reference to the module each time
    const getAnime = async () => {
      try {
        const animeModule = await import('animejs');
        const anime = animeModule.default;
        
        let animation: any;
        
        switch (animationType) {
          case 'fadeIn':
            animation = anime({
              targets: elementRef.current,
              opacity: [0, 1],
              duration: 1200,
              easing: 'easeInOutQuad',
              delay: delay || 0,
            });
            break;
          case 'slideUp':
            animation = anime({
              targets: elementRef.current,
              translateY: [100, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: 'easeOutExpo',
              delay: delay || 0,
            });
            break;
          case 'stagger':
            if (elementRef.current && elementRef.current.querySelectorAll('.stagger-item').length > 0) {
              animation = anime({
                targets: elementRef.current.querySelectorAll('.stagger-item'),
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 800,
                delay: anime.stagger(100, { start: delay || 0 }),
                easing: 'easeOutSine',
              });
            }
            break;
          case 'text':
            // Text animation (for headings)
            const textWrapper = elementRef.current;
            if (textWrapper && textWrapper.textContent) {
              textWrapper.innerHTML = textWrapper.textContent.replace(
                /\S/g,
                "<span class='letter'>$&</span>"
              );
              
              if (textWrapper.querySelectorAll('.letter').length > 0) {
                animation = anime.timeline({ loop: false })
                  .add({
                    targets: textWrapper.querySelectorAll('.letter'),
                    opacity: [0, 1],
                    translateY: [20, 0],
                    translateZ: 0,
                    duration: 750,
                    delay: (el: HTMLElement, i: number) => 50 * i + (delay || 0),
                  });
              }
            }
            break;
          case 'path':
            // SVG path animation
            if (elementRef.current) {
              const paths = elementRef.current.querySelectorAll('path');
              if (paths.length > 0) {
                animation = anime({
                  targets: paths,
                  strokeDashoffset: [anime.setDashoffset, 0],
                  easing: 'easeInOutSine',
                  duration: 1500,
                  delay: function(el: HTMLElement, i: number) { return i * 250 + (delay || 0) },
                  direction: 'alternate',
                  loop: false
                });
              }
            }
            break;
          case 'auroraLogo':
            // Advanced SVG animation for Aurora logo
            if (elementRef.current) {
              // Create drawable SVG paths
              const lines = elementRef.current.querySelectorAll('.line');
              if (lines.length > 0) {
                // Initialize SVG drawables
                lines.forEach(line => {
                  const pathLength = (line as SVGPathElement).getTotalLength();
                  line.setAttribute('stroke-dasharray', pathLength.toString());
                  line.setAttribute('stroke-dashoffset', pathLength.toString());
                });
                
                // Triangle animation
                const triangle = elementRef.current.querySelector('.aurora-logo-triangle');
                if (triangle) {
                  anime({
                    targets: triangle,
                    strokeDashoffset: [anime.setDashoffset, 0],
                    easing: 'easeOutSine',
                    duration: 1200,
                    delay: delay || 0,
                  });
                }
                
                // Horizontal lines animation
                const logoLines = elementRef.current.querySelectorAll('.aurora-logo-line');
                if (logoLines.length > 0) {
                  anime({
                    targets: logoLines,
                    strokeDashoffset: [anime.setDashoffset, 0],
                    easing: 'easeOutQuad',
                    duration: 1000,
                    delay: anime.stagger(150, { start: 300 + (delay || 0) }),
                  });
                }
                
                // Wave animation
                const wave = elementRef.current.querySelector('.aurora-logo-wave');
                if (wave) {
                  anime({
                    targets: wave,
                    strokeDashoffset: [anime.setDashoffset, 0],
                    easing: 'easeInOutSine',
                    duration: 1500,
                    delay: 800 + (delay || 0),
                    complete: function() {
                      // Create continuing wave animation after draw
                      anime({
                        targets: wave,
                        translateY: [-2, 2],
                        easing: 'easeInOutSine',
                        duration: 2000,
                        loop: true,
                        direction: 'alternate'
                      });
                    }
                  });
                }
              }
            }
            break;
          default:
            break;
        }
        
        return animation;
      } catch (error) {
        console.error('Error in animation:', error);
        return null;
      }
    };
    
    let animationInstance: any = null;
    getAnime().then(animation => {
      animationInstance = animation;
    });
    
    return () => {
      if (animationInstance) {
        try {
          animationInstance.pause();
        } catch (error) {
          console.error('Error pausing animation:', error);
        }
      }
    };
  }, [animationType, delay, animeLoaded]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default AnimeEffects; 