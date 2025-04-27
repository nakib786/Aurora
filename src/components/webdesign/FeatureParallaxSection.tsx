'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from '../animations/MotionComponents';

const features = [
  {
    id: 1,
    title: 'Responsive Design',
    description: 'Websites that look stunning on every device from mobile to desktop',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 2,
    title: 'Performance Optimization',
    description: 'Lightning-fast loading times and smooth interactions for the best user experience',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
      </svg>
    ),
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 3,
    title: 'Modern Animations',
    description: 'Engaging motion effects that guide users and enhance interactivity',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path>
      </svg>
    ),
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 4,
    title: 'SEO Optimization',
    description: 'Strategic optimization to improve visibility and search engine rankings',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 3a7 7 0 0 0-7 7v0a7 7 0 0 0 7 7v0a7 7 0 0 0 7-7v0a7 7 0 0 0-7-7Z"></path>
        <path d="m21 21-6-6"></path>
      </svg>
    ),
    color: 'from-pink-500 to-red-600'
  },
  {
    id: 5,
    title: 'Custom Functionality',
    description: 'Tailored features and integrations that meet your specific business needs',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
    color: 'from-red-500 to-orange-600'
  }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [100, 0, -100]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1, 0.8]
  );
  
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      ref={cardRef}
      style={{ y, opacity, scale }}
      className={`flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col items-center gap-8 my-24`}
    >
      <div className="md:w-1/2">
        <div className={`relative w-full aspect-video overflow-hidden rounded-xl bg-gradient-to-br ${feature.color} p-1`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="w-full h-full bg-black/30 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <div className="text-white transform transition-transform duration-300 hover:scale-110">
              {feature.icon}
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
        </div>
      </div>
      <div className="md:w-1/2">
        <h3 className="text-3xl font-bold mb-4 text-white">{feature.title}</h3>
        <p className="text-xl text-gray-300">{feature.description}</p>
      </div>
    </motion.div>
  );
};

const FeatureParallaxSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '50%']
  );
  
  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      {/* Parallax background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-gray-900 to-black -z-10"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating glowing orbs */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"></div>
      </motion.div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-indigo-900/50 text-indigo-300 text-sm font-medium mb-4 border border-indigo-700/30">
            Core Features
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Modern Solutions
            </span> for Modern Challenges
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We combine cutting-edge technology with creative design to deliver exceptional digital experiences
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureParallaxSection; 