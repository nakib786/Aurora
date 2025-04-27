'use client';

import React, { useState, useEffect, Suspense } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion, useScroll, useTransform } from '../../components/animations/MotionComponents';
import { TypewriterText, RevealText } from '@/components/animations/AdvancedAnimations';
import ContactThreeDScene from '@/components/contact/ContactThreeDScene';
import ContactForm from '@/components/contact/ContactForm';
import FloatingInfoCards from '@/components/contact/FloatingInfoCards';
import SocialMediaContact from '@/components/contact/SocialMediaContact';
import { ContactJsonLd } from '@/components/contact/ContactSEO';
import ParticleBackground from '@/components/contact/ParticleBackground';
import ContactFAQ from '@/components/contact/ContactFAQ';

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

export default function ContactPage() {
  
  // Init smooth scrolling
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
    
    // Custom cursor effect
    const initCursor = () => {
      const cursor = document.getElementById('custom-cursor');
      if (!cursor) return;
      
      const handleMouseMove = (e: MouseEvent) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursor.style.opacity = '1';
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    };
    
    const cursorCleanup = initCursor();
    
    return () => {
      if (cursorCleanup) cursorCleanup();
    };
  }, []);

  // Interactive sections with scroll-triggered animations
  const heroRef = React.useRef<HTMLDivElement>(null);
  const infoRef = React.useRef<HTMLDivElement>(null);
  const formRef = React.useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  
  return (
    <MainLayout>
      <ContactJsonLd />
      {/* Progress bar for scrolling */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div className="progress-bar h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
      </div>
      
      {/* Custom cursor */}
      <div id="custom-cursor" className="hidden md:block fixed w-16 h-16 rounded-full pointer-events-none z-[9999] custom-cursor"></div>
      
      {/* Hero section with enhanced 3D elements */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-16"
        style={{ scale: heroScale }}
      >
        {/* Background elements */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity: bgOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900"></div>
          
          {/* Grid Pattern Background */}
          <div 
            className="absolute inset-0 opacity-[0.07]" 
            style={{ 
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), 
                                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          
          {/* Radial Gradient Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
            }}
          />
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          {/* Client-side particle effect */}
          <ParticleBackground />
          
          {/* Floating geometric shapes */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating circles */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.3 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="absolute top-[15%] left-[10%] w-16 h-16 rounded-full border-2 border-blue-400/30"
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.2 }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
              className="absolute top-[25%] right-[15%] w-24 h-24 rounded-full border-2 border-indigo-400/20"
            />
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 0.25 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              className="absolute bottom-[20%] left-[20%] w-20 h-20 rounded-full border-2 border-purple-400/30"
            />
            
            {/* Floating squares */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-[40%] right-[25%] w-12 h-12 border-2 border-cyan-400/20"
              style={{ transformOrigin: "center center" }}
            />
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[30%] right-[10%] w-16 h-16 border-2 border-blue-400/20"
              style={{ transformOrigin: "center center" }}
            />
            
            {/* Floating triangles */}
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-[10%] right-[30%]"
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0L40 40H0L20 0Z" fill="rgba(129, 140, 248, 0.1)" stroke="rgba(129, 140, 248, 0.3)" strokeWidth="1" />
              </svg>
            </motion.div>
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[15%] left-[35%]"
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 0L30 30H0L15 0Z" fill="rgba(192, 132, 252, 0.1)" stroke="rgba(192, 132, 252, 0.3)" strokeWidth="1" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
        
        {/* 3D Scene - Will be visible on all screens */}
        <div className="absolute inset-0 w-full h-full z-5" style={{ zIndex: 5 }}>
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          }>
            <ContactThreeDScene />
          </Suspense>
        </div>
        
        {/* Mobile-friendly content overlay */}
        <div className="px-4 py-16 flex flex-col items-center justify-center relative z-10 text-center" style={{ zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl"
          >
            <RevealText className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-200">Get In Touch</h1>
            </RevealText>
            <TypewriterText className="text-lg text-blue-100" delay={500}>
              We&apos;d love to hear from you. Let&apos;s create something amazing together.
            </TypewriterText>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8"
            >
              <a 
                href="#contact-form" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-full shadow-lg transition-all hover:-translate-y-1"
              >
                <span>Contact Us</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-700"></div>
          <div className="absolute top-2/3 right-1/3 w-20 h-20 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          
          {/* Additional SVG decorative elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            <svg className="absolute top-20 right-20 w-40 h-40 text-blue-400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M47.1,-57.8C61.3,-50.6,73.2,-37.8,78.1,-22.5C83,-7.3,80.9,10.4,72.7,24.2C64.4,37.9,50,47.6,35.4,56.2C20.8,64.7,6.2,72,-9.4,74.3C-25,76.6,-41.6,73.9,-53.9,64.4C-66.3,54.9,-74.5,38.5,-77.5,21.2C-80.5,3.9,-78.4,-14.3,-70.8,-29.6C-63.3,-44.9,-50.3,-57.2,-36,-63.3C-21.8,-69.4,-6.5,-69.1,7.7,-68.3C21.9,-67.4,33,-65,47.1,-57.8Z" transform="translate(100 100)" />
            </svg>
            
            <svg className="absolute bottom-20 left-10 w-32 h-32 text-purple-400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M35.6,-59.5C46.6,-53.6,56.3,-44.6,62.8,-33.3C69.3,-22,72.6,-8.4,72.1,5.2C71.7,18.8,67.4,32.5,59.1,43.7C50.7,54.9,38.2,63.6,24.5,70.4C10.7,77.3,-4.3,82.2,-18.2,79.6C-32.1,77.1,-44.8,67.1,-53.2,55C-61.6,42.9,-65.6,28.7,-70.7,13.5C-75.7,-1.7,-81.9,-18,-78.4,-32C-74.9,-46,-61.7,-57.9,-47.1,-62.8C-32.5,-67.8,-16.2,-65.9,-1.4,-63.8C13.4,-61.7,26.8,-59.4,35.6,-59.5Z" transform="translate(100 100)" />
            </svg>
            
            <svg className="absolute top-40 left-10 w-28 h-28 text-indigo-400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M38.5,-65.3C48.4,-58.5,53.9,-44.5,58.8,-31.1C63.7,-17.7,68,-4.9,68.4,8.4C68.7,21.8,65.1,35.6,57.2,47C49.2,58.3,36.9,67.2,23.1,72.7C9.3,78.2,-6,80.4,-19.1,76.5C-32.3,72.7,-43.3,63,-53.3,51.4C-63.4,39.8,-72.6,26.4,-76.5,11.2C-80.4,-4,-79,-21,-71.7,-34.3C-64.3,-47.6,-51.1,-57.2,-37.7,-62.4C-24.3,-67.6,-10.7,-68.3,2.4,-72.1C15.4,-75.8,28.7,-82.6,38.5,-65.3Z" transform="translate(100 100)" />
            </svg>
            
            <svg className="absolute bottom-40 right-20 w-36 h-36 text-cyan-400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M44.9,-69.7C58.2,-62.7,69,-49.7,74.6,-35C80.2,-20.2,80.6,-3.8,76.9,11.2C73.1,26.2,65.2,39.8,54.1,50.3C43,60.7,28.7,68,13.2,72.9C-2.4,77.9,-19.2,80.5,-34.4,76.1C-49.6,71.7,-63.2,60.3,-72.5,45.8C-81.8,31.2,-86.7,13.6,-85.5,-3.5C-84.3,-20.6,-77,-37.1,-65.7,-48.9C-54.4,-60.8,-39.1,-68,-24.1,-73.5C-9,-79,5.6,-82.8,20.7,-80.1C35.8,-77.4,51.4,-69.2,44.9,-69.7Z" transform="translate(100 100)" />
            </svg>
          </motion.div>
          
          {/* Interactive Particles */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            {(() => {
              // Use a self-invoking function to handle the particles
              const [particles, setParticles] = useState<React.ReactNode[]>([]);
              
              useEffect(() => {
                // Create particles only on the client-side
                const newParticles = Array.from({ length: 20 }).map((_, i) => {
                  const width = window.innerWidth;
                  const height = window.innerHeight;
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-white"
                      initial={{
                        x: Math.random() * width,
                        y: Math.random() * height,
                        opacity: Math.random() * 0.5 + 0.3,
                      }}
                      animate={{
                        x: [
                          Math.random() * width,
                          Math.random() * width,
                          Math.random() * width,
                        ],
                        y: [
                          Math.random() * height,
                          Math.random() * height,
                          Math.random() * height,
                        ],
                      }}
                      transition={{
                        duration: 10 + Math.random() * 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  );
                });
                
                setParticles(newParticles);
              }, []);
              
              return particles;
            })()}
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
              <span className="animate-bounce w-1 h-3 bg-blue-500 dark:bg-blue-400 rounded-full mt-2"></span>
            </div>
          </div>
        </motion.div>
      </motion.section>
      
      {/* Information section */}
      <section ref={infoRef} className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Let&apos;s Connect
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Reach out to us through the following channels or fill out the form below to start a conversation.
            </motion.p>
          </div>
          
          {/* Contact info cards */}
          <FloatingInfoCards />
        </div>
      </section>
      
      {/* Form section */}
      <section id="contact-form" ref={formRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800"></div>
          
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <svg className="absolute top-0 left-0 w-full h-auto opacity-[0.03] dark:opacity-[0.02] text-blue-600" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M39.7,-68.6C52.9,-62.8,66.2,-55.4,72.7,-43.8C79.2,-32.2,78.9,-16.1,76.3,-1.6C73.7,13,68.8,25.9,62.4,38.4C55.9,50.8,47.9,62.8,37,71.5C26,80.3,13,85.9,-0.7,87C-14.3,88.1,-28.6,84.8,-39.3,76.3C-50,67.8,-57.1,54.1,-63.8,40.6C-70.5,27.1,-76.9,13.5,-78.1,-0.7C-79.3,-14.9,-75.3,-29.7,-67,-41.2C-58.7,-52.6,-46,-60.5,-33.2,-66.5C-20.3,-72.5,-10.2,-76.7,1.7,-79.6C13.6,-82.5,27.2,-84.2,39.7,-68.6Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Send Us a Message
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </motion.p>
          </div>
          
          <ContactForm />
        </div>
      </section>
      
      {/* Social Media Contact Section */}
      <section className="relative py-16 bg-gray-50 dark:bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white dark:from-gray-900 dark:to-gray-800"></div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <svg className="absolute bottom-0 left-0 w-full h-auto opacity-[0.03] dark:opacity-[0.02] text-purple-600" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M35.2,-47.3C48.4,-35.9,63.8,-29.4,69.3,-18.2C74.8,-7,70.3,9.1,62.4,21.4C54.5,33.7,43.2,42.3,31.2,53.8C19.2,65.3,6.6,79.6,-8.4,84.3C-23.5,88.9,-41,83.7,-55.6,72.7C-70.1,61.7,-81.8,44.8,-87.4,26.1C-93,7.3,-92.5,-13.4,-84.1,-32C-75.6,-50.6,-59.1,-67.1,-41.7,-77.3C-24.3,-87.6,-5.9,-91.6,6.9,-85.5C19.8,-79.3,22,-58.8,35.2,-47.3Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <SocialMediaContact />
        </div>
      </section>
      
      {/* FAQ Section */}
      <ContactFAQ />
      
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
      
      {/* Custom styles */}
      <style jsx global>{`
        /* Particle animations */
        .particle-container div {
          position: absolute;
          border-radius: 50%;
          animation: float linear infinite;
        }
        
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(100px, 100px) rotate(90deg);
          }
          50% {
            transform: translate(0, 200px) rotate(180deg);
          }
          75% {
            transform: translate(-100px, 100px) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
        
        /* Progress bar animations */
        .progress-bar {
          width: 0%;
          transition: width 0.1s;
        }
        
        /* Custom cursor */
        body:has(#custom-cursor) {
          cursor: crosshair;
        }
        
        #custom-cursor {
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
          background-color: rgba(99, 102, 241, 0.5);
          border: 2px solid white;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.2s ease;
        }
        
        /* Section-specific cursor shapes */
        section:nth-of-type(1) #custom-cursor {
          background-color: rgba(79, 70, 229, 0.6) !important;
          border-radius: 50%; /* Circle */
        }
        
        section:nth-of-type(2) #custom-cursor {
          background-color: rgba(6, 182, 212, 0.6) !important;
          border-radius: 0; /* Square */
          transform: translate(-50%, -50%) rotate(45deg) !important;
        }
        
        section:nth-of-type(3) #custom-cursor {
          background-color: rgba(168, 85, 247, 0.6) !important;
          border-radius: 8px; /* Rounded square */
        }
        
        /* Interactive element hover */
        a:hover ~ #custom-cursor,
        button:hover ~ #custom-cursor,
        input:hover ~ #custom-cursor,
        textarea:hover ~ #custom-cursor {
          transform: translate(-50%, -50%) scale(1.5) !important;
          background-color: rgba(255, 255, 255, 0.3) !important;
        }
        
        /* Scroll to top button */
        #scrollToTop:hover {
          transform: translateY(-5px);
        }
      `}</style>
      
      {/* Client-side JavaScript for interactive elements */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Update progress bar on scroll
          window.addEventListener('scroll', () => {
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
          });
          
          // Scroll to top button
          document.getElementById('scrollToTop')?.addEventListener('click', () => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          });
        `
      }} />
    </MainLayout>
  );
} 