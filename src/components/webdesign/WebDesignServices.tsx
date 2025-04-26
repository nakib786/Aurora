'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimeEffects from '../animations/AnimeEffects';
import ThreeScene from '../animations/ThreeScene';

const webDesignServices = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Custom websites designed to showcase your brand and engage your audience.',
    features: ['Responsive Design', 'SEO Optimization', 'Content Management', 'Analytics Integration']
  },
  {
    id: 2,
    title: 'E-commerce Solutions',
    description: 'Feature-rich online stores to help you sell your products globally.',
    features: ['Product Management', 'Secure Payments', 'Inventory Tracking', 'Customer Accounts']
  },
  {
    id: 3,
    title: 'Mobile Applications',
    description: 'Native and cross-platform mobile apps for iOS and Android.',
    features: ['Intuitive UI/UX', 'Cross-platform Development', 'Offline Capabilities', 'Push Notifications']
  },
  {
    id: 4,
    title: 'UI/UX Design',
    description: 'User-centered design to enhance user experience and satisfaction.',
    features: ['User Research', 'Wireframing', 'Prototype Testing', 'Visual Design']
  }
];

const WebDesignServices = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <AnimeEffects animationType="text" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Web Design & Development Services
          </AnimeEffects>
          
          <AnimeEffects animationType="fadeIn" delay={300} className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From concept to launch, we deliver innovative digital solutions that drive results.
          </AnimeEffects>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Modern Web Development</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We leverage the latest technologies and frameworks to create fast, secure, and scalable web applications. Our development process focuses on delivering exceptional user experiences while ensuring your business objectives are met.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {['React', 'Next.js', 'Vue.js', 'Node.js', 'Laravel', 'WordPress', 'Shopify', 'Magento'].map((tech, index) => (
                <div key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{tech}</span>
                </div>
              ))}
            </div>
            
            <div>
              <a href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg">
                Discuss Your Project
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900 dark:to-blue-900 rounded-xl overflow-hidden shadow-xl">
              <ThreeScene />
            </div>
          </motion.div>
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          {webDesignServices.map((service, index) => (
            <AnimeEffects
              key={service.id}
              animationType="slideUp"
              delay={index * 100}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimeEffects>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebDesignServices; 