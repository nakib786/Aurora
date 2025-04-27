'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypewriterText } from '../animations/AdvancedAnimations';
import AnimeParticles from '../animations/AnimeParticles';

const FuturisticHero = () => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!terminalRef.current) return;
    
    const typeText = async () => {
      const lines = [
        'Initializing modern web design protocol...',
        'Loading innovative UI components...',
        'Establishing connection to creativity engine...',
        'Ready to transform your digital presence.',
      ];
      
      const terminal = terminalRef.current;
      if (!terminal) return; // Check if terminal is null
      
      for (const line of lines) {
        const lineElement = document.createElement('div');
        lineElement.className = 'terminal-line';
        terminal.appendChild(lineElement);
        
        for (let i = 0; i < line.length; i++) {
          lineElement.textContent = `> ${line.substring(0, i + 1)}`;
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    };
    
    typeText();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-24">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-950 z-0">
        <div className="absolute inset-0 opacity-20">
          <AnimeParticles count={100} colors={["#ffffff"]} />
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Animated glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left text content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-500/30 text-indigo-200 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
              Next Generation Web Design
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-200">
              Building Digital<br />Experiences
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-lg">
              Revolutionary web solutions crafted for the modern era. Seamless integration of cutting-edge technology with stunning aesthetics.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#services" className="group relative px-6 py-3 font-medium text-white rounded-lg overflow-hidden bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/20">
                <span className="relative z-10">Explore Services</span>
                <span className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
              </a>
              
              <a href="/contact" className="group relative px-6 py-3 font-medium text-white rounded-lg overflow-hidden border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300 shadow-lg shadow-indigo-500/10">
                <span className="relative z-10">Start Project</span>
                <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
              </a>
            </div>
          </motion.div>
          
          {/* Right terminal/code animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-2xl overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center bg-gray-800 px-4 py-2 border-b border-gray-700">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center text-gray-400 text-sm font-mono">Aurora N&N Business Solution Inc.</div>
              </div>
              
              {/* Terminal content */}
              <div className="p-4 font-mono text-sm text-green-400 h-80 overflow-hidden">
                <div ref={terminalRef} className="space-y-2"></div>
                <div className="mt-4 animate-pulse">
                  <span className="inline-block w-3 h-5 bg-green-400"></span>
                </div>
              </div>
              
              {/* Code snippets floating in background */}
              <div className="absolute -right-8 -bottom-8 opacity-20 rotate-12">
                <pre className="text-xs text-blue-300">
{`function createWebsite() {
  const design = new Design({
    modern: true,
    responsive: true,
    animations: true
  });
  
  return deploy(design);
}`}
                </pre>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-blue-500/30 blur-xl animate-float"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-indigo-500/30 blur-xl animate-float" style={{ animationDelay: '1.5s' }}></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticHero; 