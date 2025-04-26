'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  AnimatePresence 
} from 'framer-motion';
import { 
  TypewriterText, 
  RevealText,
  FloatingElements,
  CodeEffect 
} from '@/components/animations/AdvancedAnimations';
import AnimeParticles from '@/components/animations/AnimeParticles';
import AnimatedLogo from '@/components/animations/AnimatedLogo';
import { useTheme } from '@/components/ui/theme-provider';

export default function AnimatedHero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // 3D tilt effect
  const containerRef = useRef<HTMLDivElement>(null);
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  
  // Mouse move handler for 3D effect
  useEffect(() => {
    if (!containerRef.current || !mounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const { width, height } = rect;
      const centerX = rect.left + width / 2;
      const centerY = rect.top + height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      // Convert mouse position to rotation angles
      // Divide by a larger number for subtle effect
      rotateX.set(mouseY / 30);
      rotateY.set(-mouseX / 30);
    };
    
    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [rotateX, rotateY, mounted]);
  
  // Only access window/DOM APIs after mounting
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Default to light theme for server-side rendering to avoid hydration mismatch
  const isDark = mounted && (
    theme === 'dark' || 
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden" ref={containerRef}>
      {/* Dynamic 3D Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-100 dark:from-blue-950 dark:via-teal-900 dark:to-green-950 z-0">
        {/* Animated particles */}
        <div className="absolute inset-0 opacity-20">
          <AnimeParticles count={100} colors={isDark ? ["#ffffff"] : ["#10b981", "#3b82f6", "#047857"]} />
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Animated glowing orbs - accounting themed */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-green-500/20 dark:bg-green-500/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-blue-500/20 dark:bg-teal-500/20 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Floating accounting symbols */}
        <div className="absolute opacity-10 dark:opacity-15">
          <FloatingElements>
            <div className="float-item absolute top-1/4 left-1/5 text-6xl opacity-70">$</div>
            <div className="float-item absolute top-1/3 right-1/4 text-7xl opacity-70">%</div>
            <div className="float-item absolute bottom-1/3 left-1/3 text-5xl opacity-70">₿</div>
            <div className="float-item absolute bottom-1/4 right-1/5 text-6xl opacity-70">€</div>
            <div className="float-item absolute top-2/3 left-1/6 text-8xl opacity-70">₹</div>
            <div className="float-item absolute top-1/6 right-1/3 text-5xl opacity-70">£</div>
          </FloatingElements>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 z-10">
        <div className="flex justify-center mb-8">
          <AnimatedLogo className="w-64 h-32 text-blue-600 dark:text-blue-400" delay={300} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left column - Text content */}
          <motion.div 
            className="lg:col-span-6 space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-blue-600 dark:from-green-600 dark:to-blue-700 text-white text-sm font-medium mb-2">
                <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></span>
                Expert Financial & Business Solutions
              </div>
            </motion.div>
            
            <RevealText className="relative text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              <h1>
                Aurora N&N <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400">
                  Accounting & Tax
                </span>
              </h1>
            </RevealText>
            
            <TypewriterText className="text-xl text-gray-600 dark:text-gray-300 max-w-xl" delay={1000}>
              Navigate financial complexities with our expert accounting, taxation, and web development solutions.
            </TypewriterText>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <a 
                href="/accounting" 
                className="group relative overflow-hidden btn-primary inline-block bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500 hover:from-green-700 hover:to-blue-700 dark:hover:from-green-600 dark:hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg transform hover:-translate-y-1"
              >
                Accounting Services
                <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
              </a>
              <a 
                href="/webdesign" 
                className="group relative overflow-hidden btn-secondary inline-block bg-transparent border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md transform hover:-translate-y-1"
              >
                Web Design
                <span className="absolute inset-0 w-full h-full bg-blue-600 dark:bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity"></span>
              </a>
            </motion.div>
          </motion.div>
          
          {/* Right column - 3D visual elements */}
          <div className="lg:col-span-6 relative">
            <motion.div
              className="relative"
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Main accounting dashboard */}
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl overflow-hidden transform translate-z-0" style={{ transform: 'translateZ(50px)' }}>
                {/* Dashboard header */}
                <div className="flex items-center bg-green-50 dark:bg-green-900/30 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Financial Dashboard</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fiscal Year 2023-2024</p>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Dashboard content */}
                <div className="p-6 space-y-6">
                  {/* Financial metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <motion.div 
                      className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                      whileHover={{ y: -5 }}
                    >
                      <div className="text-sm text-gray-500 dark:text-gray-400">Revenue</div>
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">$84,254</div>
                      <div className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        12.5%
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                      whileHover={{ y: -5 }}
                    >
                      <div className="text-sm text-gray-500 dark:text-gray-400">Expenses</div>
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">$42,830</div>
                      <div className="text-xs text-red-600 dark:text-red-400 flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        8.3%
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg"
                      whileHover={{ y: -5 }}
                    >
                      <div className="text-sm text-gray-500 dark:text-gray-400">Tax Savings</div>
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">$12,438</div>
                      <div className="text-xs text-teal-600 dark:text-teal-400 flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        23.7%
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Graph section */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Revenue vs. Expenses</div>
                    <div className="h-24 flex items-end space-x-2">
                      <motion.div 
                        className="w-1/12 bg-green-400 dark:bg-green-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "40%" }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-blue-400 dark:bg-blue-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "30%" }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-green-400 dark:bg-green-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "55%" }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-blue-400 dark:bg-blue-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "35%" }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-green-400 dark:bg-green-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "60%" }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-blue-400 dark:bg-blue-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "40%" }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-green-400 dark:bg-green-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "75%" }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-blue-400 dark:bg-blue-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "45%" }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-green-400 dark:bg-green-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "80%" }}
                        transition={{ duration: 0.7, delay: 0.9 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-blue-400 dark:bg-blue-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "50%" }}
                        transition={{ duration: 0.7, delay: 1.0 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-green-400 dark:bg-green-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "90%" }}
                        transition={{ duration: 0.7, delay: 1.1 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-blue-400 dark:bg-blue-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "60%" }}
                        transition={{ duration: 0.7, delay: 1.2 }}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <div>Jan</div>
                      <div>Feb</div>
                      <div>Mar</div>
                      <div>Apr</div>
                      <div>May</div>
                      <div>Jun</div>
                    </div>
                  </div>
                  
                  {/* Tax timeline */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Tax Filing Timeline</div>
                    <div className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">On Schedule</div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <motion.div 
                      className="bg-green-600 dark:bg-green-500 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1.2 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
              
              {/* Web design element - floating above */}
              <motion.div 
                className="absolute -top-10 -left-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg shadow-xl p-4 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50"
                whileHover={{ y: 5, x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                style={{ transform: 'translateZ(100px)' }}
              >
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-purple-600 dark:text-purple-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-gray-800 dark:text-gray-200">Web Design</span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-1">
                  <div className="h-2 bg-purple-200 dark:bg-purple-700 rounded"></div>
                  <div className="h-2 bg-blue-200 dark:bg-blue-700 rounded"></div>
                  <div className="h-2 bg-pink-200 dark:bg-pink-700 rounded"></div>
                  <div className="h-2 bg-indigo-200 dark:bg-indigo-700 rounded col-span-2"></div>
                  <div className="h-2 bg-violet-200 dark:bg-violet-700 rounded"></div>
                </div>
              </motion.div>
              
              {/* Tax document floating element */}
              <motion.div 
                className="absolute -bottom-8 -right-8 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-xl p-4 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
                whileHover={{ y: -5, x: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                style={{ transform: 'translateZ(80px)' }}
              >
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-green-600 dark:text-green-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium text-gray-800 dark:text-gray-200">Tax Documents</span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-500 mr-2"></div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Form 1040</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-sm bg-yellow-400 dark:bg-yellow-500 mr-2"></div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Schedule C</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-sm bg-blue-400 dark:bg-blue-500 mr-2"></div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Form 8829</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <motion.span 
              className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
} 