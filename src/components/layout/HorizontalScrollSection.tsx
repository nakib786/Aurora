'use client';

import React, { useEffect, useRef } from 'react';
import { HorizontalScroll } from '@/components/animations/AdvancedAnimations';

interface Technology {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'accounting';
}

const technologies: Technology[] = [
  { name: 'React', icon: '⚛️', category: 'frontend' },
  { name: 'Next.js', icon: '▲', category: 'frontend' },
  { name: 'TypeScript', icon: '🔷', category: 'frontend' },
  { name: 'TailwindCSS', icon: '🌊', category: 'frontend' },
  { name: 'Node.js', icon: '🟢', category: 'backend' },
  { name: 'Python', icon: '🐍', category: 'backend' },
  { name: 'PostgreSQL', icon: '🐘', category: 'backend' },
  { name: 'MongoDB', icon: '🍃', category: 'backend' },
  { name: 'Docker', icon: '🐳', category: 'tools' },
  { name: 'AWS', icon: '☁️', category: 'tools' },
  { name: 'GitHub', icon: '🐙', category: 'tools' },
  { name: 'CI/CD', icon: '🔄', category: 'tools' },
  { name: 'Accounting', icon: '📊', category: 'accounting' },
  { name: 'Tax Planning', icon: '💰', category: 'accounting' },
  { name: 'Financial Analysis', icon: '📈', category: 'accounting' },
  { name: 'Bookkeeping', icon: '📚', category: 'accounting' },
];

export default function HorizontalScrollSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Reset horizontal scroll when section goes completely out of view
  useEffect(() => {
    const section = scrollContainerRef.current;
    if (!section) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When the section is completely out of view, force reset
        if (!entry.isIntersecting && 
            (entry.boundingClientRect.bottom < -100 || entry.boundingClientRect.top > window.innerHeight + 100)) {
          // Try to reset the transform
          const scrollContainer = section.querySelector('div');
          if (scrollContainer) {
            scrollContainer.style.transform = 'translateX(0)';
          }
        }
      });
    }, {
      threshold: 0,
      rootMargin: '-50px 0px'
    });
    
    observer.observe(section);
    return () => observer.unobserve(section);
  }, []);
  
  return (
    <div ref={scrollContainerRef} className="py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-2">
          Our Expertise
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto">
          We utilize cutting-edge technologies to deliver exceptional solutions for your business
        </p>
      </div>
      
      {/* Desktop view (unchanged) - hidden on mobile */}
      <div className="relative w-full overflow-hidden hidden md:block">
        <HorizontalScroll className="py-8">
          <div className="flex items-center space-x-8 px-8">
            {technologies.map((tech, index) => (
              <TechCard key={index} technology={tech} />
            ))}
          </div>
        </HorizontalScroll>
      </div>
      
      {/* Mobile marquee view - only visible on mobile */}
      <div className="md:hidden w-full overflow-hidden">
        <div className="marquee-container py-8">
          <div className="marquee">
            <div className="marquee-content flex items-center space-x-4">
              {technologies.map((tech, index) => (
                <TechCard key={`marquee-1-${index}`} technology={tech} />
              ))}
            </div>
            <div className="marquee-content flex items-center space-x-4" aria-hidden="true">
              {technologies.map((tech, index) => (
                <TechCard key={`marquee-2-${index}`} technology={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <a 
          href="/contact"
          className="inline-block bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105"
        >
          Start Your Project
        </a>
      </div>
      
      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }
        
        .marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .marquee-content {
          display: flex;
          min-width: 100%;
          padding: 0 1rem;
        }
      `}</style>
    </div>
  );
}

function TechCard({ technology }: { technology: Technology }) {
  const categoryColors = {
    frontend: 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
    backend: 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800',
    tools: 'bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800',
    accounting: 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800',
  };
  
  const categoryTextColors = {
    frontend: 'text-blue-600 dark:text-blue-400',
    backend: 'text-green-600 dark:text-green-400',
    tools: 'text-purple-600 dark:text-purple-400',
    accounting: 'text-amber-600 dark:text-amber-400',
  };
  
  return (
    <div className={`flex flex-col items-center p-6 rounded-xl border-2 ${categoryColors[technology.category]} min-w-[150px] md:min-w-[200px] transition-transform duration-300 hover:scale-105`}>
      <div className="text-4xl mb-3">{technology.icon}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{technology.name}</h3>
      <span className={`text-sm font-medium ${categoryTextColors[technology.category]} bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full`}>
        {technology.category.charAt(0).toUpperCase() + technology.category.slice(1)}
      </span>
    </div>
  );
} 