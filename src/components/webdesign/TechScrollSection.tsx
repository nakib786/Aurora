'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from '../../components/animations/MotionComponents';

const technologies = [
  { 
    name: 'React', 
    icon: '⚛️', 
    color: '#61DAFB',
    category: 'Frontend',
    description: 'A JavaScript library for building user interfaces',
    stats: '18M+',
    statLabel: 'Weekly Downloads'
  },
  { 
    name: 'Next.js', 
    icon: '▲', 
    color: '#000000',
    category: 'Framework',
    description: 'The React framework for production',
    stats: '5M+',
    statLabel: 'Weekly Downloads'
  },
  { 
    name: 'TypeScript', 
    icon: '🔷', 
    color: '#3178C6',
    category: 'Language',
    description: 'JavaScript with syntax for types',
    stats: '25M+',
    statLabel: 'Weekly Downloads'
  },
  { 
    name: 'TailwindCSS', 
    icon: '🌊', 
    color: '#06B6D4',
    category: 'Styling',
    description: 'A utility-first CSS framework',
    stats: '8M+',
    statLabel: 'Weekly Downloads'
  },
  { 
    name: 'Node.js', 
    icon: '🟢', 
    color: '#339933',
    category: 'Runtime',
    description: 'JavaScript runtime built on Chrome\'s V8',
    stats: '40M+',
    statLabel: 'Active Users'
  },
  { 
    name: 'GraphQL', 
    icon: '🔗', 
    color: '#E10098',
    category: 'API',
    description: 'A query language for your API',
    stats: '15K+',
    statLabel: 'GitHub Stars'
  },
  { 
    name: 'Vue.js', 
    icon: '💚', 
    color: '#4FC08D',
    category: 'Framework',
    description: 'The progressive JavaScript framework',
    stats: '200K+',
    statLabel: 'GitHub Stars'
  },
  { 
    name: 'Angular', 
    icon: '🅰️', 
    color: '#DD0031',
    category: 'Framework',
    description: 'Platform for building mobile and desktop apps',
    stats: '90K+',
    statLabel: 'GitHub Stars'
  },
  { 
    name: 'MongoDB', 
    icon: '🍃', 
    color: '#47A248',
    category: 'Database',
    description: 'The most popular NoSQL database',
    stats: '30M+',
    statLabel: 'Downloads'
  },
  { 
    name: 'Firebase', 
    icon: '🔥', 
    color: '#FFCA28',
    category: 'Backend',
    description: 'Google\'s mobile platform',
    stats: '3M+',
    statLabel: 'Active Projects'
  },
  { 
    name: 'AWS', 
    icon: '☁️', 
    color: '#FF9900',
    category: 'Cloud',
    description: 'Amazon Web Services cloud platform',
    stats: '1M+',
    statLabel: 'Active Customers'
  },
  { 
    name: 'Docker', 
    icon: '🐳', 
    color: '#2496ED',
    category: 'DevOps',
    description: 'Containerization platform',
    stats: '13M+',
    statLabel: 'Developers'
  },
];

