'use client';

import React, { useState, useEffect, Suspense } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypewriterText, RevealText } from '@/components/animations/AdvancedAnimations';
import ContactThreeDScene from '@/components/contact/ContactThreeDScene';
import ContactForm from '@/components/contact/ContactForm';
import FloatingInfoCards from '@/components/contact/FloatingInfoCards';
import SocialMediaContact from '@/components/contact/SocialMediaContact';
import { ContactJsonLd } from '@/components/contact/ContactSEO';
import ParticleBackground from '@/components/contact/ParticleBackground';

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
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          {/* Client-side particle effect */}
          <ParticleBackground />
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
        </div>
        
        {/* Floating indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex space-x-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="text-center"
          >
            <div className="w-12 h-12 mx-auto bg-indigo-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-indigo-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="block mt-2 text-sm text-indigo-200">Email Us</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            className="text-center"
          >
            <div className="w-12 h-12 mx-auto bg-blue-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="block mt-2 text-sm text-blue-200">Call Us</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.5, delay: 2.4 }}
            className="text-center"
          >
            <div className="w-12 h-12 mx-auto bg-purple-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-purple-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="block mt-2 text-sm text-purple-200">Visit Us</span>
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
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Find answers to common questions about our services and support.
            </motion.p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What's the best way to contact Aurora for urgent support?",
                answer: "For urgent support, please call our customer service line at +1 (234) 567-890. For less time-sensitive inquiries, you can use the contact form or email us at info@aurora-nn.com."
              },
              {
                question: "How quickly can I expect a response after submitting the contact form?",
                answer: "We typically respond to all inquiries within 24-48 hours during business days. For urgent matters, we recommend calling us directly."
              },
              {
                question: "Do you offer international services?",
                answer: "Yes, we provide services to clients worldwide. Please specify your location and requirements in your message, and our international team will assist you."
              },
              {
                question: "Can I schedule a consultation before committing to your services?",
                answer: "Absolutely! We offer complimentary initial consultations to discuss your needs and how we can help. Please use the contact form or call us to schedule a consultation."
              },
              {
                question: "Are your services available for individuals or only businesses?",
                answer: "We provide services to both individuals and businesses of all sizes. Our solutions are customized to meet the specific needs of each client."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Still have questions? We're here to help!
            </p>
            <a
              href="#contact-form"
              className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              <span>Contact Us</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
      
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