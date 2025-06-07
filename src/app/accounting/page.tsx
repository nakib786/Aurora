import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AccountingServices from '@/components/accounting/AccountingServices';

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
      {/* Enhanced Animated Hero Section */}
      <div className="relative overflow-hidden py-20 md:py-24 lg:py-32 min-h-screen flex items-center">
        {/* Advanced Background with Interactive Elements */}
        <div className="absolute inset-0 -z-10">
          {/* Dynamic gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 animate-gradient"></div>
          
          {/* Interactive grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          
                     {/* Floating animated shapes */}
           <AnimeShapes className="absolute inset-0">
             <Shape type="circle" color="bg-blue-500/10" size="w-32 h-32" className="absolute top-20 left-20" />
             <Shape type="triangle" color="bg-red-500/10" size="w-24 h-24" className="absolute bottom-32 right-32" />
             <Shape type="square" color="bg-purple-500/10" size="w-28 h-28" className="absolute top-1/2 right-20" />
           </AnimeShapes>
           
           {/* Animated particles */}
           <AnimeParticles 
             count={50} 
             className="absolute inset-0"
             colors={["rgba(59, 130, 246, 0.3)"]}
           />
          
          {/* Enhanced glowing orbs with animation */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-red-600/20 to-pink-600/20 blur-[80px] animate-pulse-slower"></div>
          
                     {/* Interactive Canadian maple leaf elements */}
           <div className="absolute inset-0 opacity-30">
             <AnimeWrapper animation="fadeIn" delay={0}>
               <svg className="absolute top-20 left-20 w-40 h-40 text-red-600 transform rotate-12" viewBox="0 0 512 512" fill="currentColor">
                 <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
               </svg>
             </AnimeWrapper>
             
             <AnimeWrapper animation="fadeIn" delay={500}>
               <svg className="absolute top-1/4 right-1/4 w-56 h-56 text-red-600 transform -rotate-6" viewBox="0 0 512 512" fill="currentColor" opacity="0.4">
                 <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
               </svg>
             </AnimeWrapper>
             
             <AnimeWrapper animation="fadeIn" delay={1000}>
               <svg className="absolute bottom-20 left-1/3 w-32 h-32 text-red-600 transform rotate-45" viewBox="0 0 512 512" fill="currentColor" opacity="0.6">
                 <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
               </svg>
             </AnimeWrapper>
           </div>
        </div>
        
        {/* Enhanced Content Container */}
        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                         {/* Left column - Enhanced Text content */}
             <div className="lg:col-span-6 space-y-8">
               <AnimeWrapper animation="slideLeft" delay={200}>
                 <div className="inline-flex items-center bg-gradient-to-r from-red-600/20 to-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-300 px-6 py-3 rounded-full text-sm font-medium mb-4 hover:scale-105 transition-transform duration-300">
                   <span className="mr-2 text-lg">🍁</span>
                   <span>Canadian Tax & Accounting Experts</span>
                   <div className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                 </div>
               </AnimeWrapper>
               
               <AnimeWrapper animation="slideLeft" delay={500}>
                 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                   Professional Accounting & Taxation Solutions
                 </h1>
               </AnimeWrapper>
               
               <AnimeWrapper animation="fadeIn" delay={1500}>
                 <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                   Maximize your tax refunds with our expert Canadian financial solutions. 
                   <span className="text-blue-400 font-semibold"> Professional, reliable, and results-driven.</span>
                 </p>
               </AnimeWrapper>
               
               {/* Enhanced Statistics */}
               <AnimeWrapper animation="slideUp" delay={2000}>
                 <div className="grid grid-cols-2 gap-6 py-6">
                   <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                     <div className="text-3xl font-bold text-blue-400 mb-1">
                       <AnimeCounter end={5280} duration={2000} suffix="+" />
                     </div>
                     <div className="text-sm text-gray-400">Tax Returns Filed</div>
                   </div>
                   <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                     <div className="text-3xl font-bold text-green-400 mb-1">
                       $<AnimeCounter end={2450} duration={2000} />
                     </div>
                     <div className="text-sm text-gray-400">Avg. Refund (CAD)</div>
                   </div>
                 </div>
               </AnimeWrapper>
               
               {/* Enhanced Action Buttons */}
               <AnimeWrapper animation="slideUp" delay={2500}>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                  <AnimeMagneticButton
                    as="a"
                    href="/contact"
                    className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <span className="flex items-center">
                      Get Free Consultation
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </AnimeMagneticButton>
                  
                  <AnimeMagneticButton
                    as="a"
                    href="#services"
                    className="bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10 font-semibold py-4 px-8 rounded-xl transition-all duration-300 backdrop-blur-sm"
                  >
                    <span className="flex items-center">
                      View Services
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </AnimeMagneticButton>
                </div>
              </AnimeWrapper>
            </div>
            
                         {/* Right column - Enhanced Interactive Dashboard */}
             <div className="lg:col-span-6 relative">
               <AnimeWrapper animation="slideRight" delay={1000}>
                <div className="relative mx-auto max-w-lg">
                  {/* Main Interactive Dashboard Card */}
                  <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 transform hover:scale-105 transition-all duration-500 card-3d">
                    {/* Header with Canadian Flag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-6 bg-gradient-to-r from-red-600 via-white to-red-600 rounded-sm flex items-center justify-center">
                          <svg className="w-4 h-4 text-red-600" viewBox="0 0 512 512" fill="currentColor">
                            <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
                          </svg>
                        </div>
                        <span className="text-white font-semibold">Tax Dashboard</span>
                      </div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Interactive Tax Calculator Display */}
                    <div className="bg-black/40 rounded-xl p-6 mb-6 border border-blue-500/30">
                      <div className="text-center mb-4">
                        <div className="text-sm text-gray-400 mb-2">Estimated Tax Refund</div>
                        <div className="text-4xl font-bold text-green-400 calculator-display">
                          $<AnimeCounter end={3247} duration={3000} />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">CAD</div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full animate-pulse" style={{width: '78%'}}></div>
                      </div>
                      <div className="text-xs text-gray-400 text-center">Processing: 78% Complete</div>
                    </div>
                    
                    {/* Service Status Cards */}
                    <div className="space-y-4">
                      <div className="feature-card bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-500/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="icon-container">
                              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-white font-medium">Tax Return Filed</div>
                              <div className="text-xs text-gray-400">Status: Approved</div>
                            </div>
                          </div>
                          <div className="text-green-400 text-sm font-semibold">✓</div>
                        </div>
                      </div>
                      
                      <div className="feature-card bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-lg p-4 border border-red-500/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="icon-container">
                              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-white font-medium">Bookkeeping</div>
                              <div className="text-xs text-gray-400">Monthly Service</div>
                            </div>
                          </div>
                          <div className="text-yellow-400 text-sm font-semibold">⏳</div>
                        </div>
                      </div>
                      
                      <div className="feature-card bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-lg p-4 border border-green-500/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="icon-container">
                              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-white font-medium">Next Appointment</div>
                              <div className="text-xs text-gray-400">Available Slots</div>
                            </div>
                          </div>
                          <div className="text-blue-400 text-sm font-semibold">📅</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Action Button */}
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <a href="/contact" className="block w-full cta-button bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-center">
                        Schedule Free Consultation
                      </a>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce-slow opacity-80"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-500 rounded-full animate-pulse opacity-60"></div>
                </div>
              </AnimeWrapper>
            </div>
          </div>
        </div>
        
                 {/* Enhanced Scroll Indicator */}
         <AnimeWrapper animation="fadeIn" delay={3000}>
           <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
             <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-300">
               <span className="text-sm text-gray-400 mb-3 animate-pulse">Explore Our Services</span>
               <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center relative overflow-hidden">
                 <span className="animate-bounce w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"></span>
               </div>
             </div>
           </div>
         </AnimeWrapper>
      </div>
      
      {/* Enhanced Services Section */}
      <div id="services" className="scroll-mt-24">
        <AccountingServices />
      </div>
      
      {/* New Interactive Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimeText 
            text="Why Choose Our Accounting Services?"
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
            animationType="slideInUp"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <AnimeWrapper animationType="slideInLeft" delay={200}>
              <div className="feature-card bg-white/5 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/10 transition-all duration-500">
                <div className="icon-container w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Fast Processing</h3>
                <p className="text-gray-300">Get your tax returns processed in record time with our streamlined digital workflow.</p>
              </div>
            </AnimeWrapper>
            
            {/* Feature 2 */}
            <AnimeWrapper animationType="slideInUp" delay={400}>
              <div className="feature-card bg-white/5 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/10 transition-all duration-500">
                <div className="icon-container w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">100% Secure</h3>
                <p className="text-gray-300">Your financial data is protected with bank-level encryption and security protocols.</p>
              </div>
            </AnimeWrapper>
            
            {/* Feature 3 */}
            <AnimeWrapper animationType="slideInRight" delay={600}>
              <div className="feature-card bg-white/5 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/10 transition-all duration-500">
                <div className="icon-container w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Expert Support</h3>
                <p className="text-gray-300">Get personalized support from certified Canadian tax professionals.</p>
              </div>
            </AnimeWrapper>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <AnimeParticles count={30} color="rgba(255, 255, 255, 0.3)" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimeText 
            text="Ready to Maximize Your Tax Refund?"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            animationType="typewriter"
          />
          
          <AnimeWrapper animationType="fadeIn" delay={1000}>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who trust us with their accounting and taxation needs.
            </p>
          </AnimeWrapper>
          
          <AnimeWrapper animationType="slideInUp" delay={1500}>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <AnimeMagneticButton
                as="a"
                href="/contact"
                className="bg-white text-red-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                Get Started Today
              </AnimeMagneticButton>
              
              <AnimeMagneticButton
                as="a"
                href="tel:+1234567890"
                className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Call Now: (123) 456-7890
              </AnimeMagneticButton>
            </div>
          </AnimeWrapper>
        </div>
      </section>
    </MainLayout>
  );
} 