const TechCard = ({ tech }: { tech: typeof technologies[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const springScale = useSpring(isHovered ? 1.1 : 1, { stiffness: 300, damping: 30 });
  const springRotateX = useSpring(isHovered ? (mousePosition.y - 0.5) * 20 : 0, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(isHovered ? (mousePosition.x - 0.5) * -20 : 0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        scale: springScale,
        rotateX: springRotateX,
        rotateY: springRotateY,
      }}
      className="group relative w-72 h-80 perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0.5, y: 0.5 });
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ 
          background: `linear-gradient(45deg, ${tech.color}40, transparent, ${tech.color}40)`,
        }}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main card */}
      <div className="relative w-full h-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ 
                backgroundColor: tech.color,
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative p-6 h-full flex flex-col justify-between z-10">
          {/* Header */}
          <div className="text-center">
            {/* Category badge */}
            <motion.div
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 border"
              style={{ 
                backgroundColor: `${tech.color}20`,
                borderColor: `${tech.color}40`,
                color: tech.color,
              }}
              animate={{
                boxShadow: isHovered 
                  ? `0 0 20px ${tech.color}40`
                  : `0 0 0px ${tech.color}40`,
              }}
              transition={{ duration: 0.3 }}
            >
              {tech.category}
            </motion.div>

            {/* Icon */}
            <motion.div
              className="text-6xl mb-4 relative"
              animate={{
                scale: isHovered ? 1.2 : 1,
                rotate: isHovered ? 360 : 0,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {tech.icon}
              
              {/* Icon glow */}
              <motion.div
                className="absolute inset-0 rounded-full blur-lg"
                style={{ backgroundColor: `${tech.color}40` }}
                animate={{
                  scale: isHovered ? 2 : 0,
                  opacity: isHovered ? 0.6 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Title */}
            <motion.h3
              className="text-xl font-bold text-white mb-2"
              animate={{
                color: isHovered ? tech.color : '#ffffff',
              }}
              transition={{ duration: 0.3 }}
            >
              {tech.name}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="text-gray-400 text-sm leading-relaxed mb-4"
              animate={{
                color: isHovered ? '#ffffff' : '#9ca3af',
              }}
              transition={{ duration: 0.3 }}
            >
              {tech.description}
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            className="text-center p-4 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm"
            animate={{
              borderColor: isHovered ? `${tech.color}40` : '#374151',
              backgroundColor: isHovered ? `${tech.color}10` : '#1f2937',
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-2xl font-bold text-white mb-1">{tech.stats}</div>
            <div className="text-xs text-gray-400">{tech.statLabel}</div>
          </motion.div>
        </div>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent"
          style={{
            background: `linear-gradient(45deg, ${tech.color}, transparent, ${tech.color}) border-box`,
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
  );
};

const InfiniteScroll = ({ 
  direction = 'left', 
  speed = 20, 
  children 
}: { 
  direction?: 'left' | 'right', 
  speed?: number, 
  children: React.ReactNode 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(true);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    const scrollWidth = scrollContainer.scrollWidth;
    const viewportWidth = scrollContainer.offsetWidth;
    
    if (scrollWidth <= viewportWidth) return;
    
    let scrollPos = 0;
    let animationId: number;
    
    const scroll = () => {
      if (!scrollContainer || !isScrolling) return;
      
      const maxScroll = scrollWidth / 2;
      
      if (direction === 'left') {
        scrollPos += speed / 60;
        if (scrollPos >= maxScroll) scrollPos = 0;
      } else {
        scrollPos -= speed / 60;
        if (scrollPos <= 0) scrollPos = maxScroll;
      }
      
      scrollContainer.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    
    return () => cancelAnimationFrame(animationId);
  }, [direction, speed, isScrolling]);
  
  return (
    <div 
      ref={scrollRef} 
      className="overflow-x-hidden whitespace-nowrap"
      onMouseEnter={() => setIsScrolling(false)}
      onMouseLeave={() => setIsScrolling(true)}
    >
      <div className="inline-block">
        {children}
      </div>
      <div className="inline-block">
        {children}
      </div>
    </div>
  );
};

const TechScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);
  
  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity, y }}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 via-indigo-950 to-purple-950"
    >
      {/* Enhanced parallax background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Animated stars */}
        <motion.div style={{ y: starsY }} className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1.5, 0.5],
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
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
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
          className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-indigo-500/8 blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
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
      
      {/* Header section */}
      <motion.div 
        ref={titleRef}
        className="container mx-auto px-4 mb-16 text-center"
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
          ⚡ Tech Stack
        </motion.div>
        
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Cutting-Edge{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
            Technologies
          </span>
        </motion.h2>
        
        <motion.p 
          className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We leverage the latest frameworks and tools to build high-performance, scalable digital solutions that drive innovation and deliver exceptional user experiences
        </motion.p>
      </motion.div>
      
      {/* Technology cards with infinite scroll */}
      <div className="space-y-16">
        <InfiniteScroll direction="left" speed={25}>
          <div className="flex gap-8 py-4">
            {technologies.map((tech, index) => (
              <TechCard 
                key={`tech1-${index}`} 
                tech={tech} 
              />
            ))}
          </div>
        </InfiniteScroll>
        
        <InfiniteScroll direction="right" speed={30}>
          <div className="flex gap-8 py-4">
            {[...technologies].reverse().map((tech, index) => (
              <TechCard 
                key={`tech2-${index}`} 
                tech={tech} 
              />
            ))}
          </div>
        </InfiniteScroll>
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
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </motion.div>
  );
};

export default TechScrollSection; 