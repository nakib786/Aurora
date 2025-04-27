'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const services: Service[] = [
  {
    title: 'Modern Web Development',
    description: 'Create responsive, fast, and visually stunning websites with the latest technologies.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    color: 'blue'
  },
  {
    title: 'Financial Excellence',
    description: 'Expert accounting services that ensure your finances are managed with precision and compliance.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
    color: 'emerald'
  },
  {
    title: 'Strategic Tax Planning',
    description: 'Minimize tax liabilities and maximize savings with our strategic tax planning services.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
    color: 'amber'
  },
  {
    title: 'E-commerce Solutions',
    description: 'Build powerful online stores with secure payment processing and intuitive user experiences.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
    ),
    color: 'purple'
  },
  {
    title: 'Custom Application Development',
    description: 'Tailor-made applications built with scalability and performance in mind to meet your unique needs.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    color: 'indigo'
  },
  {
    title: 'Financial Reporting',
    description: 'Comprehensive financial reports and dashboards that provide actionable insights for your business.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
    color: 'rose'
  }
];

export default function VerticalScrollSection() {
  return (
    <div className="relative py-24 bg-gradient-to-b from-indigo-50 via-white to-rose-50 dark:from-indigo-950 dark:via-gray-900 dark:to-rose-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-60 dark:opacity-20 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-emerald-300 dark:bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Additional colorful elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-yellow-300 dark:bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="inline-block text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 mb-4 relative">
            Our Services
            <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive business solutions tailored to your specific needs
          </p>
        </motion.div>
        
        <div className="space-y-40 md:space-y-52 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <a 
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-medium py-3.5 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>Get Started</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Create scroll animation values
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"] 
  });
  
  // Motion values for parallax effect
  const yUp = useTransform(
    scrollYProgress, 
    [0, 1],
    [50, -50]
  );
  
  const yDown = useTransform(
    scrollYProgress, 
    [0, 1],
    [-50, 50]
  );
  
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.9, 1], 
    [0, 1, 1, 0]
  );
  
  const colorMap = {
    blue: 'from-blue-500 to-cyan-400 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shadow-blue-500/20 dark:shadow-blue-500/10',
    emerald: 'from-emerald-500 to-green-400 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 shadow-emerald-500/20 dark:shadow-emerald-500/10',
    amber: 'from-amber-500 to-yellow-400 bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 shadow-amber-500/20 dark:shadow-amber-500/10',
    purple: 'from-purple-500 to-fuchsia-400 bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 shadow-purple-500/20 dark:shadow-purple-500/10',
    indigo: 'from-indigo-500 to-blue-400 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 shadow-indigo-500/20 dark:shadow-indigo-500/10',
    rose: 'from-rose-500 to-pink-400 bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 shadow-rose-500/20 dark:shadow-rose-500/10',
  };
  
  const bgPattern = index % 2 === 0 ? 
    'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 5%, transparent 5.1%, transparent 100%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 10%, transparent 10.1%, transparent 100%)' : 
    'radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 5%, transparent 5.1%, transparent 100%), radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 10%, transparent 10.1%, transparent 100%)';
  
  return (
    <div ref={cardRef}>
      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
      >
        <motion.div 
          style={{ y: index % 2 === 0 ? yUp : yDown }}
          className="w-full md:w-1/2"
        >
          <div className={`p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 backdrop-blur-sm backdrop-filter group transition-all duration-500 hover:shadow-2xl hover:-translate-y-1`}>
            <div className={`inline-flex p-4 rounded-xl mb-6 ${colorMap[service.color as keyof typeof colorMap]}`}>
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r mb-4 transition-all duration-300 group-hover:scale-105 inline-block"
              style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
            >
              {service.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {service.description}
            </p>
            
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
              <a href="/contact" className={`inline-flex items-center text-sm font-medium ${colorMap[service.color as keyof typeof colorMap].split(' ')[3]} group-hover:underline`}>
                <span>Learn more</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          style={{ y: index % 2 === 0 ? yDown : yUp }}
          className="w-full md:w-1/2"
        >
          <div className={`h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-xl ${index % 2 === 0 ? 'transform md:rotate-2' : 'transform md:-rotate-2'}`}>
            <div className={`w-full h-full bg-gradient-to-br ${colorMap[service.color as keyof typeof colorMap].split(' ')[0]} ${colorMap[service.color as keyof typeof colorMap].split(' ')[1]}`}
                style={{ backgroundImage: bgPattern }}>
              
              {/* Animated highlight */}
              <div className="absolute inset-0 opacity-50">
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
              
              {/* Service icon (large, centered) */}
              <div className="w-full h-full flex items-center justify-center opacity-30">
                <div className="transform scale-[4]">
                  {service.icon}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 