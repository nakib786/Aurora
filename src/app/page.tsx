import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AccountingHero from '@/components/layout/AccountingHero';
import VerticalScrollSection from '@/components/layout/VerticalScrollSection';
import HorizontalScrollSection from '@/components/layout/HorizontalScrollSection';

export default function Home() {
  return (
    <MainLayout>
      <AccountingHero />
      <HorizontalScrollSection />
      <VerticalScrollSection />
      
      {/* Modern CTA Section */}
      <div className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
        {/* Background with gradient and animated elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 sm:-top-40 -left-20 sm:-left-40 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-20 sm:-right-40 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute -bottom-20 sm:-bottom-40 left-1/3 w-36 h-36 sm:w-54 sm:h-54 md:w-72 md:h-72 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 sm:mb-8">
            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium text-white/90">Ready to Get Started?</span>
          </div>
          
          {/* Main heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-6 sm:mb-8">
            <span className="block text-white mb-2">Transform Your</span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Business Today
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
            Partner with <span className="font-semibold text-white">Aurora N&N</span> for expert accounting and innovative web solutions that drive 
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-semibold"> growth and success</span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
            <a
              href="/contact"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-3 sm:py-4 px-8 sm:px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 w-full sm:w-auto text-center"
            >
              <span className="relative z-10">Contact Us Today</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </a>
            
            <a
              href="/projects"
              className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-3 sm:py-4 px-8 sm:px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl w-full sm:w-auto text-center"
            >
              <span>View Our Work</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </a>
          </div>
          
          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4">
            <div className="flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Expert Team</h3>
              <p className="text-blue-200 text-xs sm:text-sm text-center">Certified professionals with years of experience</p>
            </div>
            
            <div className="flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Fast Delivery</h3>
              <p className="text-blue-200 text-xs sm:text-sm text-center">Quick turnaround without compromising quality</p>
            </div>
            
            <div className="flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-blue-200 text-xs sm:text-sm text-center">Always here when you need us most</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
