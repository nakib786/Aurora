'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FuturisticCTA = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      // Calculate position relative to the container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  const calculateDistance = (x: number, y: number) => {
    if (!containerRef.current) return 0;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    return Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-blue-950 to-indigo-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div 
          ref={containerRef}
          className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden bg-black/20 backdrop-blur-lg border border-white/10 p-1"
        >
          {/* Animated background gradient */}
          <div 
            className="absolute inset-0 opacity-60 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(79, 70, 229, 0.3) 0%, rgba(0, 0, 0, 0) ${calculateDistance(mousePosition.x, mousePosition.y) / 3}px)`,
              transition: 'background 0.1s'
            }}
          ></div>
          
          <div className="rounded-xl overflow-hidden p-12 md:p-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-500/30 text-indigo-200 text-sm font-medium mb-6">
                  Take Action
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Transform Your{' '}
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Digital Presence?
                  </span>
                </h2>
                
                <p className="text-xl text-blue-100 mb-8">
                  Let's collaborate to create exceptional web experiences that elevate your brand and drive business growth.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="/contact" 
                    className="group relative px-8 py-4 font-bold text-white rounded-lg overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Project
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
                  </a>
                  
                  <a 
                    href="#services" 
                    className="px-8 py-4 font-bold text-blue-300 rounded-lg border border-blue-500/30 hover:bg-blue-500/10 transition-colors duration-300"
                  >
                    View Services
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Decorative code blocks */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <pre className="font-mono text-blue-300 text-xs">
{`function createAmazingWebsite() {
  const client = new Client({
    vision: "innovative",
    goals: ["growth", "engagement", "conversion"],
    industry: "YourIndustry"
  });
  
  const project = new WebProject(client);
  project.design().develop().deploy();
  
  return project.success();
}`}
                  </pre>
                </div>
                
                {/* Animated elements */}
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      rotate: [0, 180, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 20,
                      repeat: Infinity,
                      easings: ["easeInOut"]
                    }}
                    className="absolute w-64 h-64 rounded-full border-4 border-dashed border-indigo-500/30 opacity-40"
                  ></motion.div>
                  
                  <motion.div
                    animate={{
                      rotate: [360, 180, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 15,
                      repeat: Infinity,
                      easings: ["easeInOut"]
                    }}
                    className="absolute w-48 h-48 rounded-full border-4 border-dashed border-blue-500/30 opacity-40"
                  ></motion.div>
                  
                  <div className="relative z-10 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-lg shadow-indigo-500/10">
                    <div className="flex space-x-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    
                    <div className="space-y-3 p-4">
                      <div className="h-4 w-full rounded bg-blue-500/20"></div>
                      <div className="h-4 w-4/5 rounded bg-indigo-500/20"></div>
                      <div className="h-4 w-full rounded bg-blue-500/20"></div>
                      <div className="h-4 w-3/4 rounded bg-indigo-500/20"></div>
                      <div className="h-4 w-full rounded bg-blue-500/20"></div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <div className="h-8 w-24 rounded-md bg-indigo-500/30"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuturisticCTA; 