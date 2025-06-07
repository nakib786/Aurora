'use client';

import React, { useEffect, useRef } from 'react';
import { HorizontalScroll } from '@/components/animations/AdvancedAnimations';
import { motion } from 'framer-motion';

interface Technology {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'accounting';
  description: string;
  gradient: string;
}

const technologies: Technology[] = [
  { 
    name: 'React', 
    icon: '⚛️', 
    category: 'frontend',
    description: 'Modern UI library',
    gradient: 'from-blue-400 via-blue-500 to-cyan-500'
  },
  { 
    name: 'Next.js', 
    icon: '▲', 
    category: 'frontend',
    description: 'Full-stack framework',
    gradient: 'from-gray-700 via-gray-800 to-black'
  },
  { 
    name: 'TypeScript', 
    icon: '🔷', 
    category: 'frontend',
    description: 'Type-safe JavaScript',
    gradient: 'from-blue-600 via-blue-700 to-blue-800'
  },
  { 
    name: 'TailwindCSS', 
    icon: '🌊', 
    category: 'frontend',
    description: 'Utility-first CSS',
    gradient: 'from-cyan-400 via-teal-500 to-blue-600'
  },
  { 
    name: 'Node.js', 
    icon: '🟢', 
    category: 'backend',
    description: 'JavaScript runtime',
    gradient: 'from-green-400 via-green-500 to-green-600'
  },
  { 
    name: 'Python', 
    icon: '🐍', 
    category: 'backend',
    description: 'Versatile programming',
    gradient: 'from-yellow-400 via-yellow-500 to-amber-500'
  },
  { 
    name: 'PostgreSQL', 
    icon: '🐘', 
    category: 'backend',
    description: 'Advanced database',
    gradient: 'from-blue-500 via-indigo-600 to-purple-600'
  },
  { 
    name: 'MongoDB', 
    icon: '🍃', 
    category: 'backend',
    description: 'NoSQL database',
    gradient: 'from-green-500 via-emerald-600 to-teal-600'
  },
  { 
    name: 'Docker', 
    icon: '🐳', 
    category: 'tools',
    description: 'Containerization',
    gradient: 'from-blue-400 via-blue-500 to-blue-600'
  },
  { 
    name: 'AWS', 
    icon: '☁️', 
    category: 'tools',
    description: 'Cloud platform',
    gradient: 'from-orange-400 via-orange-500 to-red-500'
  },
  { 
    name: 'GitHub', 
    icon: '🐙', 
    category: 'tools',
    description: 'Version control',
    gradient: 'from-gray-600 via-gray-700 to-gray-800'
  },
  { 
    name: 'CI/CD', 
    icon: '🔄', 
    category: 'tools',
    description: 'Automation pipeline',
    gradient: 'from-purple-400 via-purple-500 to-purple-600'
  },
  { 
    name: 'Financial Analysis', 
    icon: '📊', 
    category: 'accounting',
    description: 'Data insights',
    gradient: 'from-emerald-400 via-emerald-500 to-green-600'
  },
  { 
    name: 'Tax Planning', 
    icon: '💰', 
    category: 'accounting',
    description: 'Strategic optimization',
    gradient: 'from-yellow-400 via-amber-500 to-orange-500'
  },
  { 
    name: 'Bookkeeping', 
    icon: '📚', 
    category: 'accounting',
    description: 'Record management',
    gradient: 'from-indigo-400 via-indigo-500 to-purple-600'
  },
  { 
    name: 'Compliance', 
    icon: '✅', 
    category: 'accounting',
    description: 'Regulatory adherence',
    gradient: 'from-green-400 via-green-500 to-emerald-600'
  },
];

export default function HorizontalScrollSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Reset horizontal scroll when section goes completely out of view
  useEffect(() => {
    const section = scrollContainerRef.current;
    if (!section) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && 
            (entry.boundingClientRect.bottom < -100 || entry.boundingClientRect.top > window.innerHeight + 100)) {
          const scrollContainer = section.querySelector('div');
          if (scrollContainer) {
            scrollContainer.style.transform = 'translateX(0)';
          }
        }
      });
    }, {
      threshold: 0,
      rootMargin: '-50px 0px'
    });
    
    observer.observe(section);
    return () => observer.unobserve(section);
  }, []);
  
  return (
    <div ref={scrollContainerRef} className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Our Technology Stack</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Cutting-Edge
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We leverage the most advanced technologies and methodologies to deliver 
            <span className="font-semibold text-blue-600 dark:text-blue-400"> exceptional solutions</span> that drive your business forward
          </p>
        </motion.div>
      </div>
      
      {/* Desktop view with enhanced design */}
      <div className="relative w-full overflow-hidden hidden md:block">
        <HorizontalScroll className="py-12">
          <div className="flex items-center space-x-8 px-8">
            {technologies.map((tech, index) => (
              <TechCard key={index} technology={tech} index={index} />
            ))}
          </div>
        </HorizontalScroll>
      </div>
      
      {/* Mobile enhanced marquee view */}
      <div className="md:hidden w-full overflow-hidden">
        <div className="marquee-container py-12">
          <div className="marquee">
            <div className="marquee-content flex items-center space-x-6">
              {technologies.map((tech, index) => (
                <TechCard key={`marquee-1-${index}`} technology={tech} index={index} />
              ))}
            </div>
            <div className="marquee-content flex items-center space-x-6" aria-hidden="true">
              {technologies.map((tech, index) => (
                <TechCard key={`marquee-2-${index}`} technology={tech} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-20 text-center relative z-10"
      >
        <div className="inline-flex flex-col sm:flex-row gap-4">
          <a 
            href="/contact"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <span>Start Your Project</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity -z-10"></div>
          </a>
          
          <a 
            href="/projects"
            className="group inline-flex items-center gap-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50"
          >
            <span>View Our Work</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </a>
        </div>
      </motion.div>
      
      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }
        
        .marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .marquee-content {
          display: flex;
          min-width: 100%;
          padding: 0 1rem;
        }
      `}</style>
    </div>
  );
}

function TechCard({ technology, index }: { technology: Technology; index: number }) {
  const categoryColors = {
    frontend: 'from-blue-500/10 to-cyan-500/10 border-blue-200/30 dark:border-blue-800/30',
    backend: 'from-green-500/10 to-emerald-500/10 border-green-200/30 dark:border-green-800/30',
    tools: 'from-purple-500/10 to-pink-500/10 border-purple-200/30 dark:border-purple-800/30',
    accounting: 'from-amber-500/10 to-orange-500/10 border-amber-200/30 dark:border-amber-800/30',
  };
  
  const categoryLabels = {
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'DevOps',
    accounting: 'Finance',
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative flex flex-col items-center p-8 rounded-3xl bg-gradient-to-br ${categoryColors[technology.category]} backdrop-blur-sm border min-w-[200px] md:min-w-[280px] transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5`}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${technology.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
      
      {/* Icon with enhanced styling */}
      <div className="relative mb-6">
        <div className={`absolute inset-0 bg-gradient-to-r ${technology.gradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
        <div className={`relative w-16 h-16 bg-gradient-to-r ${technology.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
          {technology.icon}
        </div>
      </div>
      
      {/* Content */}
      <div className="text-center relative z-10">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
          {technology.name}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {technology.description}
        </p>
        
        <div className="inline-flex items-center gap-2">
          <div className={`w-2 h-2 bg-gradient-to-r ${technology.gradient} rounded-full`}></div>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {categoryLabels[technology.category]}
          </span>
        </div>
      </div>
      
      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </motion.div>
  );
} 