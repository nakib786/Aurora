'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';

interface SocialLink {
  platform: string;
  icon: React.ReactNode;
  url: string;
  color: string;
  hoverColor: string;
}

const SocialMediaContact: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const socialLinks: SocialLink[] = [
    {
      platform: 'Twitter',
      icon: <FaTwitter size={24} />,
      url: 'https://twitter.com/aurora',
      color: 'bg-blue-500',
      hoverColor: 'bg-blue-600'
    },
    {
      platform: 'Facebook',
      icon: <FaFacebook size={24} />,
      url: 'https://facebook.com/aurora',
      color: 'bg-blue-700',
      hoverColor: 'bg-blue-800'
    },
    {
      platform: 'Instagram',
      icon: <FaInstagram size={24} />,
      url: 'https://instagram.com/aurora',
      color: 'bg-pink-600',
      hoverColor: 'bg-pink-700'
    },
    {
      platform: 'LinkedIn',
      icon: <FaLinkedin size={24} />,
      url: 'https://linkedin.com/company/aurora',
      color: 'bg-blue-800',
      hoverColor: 'bg-blue-900'
    },
    {
      platform: 'GitHub',
      icon: <FaGithub size={24} />,
      url: 'https://github.com/aurora',
      color: 'bg-gray-800',
      hoverColor: 'bg-gray-900'
    },
    {
      platform: 'Discord',
      icon: <FaDiscord size={24} />,
      url: 'https://discord.gg/aurora',
      color: 'bg-indigo-600',
      hoverColor: 'bg-indigo-700'
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
    <div className="py-16 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Connect With Us
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
              className={`relative overflow-hidden rounded-xl p-6 ${
                hoveredCard === social.platform ? social.hoverColor : social.color
              } transition-colors duration-300 transform hover:scale-[1.02] hover:shadow-xl`}
              onMouseEnter={() => setHoveredCard(social.platform)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/10 rounded-full backdrop-blur-md">
                  {social.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{social.platform}</h3>
                  <p className="text-sm text-white/80">@aurora</p>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-medium">Follow Us</span>
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: hoveredCard === social.platform ? 5 : 0 }}
                  className="flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </motion.div>
              </div>
              
              {/* Abstract background pattern */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-white/5 blur-xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            Don't see your preferred platform? 
            <a href="#contact-form" className="ml-2 text-blue-400 hover:text-blue-300 transition-colors underline">
              Message us directly
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SocialMediaContact; 