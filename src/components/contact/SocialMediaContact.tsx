'use client';

import React, { useState } from 'react';
import { motion } from '../animations/MotionComponents';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';

interface SocialLink {
  platform: string;
  icon: React.ReactNode;
  url: string;
  gradientFrom: string;
  gradientTo: string;
  shadowColor: string;
  description: string;
}

const SocialMediaContact: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const socialLinks: SocialLink[] = [
    {
      platform: 'Twitter',
      icon: <FaTwitter size={28} />,
      url: 'https://twitter.com/aurora',
      gradientFrom: 'from-blue-400',
      gradientTo: 'to-blue-600',
      shadowColor: 'shadow-blue-500/30',
      description: 'Follow us for the latest updates and news'
    },
    {
      platform: 'Facebook',
      icon: <FaFacebook size={28} />,
      url: 'https://facebook.com/aurora',
      gradientFrom: 'from-blue-600',
      gradientTo: 'to-blue-800',
      shadowColor: 'shadow-blue-700/30',
      description: 'Join our community and events'
    },
    {
      platform: 'Instagram',
      icon: <FaInstagram size={28} />,
      url: 'https://instagram.com/aurora',
      gradientFrom: 'from-pink-500',
      gradientTo: 'to-purple-600',
      shadowColor: 'shadow-pink-600/30',
      description: 'See our latest photos and stories'
    },
    {
      platform: 'LinkedIn',
      icon: <FaLinkedin size={28} />,
      url: 'https://linkedin.com/company/aurora',
      gradientFrom: 'from-blue-600',
      gradientTo: 'to-cyan-600',
      shadowColor: 'shadow-blue-700/30',
      description: 'Connect with our professional network'
    },
    {
      platform: 'GitHub',
      icon: <FaGithub size={28} />,
      url: 'https://github.com/aurora',
      gradientFrom: 'from-gray-700',
      gradientTo: 'to-gray-900',
      shadowColor: 'shadow-gray-800/30',
      description: 'Explore our open-source projects'
    },
    {
      platform: 'Discord',
      icon: <FaDiscord size={28} />,
      url: 'https://discord.gg/aurora',
      gradientFrom: 'from-indigo-500',
      gradientTo: 'to-purple-700',
      shadowColor: 'shadow-indigo-700/30',
      description: 'Join our community chat'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900/20 to-black"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-20"></div>
        
        {/* Animated stars */}
        <div className="stars-container">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ 
                opacity: Math.random() * 0.7 + 0.3,
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%` 
              }}
              animate={{ 
                opacity: [
                  Math.random() * 0.7 + 0.3,
                  Math.random() * 0.5 + 0.5,
                  Math.random() * 0.7 + 0.3
                ] 
              }}
              transition={{ 
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Floating gradient orbs */}
      <motion.div 
        className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl"
        animate={{ 
          x: [0, 30, 0], 
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-3xl"
        animate={{ 
          x: [0, -40, 0], 
          y: [0, 40, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
      ></motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium mb-4 shadow-lg shadow-purple-500/20">
            Social Media
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Connect With Us
            </span>
            <motion.div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 64, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            ></motion.div>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Follow us on social media to stay updated with our latest projects, insights, and announcements.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-2xl p-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
              onMouseEnter={() => setHoveredCard(social.platform)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card with gradient border */}
              <div className="relative p-[1px] rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full">
                {/* Glassmorphism card content */}
                <div className={`h-full bg-gradient-to-r ${social.gradientFrom} ${social.gradientTo} backdrop-blur-xl rounded-2xl overflow-hidden relative`}>
                  {/* Animated shine effect */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                    animate={{ 
                      x: ['-100%', '100%']
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "loop", 
                      duration: 2,
                      ease: "linear",
                      repeatDelay: 0.5
                    }}
                  />
                  
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`socialPattern${social.platform}`} patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
                          <rect width="100%" height="100%" fill="none"/>
                          <circle cx="20" cy="20" r="1.5" fill="rgba(255,255,255,0.4)" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#socialPattern${social.platform})`} />
                    </svg>
                  </div>
                  
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-white/10 backdrop-blur-md rounded-full mr-4">
                        {social.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{social.platform}</h3>
                        <p className="text-white/80 text-sm">@aurora</p>
                      </div>
                    </div>
                    
                    <p className="text-white/90 text-sm mt-2 mb-6">{social.description}</p>
                    
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-sm font-medium text-white/90">Follow Us</span>
                      <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: hoveredCard === social.platform ? 5 : 0 }}
                        className="flex items-center bg-white/20 rounded-full p-2 group-hover:bg-white/30 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400">
            Don&apos;t see your preferred platform? 
            <a href="#contact-form" className="ml-2 text-purple-400 hover:text-purple-300 transition-colors font-medium hover:underline">
              Message us directly
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SocialMediaContact; 