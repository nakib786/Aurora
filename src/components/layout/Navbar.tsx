'use client';

import React, { useState, useEffect } from 'react';
import { Home, FileText, Calculator, Globe, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from '../animations/MotionComponents';
import { ThemeToggle } from '../ui/theme-toggle';
import AnimatedLogo from '../animations/AnimatedLogo';
import { NavBar } from '../ui/tubelight-navbar';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define main navigation items
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Accounting & Taxation', url: '/accounting', icon: Calculator },
    { name: 'Web Development', url: '/webdesign', icon: Globe },
    { name: 'Contact Us', url: '/contact', icon: FileText }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMenuOpen]);

  // Toggle menu handler with focus management
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-2 bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg backdrop-saturate-150 border-b border-white/10 dark:border-gray-800/30 shadow-lg shadow-black/5' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo - now using the simplified AnimatedLogo component */}
        <Link href="/" className="flex items-center">
          <AnimatedLogo 
            className={`h-10 w-32 sm:h-12 sm:w-48 md:h-14 md:w-64 ${
              scrolled ? 'text-blue-600 dark:text-blue-400' : 'text-white'
            }`} 
            delay={100}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          <NavBar 
            items={navItems} 
            className={`static mb-0 translate-x-0 pt-0 ${
              scrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white'
            }`}
          />
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <motion.button
            className={`relative z-[60] p-2 rounded-full transition-colors ${
              scrolled ? 'hover:bg-white/20' : 'hover:bg-white/10'
            }`}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} className={scrolled ? 'text-gray-900 dark:text-white' : 'text-white'} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} className={scrolled ? 'text-gray-900 dark:text-white' : 'text-white'} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Fullscreen Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[55] md:hidden flex flex-col w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu content */}
            <motion.div 
              className="absolute top-0 pt-16 w-full h-full flex-1 bg-white/80 dark:bg-gray-700/80 backdrop-blur-md rounded-t-3xl shadow-2xl overflow-y-auto overflow-x-hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            >
              <div className="max-w-md mx-auto flex flex-col h-full p-5">
                {/* Menu header */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
                  <div className="h-1 w-10 bg-blue-500 rounded-full"></div>
                </div>
                
                {/* Navigation */}
                <div className="flex-1 flex flex-col">
                  <div className="grid gap-3 mb-6">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.url}
                          className="flex items-center p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors group"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="mr-3 p-2.5 rounded-full bg-blue-100 dark:bg-blue-400/30 text-blue-600 dark:text-blue-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-400/50 transition-colors">
                            <Icon size={18} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-300">
                              {item.name === 'Home' ? 'Back to homepage' : 
                               item.name === 'Accounting & Taxation' ? 'Canadian tax services' :
                               item.name === 'Web Development' ? 'Website design services' :
                               'Get in touch with us'}
                            </p>
                          </div>
                          <motion.div
                            className="text-gray-400"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-500">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 dark:text-gray-300">© 2023 Aurora N&N</p>
                    <Link
                      href="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar; 