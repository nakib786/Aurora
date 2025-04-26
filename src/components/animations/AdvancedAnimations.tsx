'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/components/ui/theme-provider';

interface AnimatableProps {
  children: React.ReactNode;
  className?: string;
  animationType: 'horizontalScroll' | 'verticalScroll' | 'floatingElements' | 'typewriter' | 'revealText' | 'codeEffect';
  duration?: number;
  delay?: number;
}

export const AdvancedAnimation: React.FC<AnimatableProps> = ({
  children,
  className = '',
  animationType,
  duration = 1000,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animeLoaded, setAnimeLoaded] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  // Only set mounted after client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Update isDark only after component is mounted
  useEffect(() => {
    if (mounted) {
      setIsDark(theme === 'dark' || 
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches));
    }
  }, [theme, mounted]);
  
  // Import anime.js using dynamic import
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
  }, []);

  // Apply animations once anime.js is loaded
  useEffect(() => {
    if (!containerRef.current || !animeLoaded || !mounted) return;
    
    const applyAnimation = async () => {
      const animeModule = await import('animejs');
      const anime = animeModule.default;
      
      // Clear any existing animations
      anime.remove(containerRef.current);
      
      let animation;
      
      switch (animationType) {
        case 'horizontalScroll':
          if (containerRef.current) {
            setupHorizontalScroll(containerRef.current, anime);
          }
          break;
        
        case 'verticalScroll':
          if (containerRef.current) {
            setupVerticalScroll(containerRef.current, anime);
          }
          break;
        
        case 'floatingElements':
          if (containerRef.current) {
            animation = anime({
              targets: containerRef.current.querySelectorAll('.float-item'),
              translateY: function() {
                return anime.random(-15, 15);
              },
              translateX: function() {
                return anime.random(-10, 10);
              },
              scale: function() {
                return 0.9 + anime.random(0, 0.3);
              },
              easing: 'easeInOutSine',
              duration: 4000,
              delay: function() {
                return anime.random(0, 1000);
              },
              direction: 'alternate',
              loop: true
            });
          }
          break;
        
        case 'typewriter':
          const textWrapper = containerRef.current;
          if (textWrapper && textWrapper.textContent) {
            // Store original text
            const originalText = textWrapper.textContent;
            // Clear the content
            textWrapper.textContent = '';
            
            // Add each character wrapped in a span
            for (let i = 0; i < originalText.length; i++) {
              const charSpan = document.createElement('span');
              charSpan.textContent = originalText[i];
              charSpan.className = 'char opacity-0';
              textWrapper.appendChild(charSpan);
            }
            
            // Animate each character appearance
            animation = anime({
              targets: textWrapper.querySelectorAll('.char'),
              opacity: [0, 1],
              duration: 50,
              easing: 'linear',
              delay: anime.stagger(50, {start: delay})
            });
          }
          break;
        
        case 'revealText':
          const revealWrapper = containerRef.current;
          if (revealWrapper) {
            // Add a gradient mask for a more visually appealing effect
            if (!revealWrapper.querySelector('.reveal-mask')) {
              // Clear existing content and create a wrapped version
              const originalContent = revealWrapper.innerHTML;
              revealWrapper.innerHTML = '';
              
              // Create content container
              const contentContainer = document.createElement('div');
              contentContainer.className = 'reveal-content relative z-20';
              contentContainer.innerHTML = originalContent;
              
              // Create mask with gradient
              const mask = document.createElement('div');
              mask.className = 'reveal-mask absolute top-0 left-0 w-full h-full z-10';
              mask.style.background = isDark 
                ? 'linear-gradient(90deg, #111827 0%, rgba(17, 24, 39, 0.8) 50%, #111827 100%)' 
                : 'linear-gradient(90deg, #f9fafb 0%, rgba(249, 250, 251, 0.8) 50%, #f9fafb 100%)';
              
              // Configure container
              revealWrapper.style.position = 'relative';
              revealWrapper.style.overflow = 'hidden';
              
              // Add elements to DOM
              revealWrapper.appendChild(contentContainer);
              revealWrapper.appendChild(mask);
              
              // Add a subtle glow effect to the text
              if (isDark) {
                const textElements = contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
                textElements.forEach(el => {
                  (el as HTMLElement).style.textShadow = '0 0 10px rgba(59, 130, 246, 0.3)';
                });
              }
            }
            
            // Create a more dynamic reveal animation
            animation = anime.timeline({
              easing: 'easeOutExpo'
            }).add({
              targets: revealWrapper.querySelector('.reveal-mask'),
              translateX: ['0%', '100%'],
              duration: duration,
              delay: delay
            }).add({
              targets: revealWrapper.querySelector('.reveal-content'),
              opacity: [0, 1],
              translateY: [20, 0],
              duration: duration / 2,
              offset: '-=' + (duration / 2)
            });
          }
          break;
          
        case 'codeEffect':
          if (containerRef.current) {
            const elements = containerRef.current.querySelectorAll('.code-line');
            animation = anime.timeline({
              easing: 'easeOutQuad',
            });
            
            animation.add({
              targets: elements,
              width: ['0%', '100%'],
              duration: function(el, i) { return 500 + (i * 100); },
              delay: function(el, i) { return delay + (i * 300); },
              easing: 'steps(30)',
            });
          }
          break;
        
        default:
          break;
      }
      
      return animation;
    };
    
    let animationInstance: any = null;
    applyAnimation().then(animation => {
      animationInstance = animation;
    });
    
    return () => {
      if (animationInstance) {
        try {
          const cleanupAsync = async () => {
            const animeModule = await import('animejs');
            const anime = animeModule.default;
            anime.remove(containerRef.current);
          };
          cleanupAsync();
        } catch (error) {
          console.error('Error cleaning up animation:', error);
        }
      }
    };
  }, [animationType, duration, delay, animeLoaded, isDark, mounted]);

  // Helper functions for complex animations
  const setupHorizontalScroll = async (container: HTMLElement, anime: any) => {
    // Setup the container
    const parent = container.parentElement;
    if (!parent) return;
    
    // Make sure the parent has position relative
    parent.style.position = 'relative';
    parent.style.overflow = 'hidden';
    parent.style.width = '100%';
    
    // Set container styling
    container.style.display = 'flex';
    container.style.position = 'relative';
    container.style.width = 'max-content';
    
    // Get total scrollable width
    const scrollWidth = container.scrollWidth;
    const viewWidth = parent.clientWidth;
    
    // Only apply scroll effect if content is wider than the view
    if (scrollWidth > viewWidth) {
      let scrollAnimation: any;
      let lastScrollPercent = 0;
      
      // Create scroll animation
      const setupScrollAnimation = () => {
        // Clear existing animation
        if (scrollAnimation) anime.remove(scrollAnimation);
        
        // Create new animation based on current sizes
        scrollAnimation = anime({
          targets: container,
          translateX: {
            value: -1 * (scrollWidth - viewWidth),
            duration: Math.max(scrollWidth * 10, 5000)
          },
          easing: 'linear',
          autoplay: false
        });
        
        // Setup scroll-based playback
        const handleScroll = () => {
          const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
          
          // Only update if element is in viewport
          const rect = container.getBoundingClientRect();
          const isInView = rect.bottom > 0 && rect.top < window.innerHeight;
          
          if (isInView) {
            scrollAnimation.seek(scrollAnimation.duration * scrollPercent);
            lastScrollPercent = scrollPercent;
          }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      };
      
      const cleanup = setupScrollAnimation();
      
      // Handle window resize
      const handleResize = () => {
        cleanup();
        setupScrollAnimation();
      };
      
      window.addEventListener('resize', handleResize);
      return () => {
        cleanup();
        window.removeEventListener('resize', handleResize);
      };
    }
  };
  
  const setupVerticalScroll = async (container: HTMLElement, anime: any) => {
    const items = container.querySelectorAll('.scroll-item');
    const itemStates = new Map<Element, { animated: boolean }>();
    
    // Set initial state for items
    items.forEach((item: Element) => {
      (item as HTMLElement).style.opacity = '0';
      (item as HTMLElement).style.transform = 'translateY(30px)';
      itemStates.set(item, { animated: false });
    });
    
    // Create intersection observer to trigger animations when elements are in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const state = itemStates.get(entry.target);
        
        if (entry.isIntersecting && state && !state.animated) {
          // Animate in
          anime({
            targets: entry.target,
            opacity: 1,
            translateY: 0,
            duration: 800,
            easing: 'easeOutExpo'
          });
          
          // Update state
          itemStates.set(entry.target, { animated: true });
        } 
        else if (!entry.isIntersecting && state && state.animated) {
          // Reset when element is completely out of view (by a good margin)
          if (entry.boundingClientRect.bottom < 0 || entry.boundingClientRect.top > window.innerHeight + 100) {
            anime({
              targets: entry.target,
              opacity: 0,
              translateY: 30,
              duration: 0  // Instant reset
            });
            
            // Update state
            itemStates.set(entry.target, { animated: false });
          }
        }
      });
    }, {
      threshold: 0.1,  // Trigger when at least 10% of the item is visible
      rootMargin: '-10px 0px'  // Slight offset to avoid edge triggering
    });
    
    // Observe each item
    items.forEach((item) => {
      observer.observe(item);
    });
    
    // Return cleanup function
    return () => {
      items.forEach((item) => {
        observer.unobserve(item);
      });
    };
  };

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

