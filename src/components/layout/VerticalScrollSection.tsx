'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  benefits: string[];
  animationType: 'code' | 'chart' | 'calculator' | 'cart' | 'layers' | 'report';
}

const services: Service[] = [
  {
    id: 'web-development',
    title: 'Modern Web Development',
    description: 'Create responsive, fast, and visually stunning websites with the latest technologies and best practices.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    color: 'blue',
    features: ['React & Next.js', 'Responsive Design', 'SEO Optimization'],
    benefits: ['Faster Load Times', 'Better User Experience', 'Higher Conversions'],
    animationType: 'code'
  },
  {
    id: 'financial-excellence',
    title: 'Financial Excellence',
    description: 'Expert accounting services that ensure your finances are managed with precision and compliance.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
    color: 'emerald',
    features: ['Bookkeeping', 'Financial Analysis', 'Compliance'],
    benefits: ['Accurate Records', 'Better Insights', 'Peace of Mind'],
    animationType: 'chart'
  },
  {
    id: 'tax-planning',
    title: 'Strategic Tax Planning',
    description: 'Minimize tax liabilities and maximize savings with our strategic tax planning services.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
    color: 'amber',
    features: ['Tax Strategy', 'Deduction Optimization', 'Compliance'],
    benefits: ['Reduced Tax Burden', 'Legal Compliance', 'Strategic Planning'],
    animationType: 'calculator'
  },
  {
    id: 'e-commerce',
    title: 'E-commerce Solutions',
    description: 'Build powerful online stores with secure payment processing and intuitive user experiences.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
    ),
    color: 'purple',
    features: ['Online Store', 'Payment Gateway', 'Inventory Management'],
    benefits: ['Increased Sales', 'Global Reach', 'Automated Processes'],
    animationType: 'cart'
  },
  {
    id: 'custom-applications',
    title: 'Custom Application Development',
    description: 'Tailor-made applications built with scalability and performance in mind to meet your unique needs.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    color: 'indigo',
    features: ['Custom Development', 'API Integration', 'Cloud Deployment'],
    benefits: ['Tailored Solutions', 'Scalable Architecture', 'Future-Proof'],
    animationType: 'layers'
  },
  {
    id: 'financial-reporting',
    title: 'Financial Reporting',
    description: 'Comprehensive financial reports and dashboards that provide actionable insights for your business.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
    color: 'rose',
    features: ['Financial Dashboards', 'Custom Reports', 'Data Analytics'],
    benefits: ['Better Decisions', 'Clear Insights', 'Performance Tracking'],
    animationType: 'report'
  }
];

