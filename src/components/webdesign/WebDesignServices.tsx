'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from '../animations/MotionComponents';
import ThreeScene from '../animations/ThreeScene';

const webDesignServices = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Custom websites designed to showcase your brand and engage your audience.',
    features: ['Responsive Design', 'SEO Optimization', 'Content Management', 'Analytics Integration'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    color: 'from-blue-500 to-indigo-600',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    stats: '500+',
    statLabel: 'Websites Built'
  },
  {
    id: 2,
    title: 'E-commerce Solutions',
    description: 'Feature-rich online stores to help you sell your products globally.',
    features: ['Product Management', 'Secure Payments', 'Inventory Tracking', 'Customer Accounts'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="m1 1 4 4 2.5 11h9.5"></path>
        <path d="M7 8h13l-1 5H6"></path>
      </svg>
    ),
    color: 'from-emerald-500 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    stats: '200+',
    statLabel: 'Stores Launched'
  },
  {
    id: 3,
    title: 'Mobile Applications',
    description: 'Native and cross-platform mobile apps for iOS and Android.',
    features: ['Intuitive UI/UX', 'Cross-platform Development', 'Offline Capabilities', 'Push Notifications'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
      </svg>
    ),
    color: 'from-purple-500 to-pink-600',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    stats: '100+',
    statLabel: 'Apps Developed'
  },
  {
    id: 4,
    title: 'UI/UX Design',
    description: 'User-centered design to enhance user experience and satisfaction.',
    features: ['User Research', 'Wireframing', 'Prototype Testing', 'Visual Design'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
    ),
    color: 'from-orange-500 to-red-600',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    stats: '1000+',
    statLabel: 'Designs Created'
  }
];

const technologies = [
  { name: 'React', color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  { name: 'Next.js', color: 'text-gray-300', bgColor: 'bg-gray-500/10' },
  { name: 'Vue.js', color: 'text-green-400', bgColor: 'bg-green-500/10' },
  { name: 'Node.js', color: 'text-green-500', bgColor: 'bg-green-600/10' },
  { name: 'Laravel', color: 'text-red-400', bgColor: 'bg-red-500/10' },
  { name: 'WordPress', color: 'text-blue-500', bgColor: 'bg-blue-600/10' },
  { name: 'Shopify', color: 'text-green-600', bgColor: 'bg-green-700/10' },
  { name: 'Magento', color: 'text-orange-500', bgColor: 'bg-orange-600/10' }
];

const ServiceCard = ({ service, index }: { service: typeof webDesignServices[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const springScale = useSpring(isHovered ? 1.05 : 1, { stiffness: 300, damping: 30 });
  const springRotate = useSpring(isHovered ? 1 : 0, { stiffness: 300, damping: 30 });

  return (
    <motion.div
      ref={cardRef}
      style={{ scale: springScale, rotateY: springRotate }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(45deg, ${service.glowColor}, transparent, ${service.glowColor})` }}
      />
      
      {/* Main card */}
      <div className="relative bg-white/5 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [-5, 5, -5],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        
        <div className="relative p-8 z-10">
          {/* Header with icon and stats */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className={`p-4 rounded-xl bg-gradient-to-br ${service.color} shadow-lg`}
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-white">
                {service.icon}
              </div>
              
              {/* Icon glow effect */}
              <motion.div
                className="absolute inset-0 rounded-xl blur-lg"
                style={{ backgroundColor: service.glowColor }}
                animate={{
                  scale: isHovered ? 1.5 : 0,
                  opacity: isHovered ? 0.6 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            {/* Stats badge */}
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            >
              <div className="text-white font-bold text-sm">{service.stats}</div>
              <div className="text-white/70 text-xs">{service.statLabel}</div>
            </motion.div>
          </div>
          
          {/* Service number */}
          <motion.div
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/30 text-white font-bold text-sm mb-4"
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 360 : 0,
            }}
            transition={{ duration: 0.6 }}
          >
            {String(service.id).padStart(2, '0')}
          </motion.div>
          
          {/* Title */}
          <motion.h3
            className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"
            animate={{
              backgroundPosition: isHovered ? '200% center' : '0% center',
            }}
            transition={{ duration: 0.8 }}
            style={{
              backgroundSize: '200% 100%',
            }}
          >
            {service.title}
          </motion.h3>
          
          {/* Description */}
          <motion.p
            className="text-gray-300 mb-6 leading-relaxed"
            animate={{
              color: isHovered ? '#ffffff' : '#d1d5db',
            }}
            transition={{ duration: 0.3 }}
          >
            {service.description}
          </motion.p>
          
          {/* Features */}
          <div className="mb-6">
            <h4 className="font-semibold text-blue-400 mb-3 text-sm uppercase tracking-wide">Key Features:</h4>
            <ul className="space-y-2">
              {service.features.map((feature, i) => (
                <motion.li
                  key={i}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 + i * 0.1 + 0.5, duration: 0.4 }}
                >
                  <motion.svg
                    className="w-4 h-4 text-blue-400 mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    animate={{
                      scale: isHovered ? 1.2 : 1,
                      rotate: isHovered ? 360 : 0,
                    }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </motion.svg>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Learn more button */}
          <motion.button
            className="w-full group/btn inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium hover:from-white/20 hover:to-white/10 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{
                x: isHovered ? 3 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.button>
        </div>
        
        {/* Bottom glow effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, ${service.glowColor}, transparent, ${service.glowColor})` }}
        />
      </div>
    </motion.div>
  );
};

const WebDesignServices = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900">
      {/* Enhanced parallax background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Animated stars */}
        <motion.div style={{ y: starsY }} className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
        
        {/* Floating glowing orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced header section */}
        <motion.div 
          ref={titleRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-900/50 to-indigo-900/50 text-blue-300 text-sm font-medium mb-6 border border-blue-700/30 backdrop-blur-sm"
            animate={{
              boxShadow: isTitleInView 
                ? ['0 0 20px rgba(59, 130, 246, 0.3)', '0 0 40px rgba(59, 130, 246, 0.5)', '0 0 20px rgba(59, 130, 246, 0.3)']
                : '0 0 20px rgba(59, 130, 246, 0.3)',
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🚀 Our Services
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x">
              Web Design & Development
            </span>
            <br />
            <span className="text-white">Services</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From concept to launch, we deliver innovative digital solutions that drive results and transform your business vision into reality
          </motion.p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
          {/* Left side - Technologies and CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <motion.h3 
                className="text-3xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Modern Web Development
              </motion.h3>
              <motion.p 
                className="text-gray-300 mb-8 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                We leverage the latest technologies and frameworks to create fast, secure, and scalable web applications. Our development process focuses on delivering exceptional user experiences while ensuring your business objectives are met.
              </motion.p>
            </div>
            
            {/* Technologies grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center justify-center p-4 ${tech.bgColor} backdrop-blur-sm rounded-xl border border-white/10 group hover:scale-105 transition-all duration-300`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <span className={`${tech.color} font-medium text-sm group-hover:text-white transition-colors duration-300`}>
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-2xl group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Discuss Your Project</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Right side - 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-indigo-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl"></div>
              <div className="relative z-10">
                <ThreeScene />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {webDesignServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
      
      {/* Additional CSS for gradient animation */}
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .bg-grid-pattern {
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
};

export default WebDesignServices; 