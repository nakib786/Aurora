'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ThreeScene from '../animations/ThreeScene';
import Lamp from '../ui/lamp';

const Hero = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const [animeLoaded, setAnimeLoaded] = useState(false);
  
  // Import anime.js only on client side
  useEffect(() => {
    const loadAnime = async () => {
      try {
        await import('animejs');
        setAnimeLoaded(true);
      } catch (error) {
        console.error('Failed to load anime.js:', error);
      }
    };
    
    loadAnime();
  }, []);
  
  // Create particles
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const particleCount = 30;
    const particlesDiv = particlesRef.current;
    
    // Clear existing particles if any
    particlesDiv.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.width = `${Math.random() * 10 + 3}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.7 + 0.3}`;
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particlesDiv.appendChild(particle);
    }
  }, []);
  
  // Create text animation after anime.js is loaded
  useEffect(() => {
    if (!animeLoaded) return;
    
    const animateText = async () => {
      try {
        const animeModule = await import('animejs');
        const anime = animeModule.default;
        
        // Prepare text animation
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && heroTitle.textContent) {
          heroTitle.innerHTML = heroTitle.textContent.replace(
            /\S/g,
            "<span class='letter'>$&</span>"
          );
          
          if (heroTitle.querySelectorAll('.letter').length > 0) {
            // Animate heading
            anime.timeline({ loop: false })
              .add({
                targets: '.hero-title .letter',
                translateY: ["1.1em", 0],
                translateZ: 0,
                duration: 750,
                delay: (el: HTMLElement, i: number) => 50 * i
              });
          }
        }
      } catch (error) {
        console.error('Error in text animation:', error);
      }
    };
    
    animateText();
  }, [animeLoaded]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-900 to-indigo-800 min-h-screen flex flex-col items-center justify-center text-white">
      {/* Animated background particles */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden z-0"
      />
      
      {/* 3D animated logo */}
      <div className="absolute top-10 right-10 w-40 h-40 md:w-60 md:h-60 z-10">
        <ThreeScene />
      </div>
      
      <Lamp 
        className="w-full max-w-7xl mx-auto" 
        size="lg"
        color="from-indigo-500/30 via-purple-500/30 to-cyan-400/30"
        spotlightColor="bg-cyan-400/30"
      >
        <div className="container mx-auto px-4 py-20 z-10 text-center">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Aurora N&N Business Solutions
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-blue-100">
            Illuminating your business path with expert accounting and web development services
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/accounting-taxation" 
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-full transition-all text-lg font-medium">
              Accounting Services
            </Link>
            <Link href="/web-development" 
              className="px-8 py-3 bg-purple-500 hover:bg-purple-600 rounded-full transition-all text-lg font-medium">
              Web Development
            </Link>
          </div>
        </div>
      </Lamp>
      
      <div className="absolute bottom-10 left-0 right-0 text-center z-10">
        <button 
          onClick={() => window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          })}
          className="animate-bounce p-2 bg-white bg-opacity-20 rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Hero; 