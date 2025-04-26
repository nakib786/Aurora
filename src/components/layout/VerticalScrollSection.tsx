'use client';

import React, { useEffect, useRef } from 'react';
import { VerticalScroll } from '@/components/animations/AdvancedAnimations';
import { ParallaxLeft, ParallaxRight } from '@/components/animations/ParallaxScroller';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  direction: 'left' | 'right';
}

const features: Feature[] = [
  {
    title: 'Modern Web Development',
    description: 'Create responsive, fast, and visually stunning websites with the latest technologies.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    direction: 'left'
  },
  {
    title: 'Financial Excellence',
    description: 'Expert accounting services that ensure your finances are managed with precision and compliance.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
    direction: 'right'
  },
  {
    title: 'Strategic Tax Planning',
    description: 'Minimize tax liabilities and maximize savings with our strategic tax planning services.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
    direction: 'left'
  },
  {
    title: 'E-commerce Solutions',
    description: 'Build powerful online stores with secure payment processing and intuitive user experiences.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
    ),
    direction: 'right'
  },
  {
    title: 'Custom Application Development',
    description: 'Tailor-made applications built with scalability and performance in mind to meet your unique needs.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    direction: 'left'
  }
];

export default function VerticalScrollSection() {
  return (
    <div className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive business solutions tailored to your specific needs
          </p>
        </div>
        
        <VerticalScroll className="space-y-32 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </VerticalScroll>
      </div>
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ParallaxComponent = feature.direction === 'left' ? ParallaxLeft : ParallaxRight;
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Reset card visibility when it goes out of viewport
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When card is out of viewport by a significant margin, force reset its classes
        if (!entry.isIntersecting && 
            (entry.boundingClientRect.bottom < -100 || entry.boundingClientRect.top > window.innerHeight + 100)) {
          card.classList.add('opacity-0');
          card.classList.remove('opacity-100');
        }
      });
    }, {
      threshold: 0,
      rootMargin: '-20% 0px'
    });
    
    observer.observe(card);
    return () => observer.unobserve(card);
  }, []);
  
  return (
    <div ref={cardRef} className="scroll-item opacity-0 transition-opacity duration-500">
      <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
        <ParallaxComponent speed={0.15} className="w-full md:w-1/2">
          <div className={`p-8 rounded-2xl shadow-lg ${feature.direction === 'left' ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-purple-50 dark:bg-purple-900/20'}`}>
            <div className={`inline-flex p-4 rounded-full mb-6 ${feature.direction === 'left' ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800/50' : 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-800/50'}`}>
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        </ParallaxComponent>
        
        <div className="w-full md:w-1/2">
          <div className={`h-64 rounded-2xl overflow-hidden shadow-lg ${index % 2 === 0 ? 'transform md:rotate-2' : 'transform md:-rotate-2'}`}>
            <div className={`w-full h-full bg-gradient-to-br ${index % 2 === 0 ? 'from-blue-400 to-indigo-600 dark:from-blue-600 dark:to-indigo-800' : 'from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-800'}`}>
              <div className={`w-full h-full opacity-20 flex items-center justify-center ${feature.direction === 'left' ? 'bg-dot-pattern' : 'bg-circle-pattern'}`}>
                {/* Pattern background */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 