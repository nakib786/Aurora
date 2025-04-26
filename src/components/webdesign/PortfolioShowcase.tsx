'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Futura Portal',
    description: 'An immersive portal experience with 3D elements, advanced AI integration, and futuristic user interface',
    image: '/images/projects/futura-portal.svg',
    color: 'from-cyan-600 to-blue-800',
    tags: ['React', 'Three.js', 'WebGL', 'AI Integration']
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'A full-featured online store with integrated payment processing and inventory management',
    image: '/images/projects/ecommerce-project.svg',
    color: 'from-blue-600 to-indigo-800',
    tags: ['Next.js', 'React', 'TailwindCSS', 'Stripe']
  },
  {
    id: 3,
    title: 'SaaS Dashboard',
    description: 'A comprehensive analytics dashboard for SaaS businesses with real-time data visualization',
    image: '/images/projects/saas-dashboard.svg',
    color: 'from-indigo-600 to-purple-800',
    tags: ['React', 'TypeScript', 'D3.js', 'Firebase']
  },
  {
    id: 4,
    title: 'Mobile App',
    description: 'Cross-platform mobile application for iOS and Android with seamless user experience',
    image: '/images/projects/mobile-app.svg',
    color: 'from-purple-600 to-pink-800',
    tags: ['React Native', 'Redux', 'Node.js', 'MongoDB']
  },
  {
    id: 5,
    title: 'Corporate Website',
    description: 'Modern, responsive website for a multinational corporation with multilingual support',
    image: '/images/projects/corporate-site.svg',
    color: 'from-pink-600 to-red-800',
    tags: ['Vue.js', 'Nuxt.js', 'GSAP', 'i18n']
  }
];

// Fallback image component that displays a gradient when no image is available
const FallbackProjectImage = ({ color }: { color: string }) => (
  <div className={`w-full h-full bg-gradient-to-br ${color} rounded-lg overflow-hidden`}>
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="text-white text-opacity-30 text-4xl font-bold">Project Preview</div>
    </div>
  </div>
);

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [100, 0, 100]
  );
  
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [20, 0, 20]
  );
  
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [index % 2 === 0 ? 15 : -15, 0, index % 2 === 0 ? -15 : 15]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1, 0.8]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3]
  );
  
  return (
    <motion.div 
      ref={cardRef}
      style={{ 
        y,
        rotateX,
        rotateY,
        scale,
        opacity,
        perspective: 1000 
      }}
      className="my-40 first:mt-20 last:mb-20"
    >
      <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 group">
        <div className="aspect-video overflow-hidden">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <FallbackProjectImage color={project.color} />
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-300 mb-4">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end">
            <button 
              className="group/btn relative px-4 py-2 text-blue-300 font-medium rounded-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1">
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </span>
              <span className="absolute inset-0 bg-blue-500/10 scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-300"></span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section 
      ref={containerRef} 
      className="relative py-24 bg-gradient-to-b from-black to-blue-950 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-purple-500/10 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-900/50 text-blue-300 text-sm font-medium mb-4 border border-blue-700/30">
            Our Work
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our portfolio of innovative digital solutions that have helped our clients succeed
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto perspective-1000">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="/contact" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 transform hover:scale-105 transition-all duration-300"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioShowcase; 