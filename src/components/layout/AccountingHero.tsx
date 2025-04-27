'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  AnimatePresence 
} from '../animations/MotionComponents';
import { 
  TypewriterText, 
  RevealText,
  FloatingElements,
  CodeEffect 
} from '@/components/animations/AdvancedAnimations';
import AnimeParticles from '@/components/animations/AnimeParticles';
import AnimatedLogo from '@/components/animations/AnimatedLogo';
import { useTheme } from '@/components/ui/theme-provider';

export default function AccountingHero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  
  // 3D tilt effect
  const containerRef = useRef<HTMLDivElement>(null);
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  
  // Interval for cycling bank names and amounts
  useEffect(() => {
    const interval = setInterval(() => {
      setCycleKey(prev => (prev + 1) % 5);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
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
    <div className="relative min-h-screen flex items-center overflow-hidden pt-16 md:pt-20" ref={containerRef}>
      {/* Dynamic 3D Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-blue-100 dark:from-red-950 dark:via-blue-900 dark:to-gray-950 z-0">
        {/* Animated particles */}
        <div className="absolute inset-0 opacity-20">
          <AnimeParticles count={100} colors={isDark ? ["#ffffff", "#e11d48"] : ["#ef4444", "#3b82f6", "#1e3a8a"]} />
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Canadian maple leaf background elements */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <svg className="absolute top-40 left-20 w-32 h-32 text-red-600 dark:text-red-500 transform rotate-12" viewBox="0 0 512 512" fill="currentColor">
            <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
          </svg>
          <svg className="absolute top-1/4 right-1/4 w-48 h-48 text-red-600 dark:text-red-500 transform -rotate-6" viewBox="0 0 512 512" fill="currentColor" opacity="0.3">
            <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
          </svg>
          <svg className="absolute bottom-20 left-1/3 w-24 h-24 text-red-600 dark:text-red-500 transform rotate-45" viewBox="0 0 512 512" fill="currentColor" opacity="0.4">
            <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
          </svg>
        </div>
        
        {/* Animated glowing orbs - Canadian themed */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-red-500/20 dark:bg-red-500/20 blur-3xl"
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
          className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-blue-500/20 dark:bg-blue-500/20 blur-3xl"
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
            <div className="float-item absolute bottom-1/3 left-1/3 text-5xl opacity-70">$</div>
            <div className="float-item absolute bottom-1/4 right-1/5 text-6xl opacity-70 text-red-600">C$</div>
            <div className="float-item absolute top-2/3 left-1/6 text-8xl opacity-70 text-red-600">$</div>
            <div className="float-item absolute top-1/6 right-1/3 text-5xl opacity-70">CAD</div>
          </FloatingElements>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 z-10">
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
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-blue-600 dark:from-red-600 dark:to-blue-700 text-white text-sm font-medium mb-2">
                <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></span>
                Canadian Tax Experts & Business Solutions
              </div>
            </motion.div>
            
            <RevealText className="relative text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              <h1>
                Aurora N&N <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600 dark:from-red-400 dark:to-blue-400">
                  Business Solution Inc.
                </span>
              </h1>
            </RevealText>
            
            <TypewriterText className="text-xl text-gray-600 dark:text-gray-300 max-w-xl" delay={1000}>
              Maximize your CRA tax refunds with our expert Canadian accounting, taxation, and web development solutions.
            </TypewriterText>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <a 
                href="/accounting" 
                className="group relative overflow-hidden btn-primary inline-block bg-gradient-to-r from-red-600 to-blue-600 dark:from-red-500 dark:to-blue-500 hover:from-red-700 hover:to-blue-700 dark:hover:from-red-600 dark:hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg transform hover:-translate-y-1"
              >
                Tax Services
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
          
          {/* Mobile-only cards - only visible on small screens */}
          <div className="block sm:hidden w-full space-y-4 mb-8">
            {/* CRA Refund Card - Mobile */}
            <div className="bg-gradient-to-r from-red-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex items-center bg-red-50 dark:bg-red-900/30 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-1">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">CRA Refund Portal</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tax Year 2023-2024</p>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Refund Status */}
                <div className="bg-red-50/50 dark:bg-red-900/10 rounded-lg p-3 border border-red-100 dark:border-red-800/30">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-red-600 dark:text-red-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium text-gray-800 dark:text-gray-200">Refund Status</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-2 py-1 rounded-full">
                      Processing
                    </span>
                  </div>
                  <div className="flex items-center mb-1 mt-2">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Refund Progress</div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-red-600 dark:bg-red-500 h-2 rounded-full w-[85%]"></div>
                      </div>
                    </div>
                    <div className="ml-4 text-lg font-bold text-gray-800 dark:text-white">
                      85%
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    Estimated deposit: 5-7 business days
                  </div>
                </div>
                
                {/* Financial metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Refund</div>
                    <div className="text-lg font-bold text-gray-800 dark:text-white">C$3,842</div>
                    <div className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                      +18.5%
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Tax Paid</div>
                    <div className="text-lg font-bold text-gray-800 dark:text-white">C$12,680</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1">
                      Standard
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Savings</div>
                    <div className="text-lg font-bold text-gray-800 dark:text-white">C$5,214</div>
                    <div className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                      +23.7%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Direct Deposit Card - Mobile */}
            <div className="bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-gray-800/70 rounded-lg shadow-xl p-4 backdrop-blur-sm border-2 border-green-500/70 dark:border-green-500/50">
              <div className="flex items-center justify-between mb-2">
                <svg className="w-7 h-7 text-green-600 dark:text-green-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <div className="ml-2 flex items-center">
                  <span className="text-sm font-bold bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-3 py-1 rounded-full">
                    DIRECT DEPOSIT
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Receiving Bank</div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`mobile-bank-${cycleKey}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      {[
                        "RBC Royal Bank",
                        "TD Canada Trust", 
                        "Scotiabank",
                        "BMO Bank of Montreal",
                        "CIBC"
                      ][cycleKey]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-xs text-gray-600 dark:text-gray-300"></div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`mobile-amount-${cycleKey}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl font-bold text-green-600 dark:text-green-400"
                  >
                    C${[
                      "3,842.75",
                      "4,125.50",
                      "3,976.25",
                      "4,210.00",
                      "3,895.50"
                    ][cycleKey]}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                <motion.div 
                  className="h-2 bg-green-500 dark:bg-green-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 1.5 }}
                ></motion.div>
              </div>
              <div className="text-right text-xs mt-1 text-gray-500 dark:text-gray-400">
                Ready to receive
              </div>
            </div>
          </div>
          
          {/* Desktop View - 3D visual elements */}
          <div className="hidden sm:block lg:col-span-6 relative">
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
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl overflow-hidden transform translate-z-0 scale-85" style={{ transform: 'translateZ(50px) scale(0.85)' }}>
                {/* Dashboard header with CRA branding */}
                <div className="flex items-center bg-red-50 dark:bg-red-900/30 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">CRA Refund Portal</h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tax Year 2023-2024</p>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">
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
                  {/* Refund Status - New section */}
                  <div className="bg-red-50/50 dark:bg-red-900/10 rounded-lg p-4 border border-red-100 dark:border-red-800/30">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-red-600 dark:text-red-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium text-gray-800 dark:text-gray-200">Refund Status</span>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-2 py-1 rounded-full">
                        Processing
                      </span>
                    </div>
                    <div className="flex items-center mb-1 mt-3">
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Refund Progress</div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <motion.div 
                            className="bg-red-600 dark:bg-red-500 h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "85%" }}
                            transition={{ duration: 1.2 }}
                          ></motion.div>
                        </div>
                      </div>
                      <div className="ml-4 text-lg font-bold text-gray-800 dark:text-white">
                        85%
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 text-right">
                      Estimated deposit: 5-7 business days
                    </div>
                  </div>
                  
                  {/* Financial metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <motion.div 
                      className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg"
                      whileHover={{ y: -5 }}
                    >
                      <div className="text-sm text-gray-500 dark:text-gray-400">Refund Amount</div>
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">C$3,842</div>
                      <div className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        18.5%
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                      whileHover={{ y: -5 }}
                    >
                      <div className="text-sm text-gray-500 dark:text-gray-400">Tax Paid</div>
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">C$12,680</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Standard
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                      whileHover={{ y: -5 }}
                    >
                      <div className="text-sm text-gray-500 dark:text-gray-400">Total Savings</div>
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">C$5,214</div>
                      <div className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        23.7%
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Money flow visualization - Modified for refunds */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">CRA Refund History</div>
                    <div className="h-24 flex items-end space-x-2">
                      <motion.div 
                        className="w-1/12 bg-red-400 dark:bg-red-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "30%" }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-blue-400 dark:bg-blue-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "25%" }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-red-400 dark:bg-red-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "45%" }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-blue-400 dark:bg-blue-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "30%" }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-red-400 dark:bg-red-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "50%" }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-blue-400 dark:bg-blue-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "35%" }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-red-400 dark:bg-red-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "65%" }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-blue-400 dark:bg-blue-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "40%" }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-red-400 dark:bg-red-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "75%" }}
                        transition={{ duration: 0.7, delay: 0.9 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-blue-400 dark:bg-blue-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "50%" }}
                        transition={{ duration: 0.7, delay: 1.0 }}
                      ></motion.div>
                      <motion.div 
                        className="w-1/12 bg-red-400 dark:bg-red-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: "85%" }}
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
                  
                  {/* CRA Timeline */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">CRA Processing Timeline</div>
                    <div className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                      On Schedule
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <motion.div 
                      className="bg-red-600 dark:bg-red-500 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1.2 }}
                    ></motion.div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Filed</span>
                    <span>Processing</span>
                    <span>Approved</span>
                    <span>Deposited</span>
                  </div>
                </div>
              </div>
              
              {/* Business Solutions Card - Web design element - floating above */}
              <motion.div 
                className="absolute -top-5 -left-3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg shadow-xl p-4 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50"
                whileHover={{ y: 5, x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                style={{ transform: 'translateZ(100px)' }}
              >
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-blue-600 dark:text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-gray-800 dark:text-gray-200">Aurora N&N Business Solutions Inc.</span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-1">
                  <div className="h-2 bg-blue-200 dark:bg-blue-700 rounded"></div>
                  <div className="h-2 bg-purple-200 dark:bg-purple-700 rounded"></div>
                  <div className="h-2 bg-pink-200 dark:bg-pink-700 rounded"></div>
                  <div className="h-2 bg-indigo-200 dark:bg-indigo-700 rounded col-span-2"></div>
                  <div className="h-2 bg-blue-200 dark:bg-blue-700 rounded"></div>
                </div>
              </motion.div>
              
              {/* Direct Deposit Card - Desktop */}
              <motion.div 
                className="absolute bottom-32 -right-32 z-[100] bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-gray-800/70 rounded-lg shadow-2xl p-4 backdrop-blur-sm border-2 border-green-500/70 dark:border-green-500/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  boxShadow: ["0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)", 
                             "0 25px 50px -12px rgba(0, 0, 0, 0.25)", 
                             "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"],
                  scale: [1, 1.02, 1]
                }}
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15,
                  delay: 0.8,
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
                style={{ transform: 'translateZ(150px)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <div className="ml-2 flex items-center">
                    <span className="text-sm font-bold bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-3 py-1 rounded-full">
                      DIRECT DEPOSIT
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Receiving Bank</div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`bank-${cycleKey}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm font-medium text-gray-800 dark:text-gray-200"
                      >
                        {[
                          "RBC Royal Bank",
                          "TD Canada Trust", 
                          "Scotiabank",
                          "BMO Bank of Montreal",
                          "CIBC"
                        ][cycleKey]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-xs text-gray-600 dark:text-gray-300"></div>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`amount-${cycleKey}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="text-xl font-bold text-green-600 dark:text-green-400"
                    >
                      C${[
                        "3,842.75",
                        "4,125.50",
                        "3,976.25",
                        "4,210.00",
                        "3,895.50"
                      ][cycleKey]}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                  <motion.div 
                    className="h-2 bg-green-500 dark:bg-green-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1.5 }}
                  ></motion.div>
                </div>
                <div className="text-right text-xs mt-1 text-gray-500 dark:text-gray-400">
                  Ready to receive
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