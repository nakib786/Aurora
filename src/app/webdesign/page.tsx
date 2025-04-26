'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import WebDesignServices from '@/components/webdesign/WebDesignServices';
import FuturisticHero from '@/components/webdesign/FuturisticHero';
import TechScrollSection from '@/components/webdesign/TechScrollSection';
import FeatureParallaxSection from '@/components/webdesign/FeatureParallaxSection';
import PortfolioShowcase from '@/components/webdesign/PortfolioShowcase';
import FuturisticCTA from '@/components/webdesign/FuturisticCTA';

// Define Lenis types
interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  direction?: 'vertical' | 'horizontal';
  gestureDirection?: 'vertical' | 'horizontal';
  smooth?: boolean;
  mouseMultiplier?: number;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
}

interface Lenis {
  raf: (time: number) => void;
  scrollTo: (
    target: HTMLElement | string | number | Element,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
    }
  ) => void;
}

interface LenisConstructor {
  new (options: LenisOptions): Lenis;
}

const WebDesignPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    // Apply dark mode to document on initial load
    document.documentElement.classList.add('dark-mode');
    
    // Initialize smooth scrolling
    const initSmoothScroll = async () => {
      try {
        // Dynamically import Lenis for smooth scrolling
        const LenisModule = (await import('lenis')) as { default: LenisConstructor };
        const Lenis = LenisModule.default;
        
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        
        // Handle anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function(this: HTMLAnchorElement, e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target) {
              const targetElement = document.querySelector(target);
              if (targetElement) {
                lenis.scrollTo(targetElement, {
                  offset: -100, 
                  duration: 1.5,
                  easing: (t: number) => 1 - Math.pow(1 - t, 5),
                });
              }
            }
          });
        });
      } catch (error) {
        console.error("Error initializing smooth scroll:", error);
      }
    };

    initSmoothScroll();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark-mode');
    }
  };

  return (
    <MainLayout>
      {/* Progress bar for scrolling */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div className="progress-bar h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
      </div>
      
      {/* Cursor effects - simplified for better performance */}
      <div id="custom-cursor" className="hidden md:block fixed w-16 h-16 rounded-full pointer-events-none z-[9999] custom-cursor"></div>
      
      {/* Main content */}
      <FuturisticHero />
      
      <TechScrollSection />
      
      <div id="services" className="scroll-mt-24">
        <WebDesignServices />
      </div>
      
      <FeatureParallaxSection />
      
      <PortfolioShowcase />
      
      <FuturisticCTA />
      
      {/* Scroll to top button */}
      <button 
        id="scrollToTop"
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300 z-40"
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
      
      {/* Add custom styles and scripts for scrolling effects */}
      <style jsx global>{`
        /* Dark Mode Styles */
        :root {
          --background-dark: #121212;
          --background-light: #f5f5f7;
          --text-dark: #f5f5f7;
          --text-light: #1a1a1a;
          --primary-dark: #6366f1;
          --primary-light: #4f46e5;
          --secondary-dark: #64748b;
          --secondary-light: #94a3b8;
        }
        
        html {
          transition: background-color 0.5s ease, color 0.5s ease;
        }
        
        /* Default Dark Mode */
        html.dark-mode {
          background-color: var(--background-dark);
          color: var(--text-dark);
        }
        
        html.light-mode {
          background-color: var(--background-light);
          color: var(--text-light);
        }
        
        /* Specific dark mode styles for sections */
        html.dark-mode .feature-section {
          background-image: linear-gradient(to bottom, rgba(17, 24, 39, 0.8), rgba(12, 10, 29, 1));
        }
        
        html.dark-mode .tech-section {
          background-image: linear-gradient(to right, #111827, #0f172a);
        }
        
        html.dark-mode .portfolio-section {
          background-image: linear-gradient(to bottom, #000, #0f172a);
        }
        
        html.dark-mode .cta-section {
          background-image: linear-gradient(to bottom, #172554, #020617);
        }
        
        /* Light mode overrides */
        html.light-mode .feature-section {
          background-image: linear-gradient(to bottom, rgba(243, 244, 246, 0.8), rgba(237, 233, 254, 1));
        }
        
        html.light-mode .tech-section {
          background-image: linear-gradient(to right, #f9fafb, #f3f4f6);
        }
        
        html.light-mode .portfolio-section {
          background-image: linear-gradient(to bottom, #f5f5f7, #e0e7ff);
        }
        
        html.light-mode .cta-section {
          background-image: linear-gradient(to bottom, #eff6ff, #dbeafe);
        }
        
        html.lenis {
          height: auto;
        }
        
        .lenis.lenis-smooth {
          scroll-behavior: auto;
        }
        
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        
        .lenis.lenis-stopped {
          overflow: hidden;
        }
        
        .lenis.lenis-scrolling iframe {
          pointer-events: none;
        }
        
        .progress-bar {
          width: 0%;
          transition: width 0.1s;
        }
        
        /* Custom cursor styles - optimized for performance */
        body:has(#custom-cursor) {
          cursor: crosshair;
        }
        
        #custom-cursor {
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
          background-color: rgba(99, 102, 241, 0.5);
          border: 2px solid white;
          opacity: 0; /* Start with invisible cursor */
          transition: opacity 0.3s ease;
        }
        
        @media (min-width: 768px) {
          #custom-cursor {
            opacity: 0; /* Start invisible and let JS make it visible */
          }
        }
        
        /* Section-specific cursor shapes */
        .futuristic-hero-section #custom-cursor {
          background-color: rgba(79, 70, 229, 0.6) !important;
          border-radius: 50%; /* Circle */
        }
        
        .tech-section #custom-cursor {
          background-color: rgba(6, 182, 212, 0.6) !important;
          border-radius: 0; /* Square */
          transform: translate(-50%, -50%) rotate(45deg) !important;
        }
        
        .feature-section #custom-cursor {
          background-color: rgba(168, 85, 247, 0.6) !important;
          border-radius: 8px; /* Rounded square */
        }
        
        .portfolio-section #custom-cursor {
          background-color: rgba(59, 130, 246, 0.6) !important;
          border-radius: 50% 0 50% 0; /* Diamond */
          transform: translate(-50%, -50%) rotate(45deg) !important;
        }
        
        .cta-section #custom-cursor {
          background-color: rgba(236, 72, 153, 0.6) !important;
          border-radius: 50% 50% 0 50%; /* Teardrop */
          transform: translate(-50%, -50%) rotate(45deg) !important;
        }
        
        /* Interactive element styles */
        .cursor-hover {
          transform: translate(-50%, -50%) scale(1.5) !important;
          background-color: rgba(255, 255, 255, 0.3) !important;
          color: black !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
        }
        
        /* Background grid pattern */
        .bg-grid-pattern {
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}</style>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          // Check for saved theme preference or use dark mode as default
          function setInitialTheme() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
              document.documentElement.classList.remove('dark-mode');
              document.documentElement.classList.add('light-mode');
            } else {
              document.documentElement.classList.add('dark-mode');
              document.documentElement.classList.remove('light-mode');
            }
          }
          
          // Apply theme on page load
          document.addEventListener('DOMContentLoaded', setInitialTheme);
          
          // Listen for theme change events from navbar
          document.addEventListener('themeChanged', (e) => {
            const newTheme = e.detail.theme;
            if (newTheme === 'light') {
              document.documentElement.classList.remove('dark-mode');
              document.documentElement.classList.add('light-mode');
            } else {
              document.documentElement.classList.remove('light-mode');
              document.documentElement.classList.add('dark-mode');
            }
          });
          
          // Optimized cursor movement - using requestAnimationFrame for better performance
          let cursorX = 0;
          let cursorY = 0;
          
          // Track cursor position
          document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            
            // Update cursor position directly (don't use style.display here)
            const cursor = document.getElementById('custom-cursor');
            if (cursor) {
              cursor.style.left = \`\${cursorX}px\`;
              cursor.style.top = \`\${cursorY}px\`;
            }
            
            // Detect which section we're in
            updateCursorSection();
          });
          
          // Update progress bar on scroll with throttling for better performance
          let lastScrollTime = 0;
          window.addEventListener('scroll', () => {
            const now = Date.now();
            if (now - lastScrollTime > 50) { // Throttle to 50ms
              lastScrollTime = now;
              
              const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
              const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
              const scrolled = (winScroll / height) * 100;
              const progressBar = document.querySelector('.progress-bar');
              if (progressBar) {
                progressBar.style.width = scrolled + "%";
              }
              
              // Show/hide scroll to top button
              const scrollToTopButton = document.getElementById('scrollToTop');
              if (scrollToTopButton) {
                scrollToTopButton.style.opacity = winScroll > 500 ? '1' : '0';
              }
              
              // Update cursor section on scroll
              updateCursorSection();
            }
          });
          
          // Detect which section the cursor is in
          function updateCursorSection() {
            // Get scroll position
            const scrollY = window.scrollY || window.pageYOffset;
            const viewportHeight = window.innerHeight;
            const viewportMid = scrollY + (viewportHeight / 2);
            
            // Get section positions
            const sections = [
              { selector: '.min-h-screen', class: 'futuristic-hero-section' },
              { selector: '.py-24.bg-gradient-to-r.from-gray-900', class: 'tech-section' },
              { selector: '.relative.py-24.overflow-hidden', class: 'feature-section' },
              { selector: '.relative.py-24.bg-gradient-to-b.from-black', class: 'portfolio-section' },
              { selector: '.py-20.bg-gradient-to-b.from-blue-950', class: 'cta-section' }
            ];
            
            let activeSection = null;
            
            // Find which section we're currently in
            for (const section of sections) {
              const element = document.querySelector(section.selector);
              if (!element) continue;
              
              const rect = element.getBoundingClientRect();
              const top = rect.top + scrollY;
              const bottom = top + rect.height;
              
              if (viewportMid >= top && viewportMid <= bottom) {
                activeSection = section.class;
                break;
              }
            }
            
            if (activeSection) {
              // Remove all section classes
              document.body.classList.remove(
                'futuristic-hero-section', 
                'tech-section', 
                'feature-section', 
                'portfolio-section', 
                'cta-section'
              );
              // Add active section class
              document.body.classList.add(activeSection);
            }
          }
          
          // Make sure cursor is visible on page load
          document.addEventListener('DOMContentLoaded', () => {
            updateCursorSection();
            const cursor = document.getElementById('custom-cursor');
            if (cursor) {
              cursor.style.opacity = '1';
            }
          });
          
          // Add interaction effects to elements
          document.querySelectorAll('a, button, [role="button"]').forEach(element => {
            element.addEventListener('mouseenter', () => {
              const cursor = document.getElementById('custom-cursor');
              if (cursor) {
                cursor.classList.add('cursor-hover');
                
                // Change cursor content for different element types
                if (element.tagName === 'A') {
                  cursor.textContent = '→';
                } else if (element.tagName === 'BUTTON') {
                  cursor.textContent = '⚡';
                }
              }
            });
            
            element.addEventListener('mouseleave', () => {
              const cursor = document.getElementById('custom-cursor');
              if (cursor) {
                cursor.classList.remove('cursor-hover');
                cursor.textContent = '';
              }
            });
          });
          
          // Special cursors for different element types
          document.querySelectorAll('img').forEach(element => {
            element.addEventListener('mouseenter', () => {
              const cursor = document.getElementById('custom-cursor');
              if (cursor) {
                cursor.classList.add('cursor-hover');
                cursor.textContent = '🔍';
              }
            });
            
            element.addEventListener('mouseleave', () => {
              const cursor = document.getElementById('custom-cursor');
              if (cursor) {
                cursor.classList.remove('cursor-hover');
                cursor.textContent = '';
              }
            });
          });
          
          // Special cursor for code elements
          document.querySelectorAll('pre, code').forEach(element => {
            element.addEventListener('mouseenter', () => {
              const cursor = document.getElementById('custom-cursor');
              if (cursor) {
                cursor.classList.add('cursor-hover');
                cursor.textContent = '</>';
              }
            });
            
            element.addEventListener('mouseleave', () => {
              const cursor = document.getElementById('custom-cursor');
              if (cursor) {
                cursor.classList.remove('cursor-hover');
                cursor.textContent = '';
              }
            });
          });
          
          // Click effect
          document.addEventListener('mousedown', () => {
            const cursor = document.getElementById('custom-cursor');
            if (cursor) {
              cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
            }
          });
          
          document.addEventListener('mouseup', () => {
            const cursor = document.getElementById('custom-cursor');
            if (cursor) {
              cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            }
          });
          
          // Scroll to top button functionality
          document.getElementById('scrollToTop')?.addEventListener('click', () => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          });
          
          // Force the cursor to be visible by setting a timeout
          setTimeout(() => {
            const cursor = document.getElementById('custom-cursor');
            if (cursor) {
              cursor.style.opacity = '1';
            }
          }, 500);
        `
      }} />
    </MainLayout>
  );
};

export default WebDesignPage; 