// Specialty components for specific animation types
export const HorizontalScroll: React.FC<Omit<AnimatableProps, 'animationType'>> = (props) => (
  <AdvancedAnimation {...props} animationType="horizontalScroll" />
);

export const VerticalScroll: React.FC<Omit<AnimatableProps, 'animationType'>> = (props) => (
  <AdvancedAnimation {...props} animationType="verticalScroll" />
);

export const FloatingElements: React.FC<Omit<AnimatableProps, 'animationType'>> = (props) => (
  <AdvancedAnimation {...props} animationType="floatingElements" />
);

export const TypewriterText: React.FC<Omit<AnimatableProps, 'animationType'>> = (props) => (
  <AdvancedAnimation {...props} animationType="typewriter" />
);

export const RevealText: React.FC<Omit<AnimatableProps, 'animationType'>> = (props) => (
  <AdvancedAnimation {...props} animationType="revealText" />
);

export const CodeEffect: React.FC<Omit<AnimatableProps, 'animationType'>> = (props) => (
  <AdvancedAnimation {...props} animationType="codeEffect" />
);

// CountUp component for animated number counting
interface CountUpProps {
  className?: string;
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  className = '',
  start = 0,
  end,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = '',
}) => {
  const [count, setCount] = useState(start);
  const [isMounted, setIsMounted] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Clean up previous observer
    if (observer.current) {
      observer.current.disconnect();
    }

    // Only animate once
    if (hasAnimated.current) {
      setCount(end);
      return;
    }

    // Setup intersection observer
    observer.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        // Start animation when element is visible
        startCountAnimation();
        // Disconnect after triggering
        observer.current?.disconnect();
      }
    }, { threshold: 0.1 });

    // Observe the counter element
    if (countRef.current) {
      observer.current.observe(countRef.current);
    }

    // Clean up
    return () => {
      observer.current?.disconnect();
    };
  }, [isMounted, end]);

  const startCountAnimation = () => {
    hasAnimated.current = true;
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;
    
    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min(1, (now - startTime) / (duration * 1000));
      
      if (progress < 1) {
        // Use easeOutQuad for smooth animation
        const easedProgress = 1 - Math.pow(1 - progress, 2);
        const currentCount = start + (end - start) * easedProgress;
        setCount(currentCount);
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    // Delay start if needed
    if (delay > 0) {
      setTimeout(() => {
        requestAnimationFrame(updateCount);
      }, delay);
    } else {
      requestAnimationFrame(updateCount);
    }
  };

  // Format number
  const formatNumber = (num: number) => {
    let formattedNum = decimals > 0 
      ? num.toFixed(decimals)
      : Math.floor(num).toString();
    
    // Add thousand separators if specified
    if (separator) {
      const parts = formattedNum.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      formattedNum = parts.join('.');
    }
    
    return `${prefix}${formattedNum}${suffix}`;
  };

  return (
    <span ref={countRef} className={`counter ${className}`}>
      {formatNumber(count)}
    </span>
  );
}; 