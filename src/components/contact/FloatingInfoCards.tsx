'use client';

import React from 'react';
import { motion } from '../animations/MotionComponents';

interface ContactInfoCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  shadowColor: string;
}

const FloatingInfoCards: React.FC = () => {
  const contactInfo: ContactInfoCard[] = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email Us',
      description: 'contact@aurora.com',
      link: 'mailto:contact@aurora.com',
      linkText: 'Send Email',
      color: 'from-blue-500 to-blue-600',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-indigo-600',
      shadowColor: 'shadow-blue-500/20'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Call Us',
      description: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      linkText: 'Make Call',
      color: 'from-green-500 to-green-600',
      gradientFrom: 'from-emerald-500',
      gradientTo: 'to-teal-600',
      shadowColor: 'shadow-emerald-500/20'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Visit Us',
      description: '123 Design Street, Creative City, CA 90210',
      link: 'https://maps.google.com',
      linkText: 'Get Directions',
      color: 'from-purple-500 to-purple-600',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-indigo-600',
      shadowColor: 'shadow-purple-500/20'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Business Hours',
      description: 'Monday - Friday: 9 AM - 5 PM',
      color: 'from-amber-500 to-amber-600',
      gradientFrom: 'from-amber-500',
      gradientTo: 'to-orange-600',
      shadowColor: 'shadow-amber-500/20'
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
    <div className="py-16 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800"></div>
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      
      {/* Moving gradient orbs */}
      <motion.div 
        initial={{ x: "-20%", y: "20%", opacity: 0.5 }}
        animate={{ x: "10%", y: "-10%", opacity: 0.7 }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute -bottom-64 -left-64 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
      ></motion.div>
      <motion.div 
        initial={{ x: "20%", y: "-10%", opacity: 0.5 }}
        animate={{ x: "-10%", y: "20%", opacity: 0.7 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute -top-64 -right-64 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-3xl"
      ></motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium mb-4 shadow-lg shadow-indigo-500/20">
            Connect With Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              How to Reach Us
            </span>
            <motion.div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 64, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            ></motion.div>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We&apos;re here to help! Reach out to us using any of the methods below.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              whileHover={{ 
                y: -10, 
                transition: { duration: 0.2 },
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >
              {/* Card with gradient border */}
              <div className="relative p-[1px] rounded-xl overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl">
                {/* Glassmorphism card content */}
                <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
                  <div className={`p-6 bg-gradient-to-r ${info.gradientFrom} ${info.gradientTo} text-white relative overflow-hidden`}>
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`contactPattern${index}`} patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
                            <rect width="100%" height="100%" fill="none"/>
                            <circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.4)" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#contactPattern${index})`} />
                      </svg>
                    </div>
                    
                    <div className="relative z-10 flex justify-between items-center">
                      <h3 className="text-xl font-bold tracking-tight">{info.title}</h3>
                      <div className="p-3 bg-white/20 backdrop-blur-md rounded-full shadow-inner shadow-white/10">
                        {info.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white dark:bg-gray-900 relative">
                    {/* Animated gradient blob */}
                    <div className="absolute bottom-0 right-0 opacity-30 h-32 w-32 rounded-full blur-xl bg-gradient-to-r from-transparent via-blue-100 dark:via-blue-900 to-transparent"></div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-6 font-medium relative z-10">{info.description}</p>
                    
                    {info.link && (
                      <a 
                        href={info.link} 
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={`group inline-flex items-center text-sm font-medium bg-gradient-to-r ${info.gradientFrom} ${info.gradientTo} text-white py-2.5 px-5 rounded-full hover:shadow-lg ${info.shadowColor} transition-all duration-200`}
                      >
                        {info.linkText}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Additional contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Need more information? Check our <a href="#contact-faq" className="text-purple-600 dark:text-purple-400 font-medium hover:underline transition-colors">FAQs</a> or <a href="#contact-form" className="text-purple-600 dark:text-purple-400 font-medium hover:underline transition-colors">message us directly</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FloatingInfoCards; 