export default function VerticalScrollSection() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  const handleServiceClick = (service: Service) => {
    setActiveService(service === activeService ? null : service);
  };

  return (
    <div ref={sectionRef} className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-b from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-gray-900 dark:to-blue-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -left-20 sm:-left-40 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-20 sm:-right-40 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-20 sm:-bottom-40 left-1/3 w-36 h-36 sm:w-54 sm:h-54 md:w-72 md:h-72 bg-gradient-to-r from-emerald-400/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, y }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 mb-6 sm:mb-8">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">What We Offer</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Comprehensive business solutions tailored to your specific needs with 
            <span className="font-semibold text-blue-600 dark:text-blue-400"> cutting-edge technology</span> and expert guidance
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {services.map((service, index) => (
            <InteractiveServiceCard 
              key={service.id} 
              service={service} 
              index={index}
              isActive={activeService?.id === service.id}
              onClick={() => handleServiceClick(service)}
            />
          ))}
        </div>

        {/* Service Detail Panel */}
        {activeService && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl"
          >
            <ServiceDetail service={activeService} />
          </motion.div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 sm:mt-16 md:mt-20 text-center"
        >
          <a 
            href="/contact"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-3 sm:py-4 px-8 sm:px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <span>Get Started Today</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

function InteractiveServiceCard({ service, index, isActive, onClick }: { 
  service: Service; 
  index: number; 
  isActive: boolean; 
  onClick: () => void; 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const colorMap = {
    blue: 'from-blue-500 to-cyan-400 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/50',
    emerald: 'from-emerald-500 to-green-400 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/50',
    amber: 'from-amber-500 to-yellow-400 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/50',
    purple: 'from-purple-500 to-fuchsia-400 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200/50 dark:border-purple-800/50',
    indigo: 'from-indigo-500 to-blue-400 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-800/50',
    rose: 'from-rose-500 to-pink-400 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-800/50',
  };

  const gradientMap = {
    blue: 'from-blue-500/10 to-cyan-400/10',
    emerald: 'from-emerald-500/10 to-green-400/10',
    amber: 'from-amber-500/10 to-yellow-400/10',
    purple: 'from-purple-500/10 to-fuchsia-400/10',
    indigo: 'from-indigo-500/10 to-blue-400/10',
    rose: 'from-rose-500/10 to-pink-400/10',
  };

  useEffect(() => {
    if (isHovered) {
      controls.start("hover");
    } else {
      controls.start("initial");
    }
  }, [isHovered, controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative cursor-pointer p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border-2 backdrop-blur-sm transition-all duration-500 overflow-hidden ${
        isActive 
          ? `${colorMap[service.color as keyof typeof colorMap]} shadow-2xl scale-105` 
          : 'bg-white/60 dark:bg-gray-800/60 border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:border-gray-300/50 dark:hover:border-gray-600/50'
      }`}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientMap[service.color as keyof typeof gradientMap]} rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Interactive Background Animation */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
                 <AnimatedBackground type={service.animationType} isHovered={isHovered} />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon with enhanced animation */}
        <motion.div 
          className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 ${isActive ? colorMap[service.color as keyof typeof colorMap] : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'} transition-all duration-300`}
          animate={controls}
          variants={{
            initial: { scale: 1, rotate: 0 },
            hover: { scale: 1.1, rotate: service.animationType === 'code' ? 5 : service.animationType === 'calculator' ? -5 : 0 }
          }}
        >
          {service.icon}
        </motion.div>
        
        {/* Title */}
        <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 transition-all duration-300 ${
          isActive 
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600' 
            : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
        }`}>
          {service.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
          {service.description}
        </p>
        
        {/* Interactive Elements based on service type */}
        <ServiceSpecificElements type={service.animationType} isHovered={isHovered} />
        
        {/* Learn More Link */}
        <div className={`inline-flex items-center text-xs sm:text-sm font-medium transition-all duration-300 ${
          isActive 
            ? colorMap[service.color as keyof typeof colorMap].split(' ')[2] 
            : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
        }`}>
          <span>{isActive ? 'View Details' : 'Learn More'}</span>
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 sm:h-4 sm:w-4 ml-2" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </motion.svg>
        </div>
      </div>
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
        >
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}

function AnimatedBackground({ type, isHovered }: { type: string; isHovered: boolean }) {
  // Deterministic values to avoid hydration mismatch
  const codeWidths = [45, 32, 58, 28, 41, 35];
  const codeLeftPositions = [15, 25, 8, 45, 12, 38];
  const chartHeights = [55, 68, 45, 62, 50]; // Deterministic heights for chart bars

  switch (type) {
    case 'code':
      return (
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-blue-500 rounded-sm"
              style={{
                width: codeWidths[i],
                height: 2,
                left: `${codeLeftPositions[i]}%`,
                top: `${20 + i * 12}%`,
              }}
              animate={{
                opacity: isHovered ? [0.3, 0.7, 0.3] : 0.3,
                scaleX: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      );
    
    case 'chart':
      return (
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-emerald-500 rounded-t"
              style={{
                width: 8,
                left: `${20 + i * 15}%`,
                bottom: '20%',
              }}
              animate={{
                height: isHovered ? [20, chartHeights[i], 20] : 20,
                opacity: isHovered ? [0.5, 0.8, 0.5] : 0.5,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      );
    
    case 'calculator':
      return (
        <div className="absolute inset-0 opacity-10">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-amber-500 rounded"
              style={{
                width: 12,
                height: 12,
                left: `${25 + (i % 3) * 20}%`,
                top: `${30 + Math.floor(i / 3) * 15}%`,
              }}
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
                opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3,
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      );
    
    case 'cart':
      return (
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute bg-purple-500 rounded-full"
            style={{ width: 20, height: 20, left: '20%', top: '30%' }}
            animate={{
              x: isHovered ? [0, 100, 0] : 0,
              y: isHovered ? [0, -10, 0] : 0,
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute bg-purple-500 rounded"
            style={{ width: 30, height: 20, right: '20%', top: '50%' }}
            animate={{
              scale: isHovered ? [1, 1.1, 1] : 1,
              opacity: isHovered ? [0.5, 0.8, 0.5] : 0.5,
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      );
    
    case 'layers':
      return (
        <div className="absolute inset-0 opacity-10">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-indigo-500 rounded-lg"
              style={{
                width: 40 - i * 8,
                height: 40 - i * 8,
                left: '50%',
                top: '40%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                rotate: isHovered ? [0, 180, 360] : 0,
                scale: isHovered ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      );
    
    case 'report':
      return (
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute bg-rose-500"
            style={{ width: '60%', height: 2, left: '20%', top: '30%' }}
            animate={{
              scaleX: isHovered ? [0, 1, 0] : 0,
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute bg-rose-500"
            style={{ width: '40%', height: 2, left: '20%', top: '45%' }}
            animate={{
              scaleX: isHovered ? [0, 1, 0] : 0,
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div
            className="absolute bg-rose-500"
            style={{ width: '50%', height: 2, left: '20%', top: '60%' }}
            animate={{
              scaleX: isHovered ? [0, 1, 0] : 0,
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
        </div>
      );
    
    default:
      return null;
  }
}

function ServiceSpecificElements({ type, isHovered }: { type: string; isHovered: boolean }) {
  switch (type) {
    case 'code':
      return (
        <div className="mb-4">
          <motion.div 
            className="flex gap-1 mb-2"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            {['HTML', 'CSS', 'JS'].map((tech, i) => (
              <motion.span
                key={tech}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded"
                animate={{ scale: isHovered ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      );
    
    case 'chart':
      return (
        <div className="mb-4">
          <motion.div 
            className="text-xs text-emerald-600 dark:text-emerald-400 font-mono"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            <motion.div animate={{ opacity: isHovered ? [0.5, 1, 0.5] : 0.5 }} transition={{ duration: 1, repeat: Infinity }}>
              📈 Revenue: +15.3%
            </motion.div>
            <motion.div animate={{ opacity: isHovered ? [0.5, 1, 0.5] : 0.5 }} transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}>
              💰 Profit: +22.1%
            </motion.div>
          </motion.div>
        </div>
      );
    
    case 'calculator':
      return (
        <div className="mb-4">
          <motion.div 
            className="text-xs text-amber-600 dark:text-amber-400 font-mono bg-amber-50 dark:bg-amber-900/20 p-2 rounded"
            animate={{ scale: isHovered ? [1, 1.02, 1] : 1 }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Tax Saved: $12,450
          </motion.div>
        </div>
      );
    
    case 'cart':
      return (
        <div className="mb-4">
          <motion.div 
            className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400"
            animate={{ x: isHovered ? [0, 5, 0] : 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span>🛒</span>
            <span>3 items added</span>
          </motion.div>
        </div>
      );
    
    case 'layers':
      return (
        <div className="mb-4">
          <motion.div 
            className="text-xs text-indigo-600 dark:text-indigo-400"
            animate={{ opacity: isHovered ? [0.7, 1, 0.7] : 0.7 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div>⚡ API Connected</div>
            <div>☁️ Cloud Ready</div>
          </motion.div>
        </div>
      );
    
    case 'report':
      return (
        <div className="mb-4">
          <motion.div 
            className="text-xs text-rose-600 dark:text-rose-400"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            <motion.div animate={{ opacity: isHovered ? [0.5, 1, 0.5] : 0.5 }} transition={{ duration: 1, repeat: Infinity }}>
              📊 Reports Generated
            </motion.div>
            <motion.div animate={{ opacity: isHovered ? [0.5, 1, 0.5] : 0.5 }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}>
              📈 Insights Ready
            </motion.div>
          </motion.div>
        </div>
      );
    
    default:
      return null;
  }
}

function ServiceDetail({ service }: { service: Service }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Left Column - Service Info */}
      <div>
        <div className="flex items-center mb-6">
          <div className={`inline-flex p-4 rounded-2xl mr-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white`}>
            {service.icon}
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
        </div>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          {service.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <span>Get Started</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a 
            href="/projects"
            className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-gray-200 dark:border-gray-600"
          >
            <span>View Examples</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Right Column - Features & Benefits */}
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Key Features
          </h4>
          <ul className="space-y-3">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 p-6 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Benefits
          </h4>
          <ul className="space-y-3">
            {service.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full mr-3"></div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 