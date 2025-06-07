'use client';

import React from 'react';
import AnimeWrapper from '../animations/AnimeWrapper';
import AnimeText from '../animations/AnimeText';
import AnimeCounter from '../animations/AnimeCounter';
import AnimeMagneticButton from '../animations/AnimeMagneticButton';

const accountingServices = [
  {
    id: 1,
    title: 'Bookkeeping',
    description: 'Maintain accurate financial records with our comprehensive bookkeeping services.',
    features: ['Daily Transaction Recording', 'Monthly Reconciliation', 'Financial Statements'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/10 to-cyan-500/10'
  },
  {
    id: 2,
    title: 'Tax Planning',
    description: 'Strategic tax planning to minimize your tax liability and maximize your returns.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Financial Reporting',
    description: 'Detailed financial reports to help you make informed business decisions.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Payroll Services',
    description: 'Efficient payroll processing ensuring accurate and timely payments to your employees.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: 5,
    title: 'Business Consultation',
    description: 'Expert business advice to help your company grow and succeed.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
];

const AccountingServices = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <AnimeWrapper animation="slideUp" delay={0}>
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-blue-500/20 text-blue-600 dark:text-blue-400 px-6 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Professional Services
            </div>
          </AnimeWrapper>
          
          <AnimeText 
            animation="reveal"
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            as="h2"
          >
            Our Accounting & Taxation Services
          </AnimeText>
          
          <AnimeWrapper animation="fadeIn" delay={600}>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We provide comprehensive accounting and taxation services to help your business thrive financially. 
              <span className="text-blue-600 dark:text-blue-400 font-semibold"> Trusted by over 1,000+ businesses.</span>
            </p>
          </AnimeWrapper>
          
          {/* Stats Row */}
          <AnimeWrapper animation="slideUp" delay={800}>
            <div className="flex justify-center items-center space-x-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  <AnimeCounter end={1000} duration={2000} suffix="+" />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Happy Clients</div>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  <AnimeCounter end={98} duration={2000} suffix="%" />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Success Rate</div>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  <AnimeCounter end={15} duration={2000} suffix="+" />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Years Experience</div>
              </div>
            </div>
          </AnimeWrapper>
        </div>
        
        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {accountingServices.map((service, index) => (
            <AnimeWrapper
              key={service.id}
              animation="slideUp"
              delay={index * 150}
            >
              <div className="group relative">
                {/* Service Card */}
                <div className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden`}>
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient || 'from-blue-500/10 to-purple-500/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.gradient || 'from-blue-500 to-purple-500'} rounded-xl text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    {service.features && (
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {/* Learn More Button */}
                    <div className="mt-6">
                      <button className={`w-full px-4 py-2 bg-gradient-to-r ${service.gradient || 'from-blue-500 to-purple-500'} text-white rounded-lg text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300`}>
                        Learn More
                      </button>
                    </div>
                  </div>
                  
                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient || 'from-blue-500 to-purple-500'} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
                </div>
              </div>
            </AnimeWrapper>
          ))}
        </div>
        
        {/* Enhanced CTA Section */}
        <AnimeWrapper animation="fadeIn" delay={1000}>
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-grid-pattern"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Financial Management?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Get a free consultation with our certified accounting professionals and discover how we can help your business grow.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <AnimeMagneticButton
                  href="/contact"
                  className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  <span className="flex items-center">
                    Get Free Consultation
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </AnimeMagneticButton>
                
                <AnimeMagneticButton
                  href="tel:+1234567890"
                  className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <span className="flex items-center">
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now: (123) 456-7890
                  </span>
                </AnimeMagneticButton>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-blue-100 mb-4">Trusted by leading businesses</p>
                <div className="flex justify-center items-center space-x-8 opacity-60">
                  <div className="text-2xl font-bold">CPA</div>
                  <div className="text-2xl font-bold">CRA</div>
                  <div className="text-2xl font-bold">CERTIFIED</div>
                </div>
              </div>
            </div>
          </div>
        </AnimeWrapper>
      </div>
    </section>
  );
};

export default AccountingServices; 