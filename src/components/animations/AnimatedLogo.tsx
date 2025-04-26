'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedLogoProps {
  className?: string;
  delay?: number;
}

const AnimatedLogo = ({ className = '', delay = 0 }: AnimatedLogoProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [animeLoaded, setAnimeLoaded] = useState(false);

  // Import anime.js only on client side
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

  // Handle animations after anime.js is loaded
  useEffect(() => {
    if (!svgRef.current || !animeLoaded) return;
    
    const initAnimation = async () => {
      try {
        const animeModule = await import('animejs');
        const anime = animeModule.default;
        
        // Initialize SVG paths with dasharray for drawing animation
        const svgElement = svgRef.current;
        if (!svgElement) return;
        
        const paths = svgElement.querySelectorAll('.logo-path');
        
        paths.forEach(path => {
          // Set up the SVG paths for animation
          const pathLength = (path as SVGPathElement).getTotalLength();
          path.setAttribute('stroke-dasharray', pathLength.toString());
          path.setAttribute('stroke-dashoffset', pathLength.toString());
        });
        
        // Animate the paths
        anime({
          targets: '.logo-path',
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutCubic',
          duration: 2000,
          delay: anime.stagger(150, { start: delay }),
          loop: true,
          direction: 'alternate'
        });
      } catch (error) {
        console.error('Error initializing animation:', error);
      }
    };
    
    initAnimation();
  }, [animeLoaded, delay]);

  return (
    <div className={className}>
      <svg 
        ref={svgRef}
        viewBox="0 0 300 100"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <g 
          stroke="currentColor" 
          fill="none" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* A in Aurora */}
          <path className="logo-path" d="M40 80L60 20L80 80" />
          <path className="logo-path" d="M50 50L70 50" />
          
          {/* U in Aurora */}
          <path className="logo-path" d="M90 30V70C90 75 95 80 100 80C105 80 110 75 110 70V30" />
          
          {/* R in Aurora */}
          <path className="logo-path" d="M120 30V80" />
          <path className="logo-path" d="M120 30H140C145 30 150 35 150 40C150 45 145 50 140 50H120" />
          <path className="logo-path" d="M135 50L150 80" />
          
          {/* O in Aurora */}
          <path className="logo-path" d="M170 55C170 68 180 80 195 80C210 80 220 68 220 55C220 42 210 30 195 30C180 30 170 42 170 55Z" />
          
          {/* R in Aurora */}
          <path className="logo-path" d="M230 30V80" />
          <path className="logo-path" d="M230 30H250C255 30 260 35 260 40C260 45 255 50 250 50H230" />
          <path className="logo-path" d="M245 50L260 80" />
          
          {/* A in Aurora */}
          <path className="logo-path" d="M270 80L290 20L310 80" />
          <path className="logo-path" d="M280 50L300 50" />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedLogo; 