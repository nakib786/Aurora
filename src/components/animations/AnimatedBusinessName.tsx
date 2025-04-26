'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedBusinessNameProps {
  className?: string;
  delay?: number;
}

const AnimatedBusinessName = ({ className = '', delay = 0 }: AnimatedBusinessNameProps) => {
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
        
        const svgElement = svgRef.current;
        if (!svgElement) return;
        
        const paths = svgElement.querySelectorAll('.business-path');
        
        paths.forEach(path => {
          // Set up the SVG paths for animation
          const pathLength = (path as SVGPathElement).getTotalLength();
          path.setAttribute('stroke-dasharray', pathLength.toString());
          path.setAttribute('stroke-dashoffset', pathLength.toString());
        });
        
        // Create gradient animation
        anime({
          targets: '#business-gradient stop',
          offset: function(el: Element) {
            return el.getAttribute('offset') === '0%' ? ['-20%', '0%'] : ['120%', '100%'];
          },
          easing: 'easeInOutSine',
          duration: 1500,
          delay: delay,
          loop: true,
          direction: 'alternate'
        });
        
        // Animate the paths
        anime({
          targets: '.business-path',
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutQuad',
          duration: 1200,
          delay: anime.stagger(40, { start: delay }),
          complete: function() {
            // After drawing is complete, make the text visible with fill
            anime({
              targets: '.business-path',
              fill: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)'], // Keep strokes only, no fill
              easing: 'easeInOutQuad',
              duration: 600
            });
          }
        });
      } catch (error) {
        console.error('Error initializing animation:', error);
      }
    };
    
    initAnimation();
  }, [animeLoaded, delay]);

  return (
    <div className={`${className} relative`}>
      <svg 
        ref={svgRef}
        viewBox="0 0 600 150"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="business-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" /> {/* blue-500 */}
            <stop offset="50%" stopColor="#8B5CF6" /> {/* purple-500 */}
            <stop offset="100%" stopColor="#EC4899" /> {/* pink-500 */}
          </linearGradient>
        </defs>
        
        <g 
          stroke="url(#business-gradient)" 
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* First line - AURORA N&N */}
          
          {/* A */}
          <path className="business-path" d="M60 80L80 20L100 80" />
          <path className="business-path" d="M70 50L90 50" />
          
          {/* U */}
          <path className="business-path" d="M120 20V70C120 75 125 80 130 80C135 80 140 75 140 70V20" />
          
          {/* R */}
          <path className="business-path" d="M160 20V80" />
          <path className="business-path" d="M160 20H175C185 20 190 30 180 40H160" />
          <path className="business-path" d="M175 40L190 80" />
          
          {/* O */}
          <path className="business-path" d="M210 50C210 65 220 80 235 80C250 80 260 65 260 50C260 35 250 20 235 20C220 20 210 35 210 50Z" />
          
          {/* R */}
          <path className="business-path" d="M280 20V80" />
          <path className="business-path" d="M280 20H295C305 20 310 30 300 40H280" />
          <path className="business-path" d="M295 40L310 80" />
          
          {/* A */}
          <path className="business-path" d="M330 80L350 20L370 80" />
          <path className="business-path" d="M340 50L360 50" />
          
          {/* Space */}
          
          {/* N */}
          <path className="business-path" d="M400 20V80" />
          <path className="business-path" d="M400 20L430 80" />
          <path className="business-path" d="M430 20V80" />
          
          {/* & - simplified */}
          <path className="business-path" d="M450 50C460 35 455 25 445 25C435 25 435 40 445 45C455 50 450 75 435 70" />
          
          {/* N */}
          <path className="business-path" d="M480 20V80" />
          <path className="business-path" d="M480 20L510 80" />
          <path className="business-path" d="M510 20V80" />
          
          {/* Second line - BUSINESS SOLUTIONS */}
          
          {/* B */}
          <path className="business-path" d="M60 110V140" />
          <path className="business-path" d="M60 110H75C85 110 85 120 75 125H60" />
          <path className="business-path" d="M60 125H75C85 125 85 135 75 140H60" />
          
          {/* U */}
          <path className="business-path" d="M95 110V130C95 135 100 140 105 140C110 140 115 135 115 130V110" />
          
          {/* S */}
          <path className="business-path" d="M130 115C125 110 140 105 145 115C150 125 125 125 130 135C135 145 150 140 145 135" />
          
          {/* I */}
          <path className="business-path" d="M165 110V140" />
          
          {/* N */}
          <path className="business-path" d="M185 110V140" />
          <path className="business-path" d="M185 110L205 140" />
          <path className="business-path" d="M205 110V140" />
          
          {/* E */}
          <path className="business-path" d="M225 110V140" />
          <path className="business-path" d="M225 110H245" />
          <path className="business-path" d="M225 125H240" />
          <path className="business-path" d="M225 140H245" />
          
          {/* S */}
          <path className="business-path" d="M265 115C260 110 275 105 280 115C285 125 260 125 265 135C270 145 285 140 280 135" />
          
          {/* S */}
          <path className="business-path" d="M305 115C300 110 315 105 320 115C325 125 300 125 305 135C310 145 325 140 320 135" />
          
          {/* Space */}
          
          {/* S */}
          <path className="business-path" d="M355 115C350 110 365 105 370 115C375 125 350 125 355 135C360 145 375 140 370 135" />
          
          {/* O */}
          <path className="business-path" d="M390 125C390 135 400 145 410 145C420 145 430 135 430 125C430 115 420 105 410 105C400 105 390 115 390 125Z" />
          
          {/* L */}
          <path className="business-path" d="M445 110V140" />
          <path className="business-path" d="M445 140H465" />
          
          {/* U */}
          <path className="business-path" d="M480 110V130C480 135 485 140 490 140C495 140 500 135 500 130V110" />
          
          {/* T */}
          <path className="business-path" d="M510 110H530" />
          <path className="business-path" d="M520 110V140" />
          
          {/* I */}
          <path className="business-path" d="M545 110V140" />
          
          {/* O */}
          <path className="business-path" d="M560 125C560 135 570 145 580 145C590 145 600 135 600 125C600 115 590 105 580 105C570 105 560 115 560 125Z" />
          
          {/* N */}
          <path className="business-path" d="M615 110V140" />
          <path className="business-path" d="M615 110L635 140" />
          <path className="business-path" d="M635 110V140" />
          
          {/* S */}
          <path className="business-path" d="M650 115C645 110 660 105 665 115C670 125 645 125 650 135C655 145 670 140 665 135" />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedBusinessName; 