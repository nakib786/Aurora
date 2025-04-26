'use client';

import React, { useRef, useEffect } from 'react';
import anime from 'animejs';

interface AnimeMagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  duration?: number;
  radius?: number;
  as?: 'button' | 'a' | 'div';
  href?: string;
  onClick?: () => void;
}

const AnimeMagneticButton: React.FC<AnimeMagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.3,
  duration = 600,
  radius = 200,
  as = 'button',
  href,
  onClick
}) => {
  const buttonRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const magneticAnimationRef = useRef<anime.AnimeInstance | null>(null);
  const returnAnimationRef = useRef<anime.AnimeInstance | null>(null);
  const isHovering = useRef<boolean>(false);
  
  useEffect(() => {
    const button = buttonRef.current;
    const content = contentRef.current;
    
    if (!button || !content) return;
    
    const onMouseMove = (e: MouseEvent) => {
      if (!isHovering.current) return;
      
      // Get button dimensions and position
      const rect = button.getBoundingClientRect();
      
      // Calculate cursor position relative to button center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate distance from cursor to center
      const distance = Math.sqrt(x * x + y * y);
      
      // Only apply magnetic effect if cursor is within radius
      if (distance < radius) {
        // Stop return animation if it's running
        if (returnAnimationRef.current) {
          returnAnimationRef.current.pause();
        }
        
        // Calculate movement based on distance and strength
        const strengthFactor = strength * (1 - distance / radius);
        
        // Animate button movement
        magneticAnimationRef.current = anime({
          targets: button,
          translateX: x * strengthFactor,
          translateY: y * strengthFactor,
          duration: duration / 3,
          easing: 'easeOutQuad'
        });
        
        // Animate content with additional effect
        anime({
          targets: content,
          translateX: x * strengthFactor * 0.3,
          translateY: y * strengthFactor * 0.3,
          rotateX: y * -0.05 * strengthFactor,
          rotateY: x * 0.05 * strengthFactor,
          duration: duration / 3,
          easing: 'easeOutQuad'
        });
      }
    };
    
    const onMouseEnter = () => {
      isHovering.current = true;
    };
    
    const onMouseLeave = () => {
      isHovering.current = false;
      
      // Return button to original position with smooth animation
      returnAnimationRef.current = anime({
        targets: [button, content],
        translateX: 0,
        translateY: 0,
        rotateX: 0,
        rotateY: 0,
        duration: duration,
        easing: 'spring(1, 80, 10, 0)'
      });
    };
    
    // Add event listeners
    button.addEventListener('mouseenter', onMouseEnter);
    button.addEventListener('mouseleave', onMouseLeave);
    button.addEventListener('mousemove', onMouseMove);
    
    return () => {
      // Remove event listeners
      button.removeEventListener('mouseenter', onMouseEnter);
      button.removeEventListener('mouseleave', onMouseLeave);
      button.removeEventListener('mousemove', onMouseMove);
    };
  }, [strength, duration, radius]);
  
  // Handle click animations
  const handleClick = (e: React.MouseEvent) => {
    const button = buttonRef.current;
    
    if (button) {
      anime({
        targets: button,
        scale: [1, 0.95, 1],
        duration: 400,
        easing: 'easeInOutQuad'
      });
    }
    
    if (onClick) onClick();
  };
  
  const ElementTag = as as any;
  
  return (
    <ElementTag
      ref={buttonRef as any}
      className={`magnetic-button inline-block relative ${className}`}
      href={as === 'a' ? href : undefined}
      onClick={handleClick}
      style={{
        transform: 'translateZ(0)', // Force hardware acceleration
        backfaceVisibility: 'hidden',
        perspective: '1000px',
        willChange: 'transform'
      }}
    >
      <div 
        ref={contentRef}
        className="magnetic-content"
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </ElementTag>
  );
};

export default AnimeMagneticButton; 