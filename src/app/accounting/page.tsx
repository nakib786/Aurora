import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AccountingServices from '@/components/accounting/AccountingServices';
import { ParallaxLeft, ParallaxRight, ParallaxUp } from '@/components/animations/ParallaxScroller';
import { RevealText, TypewriterText, CountUp } from '@/components/animations/AdvancedAnimations';

// Import our anime.js components
import AnimeWrapper from '@/components/animations/AnimeWrapper';
import AnimeText from '@/components/animations/AnimeText';
import AnimeCounter from '@/components/animations/AnimeCounter';
import AnimeParticles from '@/components/animations/AnimeParticles';
import AnimeShapes, { Shape } from '@/components/animations/AnimeShapes';
import AnimeMagneticButton from '@/components/animations/AnimeMagneticButton';

// CSS for accounting-specific animations
import './accounting.css';

export default function AccountingPage() {
  return (
    <MainLayout>
      {/* Custom Animated Hero for Accounting */}
      <div className="relative overflow-hidden py-20 md:py-24 lg:py-32 min-h-screen flex items-center">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          {/* Darker gradient background like in the image */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-blue-900 to-indigo-800"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          {/* Animated glowing orbs - RESTORED TO ORIGINAL SIZE */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 dark:bg-blue-500/10 blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-red-600/10 dark:bg-red-500/10 blur-[80px] animate-pulse-slower"></div>
          
          {/* Canadian maple leaf elements in background - RESTORED TO ORIGINAL SIZE */}
          <div className="absolute inset-0 opacity-20">
            <svg className="absolute top-20 left-20 w-40 h-40 text-red-600 transform rotate-12 maple-leaf" viewBox="0 0 512 512" fill="currentColor">
              <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
            </svg>
            <svg className="absolute top-1/4 right-1/4 w-56 h-56 text-red-600 transform -rotate-6 maple-leaf-slow" viewBox="0 0 512 512" fill="currentColor" opacity="0.3">
              <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
            </svg>
            <svg className="absolute bottom-20 left-1/3 w-32 h-32 text-red-600 transform rotate-45 maple-leaf" viewBox="0 0 512 512" fill="currentColor" opacity="0.4">
              <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
            </svg>
          </div>
          
          {/* Canadian-themed glowing orbs - RESTORED TO ORIGINAL SIZE */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-red-600/20 blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-blue-600/20 blur-[80px] animate-pulse-slower"></div>
        </div>
        
        {/* Content container */}
        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left column - Text content */}
            <div className="lg:col-span-5 space-y-8">
              <ParallaxRight speed={0.2} className="mb-3">
                <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-2">
                  <span className="mr-2">🍁</span>Canadian Tax & Accounting
                </div>
              </ParallaxRight>
              
              <RevealText className="relative text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                <h1>Accounting & <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-300">Taxation</span></h1>
              </RevealText>
              
              <TypewriterText className="text-xl text-gray-300 max-w-xl" delay={1000}>
                Expert Canadian financial solutions to maximize your tax refunds
              </TypewriterText>
              
              <ParallaxUp speed={0.3} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <a 
                  href="/contact" 
                  className="relative overflow-hidden btn-primary inline-block bg-gradient-to-r from-red-700 to-red-500 hover:from-red-800 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg transform hover:-translate-y-1"
                >
                  Get Started
                  <span className="absolute inset-0 w-full h-full bg-white opacity-0 hover:opacity-10 transition-opacity"></span>
                </a>
                <a 
                  href="#services" 
                  className="relative overflow-hidden btn-secondary inline-block bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10 font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md transform hover:-translate-y-1"
                >
                  View Services
                  <span className="absolute inset-0 w-full h-full bg-blue-400 opacity-0 hover:opacity-5 transition-opacity"></span>
                </a>
              </ParallaxUp>
            </div>
            
            {/* Right column - Visual elements */}
            <div className="lg:col-span-7 relative">
              {/* Main File Document Card - REDUCED SIZE */}
              <ParallaxLeft speed={0.15} className="relative z-10 mx-auto lg:mr-0 lg:ml-auto max-w-md">
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-red-800/40 shadow-2xl p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-500 scale-90">
                  {/* Red maple leaf decoration in background */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                    <svg className="w-56 h-56 text-red-600" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
                    </svg>
                  </div>
                  
                  <div className="flex items-center justify-center mb-5 relative">
                    {/* Document icon - REDUCED SIZE */}
                    <div className="relative">
                      <div className="text-blue-400 mb-2 flex justify-center">
                        <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M8 7H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M8 11H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M8 15H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                      {/* Maple leaf tag on the document */}
                      <div className="absolute -top-4 -right-4">
                        <div className="relative">
                          <svg className="w-10 h-10 text-red-600 animate-pulse-slow" viewBox="0 0 512 512" fill="currentColor">
                            <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                            CAD
                          </div>
                        </div>
                      </div>
                      
                      {/* Percentage badge */}
                      <div className="absolute -bottom-3 -left-3 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold animate-bounce-slow">
                        %
                      </div>
                    </div>
                  </div>
                  
                  {/* Tax Returns Card - Similar to the image */}
                  <div className="bg-gray-800/80 rounded-lg p-3 mb-3 border-l-4 border-red-500">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-red-400 font-semibold">Tax Returns Processed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white">
                        <AnimeCounter
                          end={5280}
                          duration={2500}
                          decimals={0}
                          suffix="+"
                          easing="easeOutExpo"
                        />
                      </div>
                      <div className="text-sm text-gray-400">
                        Since 2018
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-red-400">
                      Average refund: <span className="font-semibold">$2,450 CAD</span>
                    </div>
                  </div>
                  
                  {/* Free Consultation Card - Similar to the image */}
                  <div className="bg-gray-800/80 rounded-lg p-3 border-l-4 border-blue-500">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span className="text-blue-400 font-semibold">Free Consultation</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      Contact our team for free advice on your tax returns.
                    </p>
                    <a 
                      href="/contact" 
                      className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300"
                    >
                      Schedule a call
                      <svg className="h-4 w-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </ParallaxLeft>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
              <span className="animate-bounce w-1 h-3 bg-gray-400 rounded-full mt-2"></span>
            </div>
          </div>
        </div>
      </div>
      
      <div id="services" className="scroll-mt-24">
        <AccountingServices />
      </div>
      
      {/* Core Offerings Section - Enhanced with new animations */}
      <section className="relative py-20 bg-white dark:bg-gray-800 overflow-hidden">
        {/* Background animations */}
        <AnimeParticles count={70} opacity={0.2} />
        <AnimeShapes className="z-0">
          <Shape type="triangle" color="bg-purple-500/20" size="w-24 h-24" delay={0} />
          <Shape type="circle" color="bg-fuchsia-500/20" size="w-40 h-40" delay={300} />
          <Shape type="circle" color="bg-indigo-500/20" size="w-24 h-24" delay={600} />
          <Shape type="square" color="bg-blue-500/20" size="w-16 h-16" delay={900} />
          <Shape type="square" color="bg-fuchsia-500/20" size="w-40 h-40" delay={1200} />
          <Shape type="square" color="bg-violet-500/20" size="w-40 h-40" delay={1500} />
        </AnimeShapes>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimeText 
              animation="letterScale" 
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center"
              as="h2"
              letterDelay={40}
              easing="easeOutElastic(1, .8)"
            >
              Our Core Accounting Services
            </AnimeText>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Tax Planning & Preparation",
                  description: "Strategic tax planning and efficient preparation services for individuals and businesses.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 service-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                    </svg>
                  )
                },
                {
                  title: "Financial Reporting",
                  description: "Accurate and timely financial statements to help you make informed business decisions.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 service-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )
                },
                {
                  title: "Business Advisory",
                  description: "Expert guidance to optimize operations, improve profitability, and achieve long-term goals.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 service-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )
                }
              ].map((service, index) => (
                <AnimeWrapper
                  key={index}
                  animation="slideUp"
                  delay={index * 150}
                  duration={1000}
                  easing="easeOutElastic(1, .5)"
                >
                  <div className="service-card card-3d rounded-xl p-8">
                    <div className="text-blue-600 dark:text-blue-400 mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                  </div>
                </AnimeWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section - Enhanced with modern animations */}
      <section className="relative py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <AnimeShapes className="z-0 opacity-40">
          <Shape type="circle" color="bg-fuchsia-500/20" size="w-40 h-40" delay={0} />
          <Shape type="blob" color="bg-violet-500/20" size="w-40 h-40" delay={300} />
          <Shape type="triangle" color="bg-violet-500/20" size="w-24 h-24" delay={600} />
          <Shape type="square" color="bg-violet-500/20" size="w-32 h-32" delay={900} />
          <Shape type="square" color="bg-purple-500/20" size="w-32 h-32" delay={1200} />
          <Shape type="square" color="bg-fuchsia-500/20" size="w-24 h-24" delay={1500} />
          <Shape type="blob" color="bg-fuchsia-500/20" size="w-24 h-24" delay={1800} />
          <Shape type="triangle" color="bg-indigo-500/20" size="w-40 h-40" delay={2100} />
        </AnimeShapes>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimeText 
              animation="reveal" 
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center"
              as="h2"
              easing="easeOutQuart"
            >
              Why Choose Our Accounting Services
            </AnimeText>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Certified Expertise",
                  description: "Our team of certified accountants brings years of experience across various industries.",
                  icon: "🏆",
                  stat: 25,
                  suffix: "+"
                },
                {
                  title: "Personalized Approach",
                  description: "We develop tailored solutions that align with your specific business needs and goals.",
                  icon: "🎯",
                  stat: 89,
                  suffix: "%"
                },
                {
                  title: "Timely Service",
                  description: "We deliver accurate financial information when you need it, meeting all deadlines.",
                  icon: "⏱️",
                  stat: 100,
                  suffix: "%"
                },
                {
                  title: "Technology-Driven",
                  description: "Using advanced accounting software to ensure efficiency and accuracy in all our services.",
                  icon: "💻",
                  stat: 50,
                  suffix: "x"
                }
              ].map((feature, index) => (
                <AnimeWrapper
                  key={index}
                  animation="slideLeft"
                  delay={index * 150}
                  duration={1000}
                  easing="easeOutQuint"
                >
                  <div className="feature-card flex items-start p-6 rounded-xl shadow-lg backdrop-blur-sm">
                    <div className="icon-container text-3xl mr-4 p-2 rounded-full">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">{feature.description}</p>
                      
                      {/* Add counter for statistics */}
                      <div className="mt-3 text-blue-600 dark:text-blue-400 font-bold">
                        <AnimeCounter
                          end={feature.stat}
                          duration={2500}
                          delay={index * 200 + 500}
                          decimals={0}
                          suffix={feature.suffix}
                          easing="easeOutExpo"
                          className="text-lg"
                        />
                      </div>
                    </div>
                  </div>
                </AnimeWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Enhanced with magnetic button and background effects */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 animate-gradient"></div>
        <AnimeParticles count={100} colors={['#ffffff', '#f0f0ff']} opacity={0.1} />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <AnimeWrapper animation="fadeIn" duration={1200}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Financial Management?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
              Contact us today to schedule a consultation with our accounting experts.
            </p>
            
            <div className="flex justify-center">
              <AnimeMagneticButton 
                as="a" 
                href="/contact"
                className="cta-button px-10 py-4 rounded-lg text-white font-bold text-lg"
                strength={0.5}
              >
                Get Started
              </AnimeMagneticButton>
            </div>
          </AnimeWrapper>
        </div>
      </section>
    </MainLayout>
  );
} 