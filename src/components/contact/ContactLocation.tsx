'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ContactLocation() {
  const locations = [
    {
      city: 'San Francisco',
      address: '123 Tech Street, San Francisco, CA 94103',
      phone: '+1 (415) 555-0123',
      email: 'sf@aurora.com',
      image: '/images/sf-office.jpg', // Placeholder image path
    },
    {
      city: 'New York',
      address: '456 Innovation Ave, New York, NY 10001',
      phone: '+1 (212) 555-0124',
      email: 'nyc@aurora.com',
      image: '/images/nyc-office.jpg', // Placeholder image path
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-white text-center mb-12">
        Our Locations<span className="text-blue-500">.</span>
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {locations.map((location, index) => (
          <motion.div
            key={location.city}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700"
          >
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-blue-900/30 z-10" />
              <div
                className="absolute inset-0 bg-center bg-cover z-0"
                style={{
                  backgroundImage: `url(${location.image})`,
                  // Fallback gradient in case image doesn't load
                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                }}
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-1">{location.city}</h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="ml-3 text-gray-300">{location.address}</span>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="ml-3 text-gray-300">{location.phone}</span>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="ml-3 text-gray-300">{location.email}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="inline-flex items-center text-blue-400 font-medium hover:text-blue-300 transition-colors">
                  Get directions
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-gray-400 max-w-2xl mx-auto">
          Visit us at any of our locations to learn more about Aurora and how we can help you achieve your goals. Our team is always ready to welcome you.
        </p>
      </div>
    </div>
  );
} 