'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from '../animations/MotionComponents';

const features = [
  {
    id: 1,
    title: 'Responsive Design',
    description: 'Websites that look stunning on every device from mobile to desktop',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    color: 'from-blue-500 to-indigo-600',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    stats: '100%',
    statLabel: 'Mobile Responsive'
  },
  {
    id: 2,
    title: 'Performance Optimization',
    description: 'Lightning-fast loading times and smooth interactions for the best user experience',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
      </svg>
    ),
    color: 'from-indigo-500 to-purple-600',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    stats: '3x',
    statLabel: 'Faster Loading'
  },
  {
    id: 3,
    title: 'Modern Animations',
    description: 'Engaging motion effects that guide users and enhance interactivity',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path>
      </svg>
    ),
    color: 'from-purple-500 to-pink-600',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    stats: '60fps',
    statLabel: 'Smooth Animations'
  },
  {
    id: 4,
    title: 'SEO Optimization',
    description: 'Strategic optimization to improve visibility and search engine rankings',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 3a7 7 0 0 0-7 7v0a7 7 0 0 0 7 7v0a7 7 0 0 0 7-7v0a7 7 0 0 0-7-7Z"></path>
        <path d="m21 21-6-6"></path>
      </svg>
    ),
    color: 'from-pink-500 to-red-600',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    stats: '95+',
    statLabel: 'SEO Score'
  },
  {
    id: 5,
    title: 'Custom Functionality',
    description: 'Tailored features and integrations that meet your specific business needs',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
    color: 'from-red-500 to-orange-600',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    stats: '∞',
    statLabel: 'Possibilities'
  }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  // Spring animations for smooth interactions
  const springScale = useSpring(isHovered ? 1.05 : 1, { stiffness: 300, damping: 30 });
  const springRotate = useSpring(isHovered ? 2 : 0, { stiffness: 300, damping: 30 });
  
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      ref={cardRef}
      style={{ y, opacity, scale }}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
      className={`flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col items-center gap-12 my-32 group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Card */}
      <motion.div 
        className="md:w-1/2 relative"
        style={{ scale: springScale, rotate: springRotate }}
      >
        <div className={`relative w-full aspect-video overflow-hidden rounded-2xl bg-gradient-to-br ${feature.color} p-1 shadow-2xl`}>
          {/* Animated background grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-pulse"></div>
          
          {/* Main content area */}
          <div className="w-full h-full bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center relative overflow-hidden">
            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            
            {/* Icon with enhanced animations */}
            <motion.div 
              className="text-white relative z-10"
              animate={{
                scale: isHovered ? 1.2 : 1,
                rotate: isHovered ? 360 : 0,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {feature.icon}
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full blur-xl"
                style={{ backgroundColor: feature.glowColor }}
                animate={{
                  scale: isHovered ? 2 : 0,
                  opacity: isHovered ? 0.6 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            {/* Stats overlay */}
            <motion.div
              className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
            >
              <div className="text-white font-bold text-lg">{feature.stats}</div>
              <div className="text-white/70 text-xs">{feature.statLabel}</div>
            </motion.div>
          </div>
          
          {/* Enhanced glow orbs */}
          <motion.div 
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl"
            style={{ backgroundColor: feature.glowColor }}
            animate={{
              scale: isHovered ? 1.5 : 1,
              opacity: isHovered ? 0.8 : 0.4,
            }}
            transition={{ duration: 0.6 }}
          />
          <motion.div 
            className="absolute -top-8 -left-8 w-32 h-32 rounded-full blur-2xl"
            style={{ backgroundColor: feature.glowColor }}
            animate={{
              scale: isHovered ? 1.5 : 1,
              opacity: isHovered ? 0.6 : 0.3,
            }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
          
          {/* Border glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-transparent"
            style={{
              background: `linear-gradient(45deg, ${feature.glowColor}, transparent, ${feature.glowColor}) border-box`,
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'subtract',
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
      
      {/* Text Content */}
      <motion.div 
        className="md:w-1/2 space-y-6"
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
        transition={{ duration: 0.8, delay: index * 0.2 + 0.3, ease: "easeOut" }}
      >
        {/* Feature number */}
        <motion.div
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 text-white font-bold text-lg"
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 0.6 }}
        >
          {String(feature.id).padStart(2, '0')}
        </motion.div>
        
        {/* Title with gradient */}
        <motion.h3 
          className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"
          animate={{
            backgroundPosition: isHovered ? '200% center' : '0% center',
          }}
          transition={{ duration: 0.8 }}
          style={{
            backgroundSize: '200% 100%',
          }}
        >
          {feature.title}
        </motion.h3>
        
        {/* Description */}
        <motion.p 
          className="text-xl text-gray-300 leading-relaxed"
          animate={{
            color: isHovered ? '#ffffff' : '#d1d5db',
          }}
          transition={{ duration: 0.3 }}
        >
          {feature.description}
        </motion.p>
        
        {/* Learn more button */}
        <motion.button
          className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-full text-white font-medium hover:from-white/20 hover:to-white/10 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{
              x: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const FeatureParallaxSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Enhanced parallax background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-gray-900 to-black -z-10"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Animated stars */}
        <motion.div style={{ y: starsY }} className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
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
        
        {/* Enhanced floating glowing orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
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
        <motion.div 
          className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-pink-500/8 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </motion.div>
      
      <div className="container mx-auto px-4">
        {/* Enhanced header section */}
        <motion.div 
          ref={titleRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-indigo-900/50 to-purple-900/50 text-indigo-300 text-sm font-medium mb-6 border border-indigo-700/30 backdrop-blur-sm"
            animate={{
              boxShadow: isTitleInView 
                ? ['0 0 20px rgba(99, 102, 241, 0.3)', '0 0 40px rgba(99, 102, 241, 0.5)', '0 0 20px rgba(99, 102, 241, 0.3)']
                : '0 0 20px rgba(99, 102, 241, 0.3)',
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Core Features
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
              Modern Solutions
            </span>
            <br />
            <span className="text-white">for Modern Challenges</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We combine cutting-edge technology with creative design to deliver exceptional digital experiences that drive results and exceed expectations
          </motion.p>
        </motion.div>
        
        {/* Feature cards */}
        <div className="max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
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

export default FeatureParallaxSection; 