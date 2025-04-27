'use client';

import React from 'react';
import { motion } from '../animations/MotionComponents';

interface Location {
  city: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  gradientFrom: string;
  gradientTo: string;
}

export default function ContactLocation() {
  const locations: Location[] = [
    {
      city: 'San Francisco',
      address: '123 Tech Street, San Francisco, CA 94103',
      phone: '+1 (415) 555-0123',
      email: 'sf@aurora.com',
      image: '/images/sf-office.jpg', // Placeholder image path
      gradientFrom: 'from-blue-600',
      gradientTo: 'to-indigo-700'
    },
    {
      city: 'New York',
      address: '456 Innovation Ave, New York, NY 10001',
      phone: '+1 (212) 555-0124',
      email: 'nyc@aurora.com',
      image: '/images/nyc-office.jpg', // Placeholder image path
      gradientFrom: 'from-purple-600',
      gradientTo: 'to-pink-700'
    },
  ];

  return (
    <div className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
      
      {/* Animated gradient blob */}
      <motion.div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
        animate={{ 
          x: [0, 40, 0], 
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
      ></motion.div>
      <motion.div 
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl"
        animate={{ 
          x: [0, -40, 0], 
          y: [0, -30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
      ></motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium mb-4 shadow-lg shadow-blue-500/20">
            Visit Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
              Our Locations
            </span>
            <motion.div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 64, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            ></motion.div>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Visit our offices to meet our team and see how we can help you achieve your goals.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group"
            >
              {/* Location card with gradient border */}
              <div className="relative p-[1px] rounded-xl overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl">
                {/* Card content with glassmorphism */}
                <div className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden">
                  <div className="h-56 overflow-hidden relative">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${location.gradientFrom} ${location.gradientTo} opacity-80 mix-blend-multiply z-10`}></div>
                    
                    <motion.div
                      className="absolute inset-0 bg-center bg-cover z-0"
                      style={{
                        backgroundImage: `url(${location.image})`,
                        // Fallback gradient in case image doesn't load
                        backgroundColor: 'rgba(31, 41, 55, 0.8)',
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* City name with 3D effect */}
                    <div className="absolute bottom-0 left-0 p-6 z-20">
                      <motion.h3 
                        className="text-3xl font-bold text-white mb-1 flex items-center"
                        whileHover={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                      >
                        {location.city}
                        <motion.div 
                          className="ml-2 w-2 h-2 rounded-full bg-white"
                          animate={{ 
                            opacity: [1, 0.5, 1],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.h3>
                    </div>
                    
                    {/* Animated geometric shapes */}
                    <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
                      <motion.div 
                        className="absolute top-5 right-5 w-16 h-16 border-2 border-white/30 rounded-full"
                        animate={{ 
                          rotate: 360,
                          opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{ 
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      <motion.div 
                        className="absolute bottom-10 left-10 w-20 h-20 border-2 border-white/30" 
                        style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
                        animate={{ 
                          rotate: -360,
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ 
                          duration: 25,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-900/50 backdrop-blur-sm border-t border-white/10">
                    <div className="space-y-4">
                      <motion.div 
                        className="flex items-start"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white mr-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="text-gray-200">{location.address}</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-start"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white mr-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <span className="text-gray-200">{location.phone}</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-start"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white mr-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-gray-200">{location.email}</span>
                      </motion.div>
                    </div>
                    
                    <div className="mt-6">
                      <motion.button 
                        className="group inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 px-6 rounded-full font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                        whileHover={{ y: -3 }}
                        whileTap={{ y: 0 }}
                      >
                        Get directions
                        <svg className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 max-w-2xl mx-auto">
            Visit us at any of our locations to learn more about Aurora and how we can help you achieve your goals. Our team is always ready to welcome you and discuss your needs.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 