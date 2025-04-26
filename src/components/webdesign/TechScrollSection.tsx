'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const technologies = [
  { name: 'React', icon: 'react', color: '#61DAFB' },
  { name: 'Next.js', icon: 'nextjs', color: '#000000' },
  { name: 'TypeScript', icon: 'typescript', color: '#3178C6' },
  { name: 'TailwindCSS', icon: 'tailwind', color: '#06B6D4' },
  { name: 'Node.js', icon: 'nodejs', color: '#339933' },
  { name: 'GraphQL', icon: 'graphql', color: '#E10098' },
  { name: 'Vue.js', icon: 'vue', color: '#4FC08D' },
  { name: 'Angular', icon: 'angular', color: '#DD0031' },
  { name: 'MongoDB', icon: 'mongodb', color: '#47A248' },
  { name: 'Firebase', icon: 'firebase', color: '#FFCA28' },
  { name: 'AWS', icon: 'aws', color: '#FF9900' },
  { name: 'Docker', icon: 'docker', color: '#2496ED' },
];

const InfiniteScroll = ({ direction = 'left', speed = 20, children }: { direction?: 'left' | 'right', speed?: number, children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    const scrollWidth = scrollContainer.scrollWidth;
    const viewportWidth = scrollContainer.offsetWidth;
    
    if (scrollWidth <= viewportWidth) return;
    
    let scrollPos = 0;
    const scroll = () => {
      if (!scrollContainer) return;
      
      const maxScroll = scrollWidth / 2;
      
      if (direction === 'left') {
        scrollPos += speed / 60;
        if (scrollPos >= maxScroll) scrollPos = 0;
      } else {
        scrollPos -= speed / 60;
        if (scrollPos <= 0) scrollPos = maxScroll;
      }
      
      scrollContainer.scrollLeft = scrollPos;
      requestAnimationFrame(scroll);
    };
    
    const animationId = requestAnimationFrame(scroll);
    
    return () => cancelAnimationFrame(animationId);
  }, [direction, speed]);
  
  return (
    <div ref={scrollRef} className="overflow-x-hidden whitespace-nowrap">
      <div className="inline-block">
        {children}
      </div>
      <div className="inline-block">
        {children}
      </div>
    </div>
  );
};

const TechScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);
  
  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity, y }}
      className="py-24 bg-gradient-to-r from-gray-900 via-blue-950 to-indigo-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Cutting-Edge <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Technologies</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          We leverage the latest frameworks and tools to build high-performance, scalable digital solutions.
        </p>
      </div>
      
      <div className="space-y-16">
        <InfiniteScroll direction="left" speed={15}>
          <div className="flex gap-8 py-4">
            {technologies.map((tech, index) => (
              <div 
                key={`tech1-${index}`}
                className="flex flex-col items-center justify-center w-40 h-40 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 mb-4">
                  <div 
                    className={`w-10 h-10 tech-icon-${tech.icon}`}
                    style={{ background: `radial-gradient(circle at center, ${tech.color}40 0%, transparent 70%)` }}
                  ></div>
                </div>
                <span className="text-white font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </InfiniteScroll>
        
        <InfiniteScroll direction="right" speed={20}>
          <div className="flex gap-8 py-4">
            {[...technologies].reverse().map((tech, index) => (
              <div 
                key={`tech2-${index}`}
                className="flex flex-col items-center justify-center w-40 h-40 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/30 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 mb-4">
                  <div 
                    className={`w-10 h-10 tech-icon-${tech.icon}`}
                    style={{ background: `radial-gradient(circle at center, ${tech.color}40 0%, transparent 70%)` }}
                  ></div>
                </div>
                <span className="text-white font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </motion.div>
  );
};

export default TechScrollSection; 