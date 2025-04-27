'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from '../animations/MotionComponents';

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const serviceIcons = {
    accounting: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    taxation: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
      </svg>
    ),
    webdesign: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  };

  return (
    <footer className="relative overflow-hidden py-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
      
      {/* Animated background grid pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute -top-40 -right-20 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl"
        animate={{ 
          x: [0, 40, 0], 
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-20 w-72 h-72 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
        animate={{ 
          y: [0, -30, 0], 
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      
      {/* Content container */}
      <div className="container relative z-10 mx-auto px-4">
        {/* Footer top - services highlight */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-medium mb-4 shadow-lg shadow-blue-500/20">
              Professional Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Expertise You Can Trust
              </span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Accounting */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-700/60 backdrop-blur-sm border border-gray-700/50 shadow-xl"
            >
              <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30">
                {serviceIcons.accounting}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Accounting</h3>
              <p className="text-gray-300 mb-4">Expert financial management solutions to streamline your business operations.</p>
              <Link href="/accounting" className="group inline-flex items-center text-cyan-400 text-sm font-medium">
                Learn more 
                <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
            
            {/* Taxation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-700/60 backdrop-blur-sm border border-gray-700/50 shadow-xl"
            >
              <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30">
                {serviceIcons.taxation}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Taxation</h3>
              <p className="text-gray-300 mb-4">Strategic tax planning and preparation to maximize your financial benefits.</p>
              <Link href="/taxation" className="group inline-flex items-center text-purple-400 text-sm font-medium">
                Learn more 
                <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
            
            {/* Web Design */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-700/60 backdrop-blur-sm border border-gray-700/50 shadow-xl"
            >
              <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg shadow-pink-500/30">
                {serviceIcons.webdesign}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Web Design</h3>
              <p className="text-gray-300 mb-4">Cutting-edge web solutions to elevate your digital presence and reach.</p>
              <Link href="/webdesign" className="group inline-flex items-center text-pink-400 text-sm font-medium">
                Learn more 
                <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Main footer section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-10 border-t border-gray-800/50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-12 gap-x-8">
            {/* Company info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <div className="mr-3 h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">A</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Aurora N&N</h3>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-md">
                Your comprehensive business partner delivering exceptional accounting, taxation, and web design services. Our integrated approach ensures your business thrives in all aspects.
              </p>
              
              <div className="flex gap-4 mb-6">
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </motion.a>
                
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-400 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-700 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </motion.a>
                
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-400 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </motion.a>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700/70 backdrop-blur-sm border border-gray-700/50">
                <h4 className="font-semibold text-white mb-2">Subscribe to our newsletter</h4>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="flex-1 bg-gray-900/60 text-white text-sm rounded-lg px-4 py-2.5 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-shadow"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </motion.div>
            
            {/* Links columns */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-bold text-white mb-4">Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/accounting" className="group text-gray-300 hover:text-white transition-colors flex items-center">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 h-[3px] w-0 rounded mr-2 transition-all duration-300 group-hover:w-4"></span>
                    <span>Financial Accounting</span>
                  </Link>
                </li>
                <li>
                  <Link href="/taxation" className="group text-gray-300 hover:text-white transition-colors flex items-center">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 h-[3px] w-0 rounded mr-2 transition-all duration-300 group-hover:w-4"></span>
                    <span>Tax Planning</span>
                  </Link>
                </li>
                <li>
                  <Link href="/accounting" className="group text-gray-300 hover:text-white transition-colors flex items-center">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 h-[3px] w-0 rounded mr-2 transition-all duration-300 group-hover:w-4"></span>
                    <span>Financial Consulting</span>
                  </Link>
                </li>
                <li>
                  <Link href="/taxation" className="group text-gray-300 hover:text-white transition-colors flex items-center">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 h-[3px] w-0 rounded mr-2 transition-all duration-300 group-hover:w-4"></span>
                    <span>Business Tax</span>
                  </Link>
                </li>
                <li>
                  <Link href="/webdesign" className="group text-gray-300 hover:text-white transition-colors flex items-center">
                    <span className="bg-gradient-to-r from-pink-500 to-orange-500 h-[3px] w-0 rounded mr-2 transition-all duration-300 group-hover:w-4"></span>
                    <span>Web Development</span>
                  </Link>
                </li>
                <li>
                  <Link href="/webdesign" className="group text-gray-300 hover:text-white transition-colors flex items-center">
                    <span className="bg-gradient-to-r from-pink-500 to-orange-500 h-[3px] w-0 rounded mr-2 transition-all duration-300 group-hover:w-4"></span>
                    <span>UI/UX Design</span>
                  </Link>
                </li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-400 mt-0.5 mr-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <address className="not-italic text-gray-300">
                    123 Business Avenue<br />
                    New York, NY 10001<br />
                    United States
                  </address>
                </li>
                <li className="flex items-center">
                  <div className="flex-shrink-0 h-6 w-6 text-purple-400 mr-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-center">
                  <div className="flex-shrink-0 h-6 w-6 text-pink-400 mr-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <a href="mailto:info@aurora-nn.com" className="text-gray-300 hover:text-white transition-colors">
                    info@aurora-nn.com
                  </a>
                </li>
                <li className="pt-3">
                  <Link href="/contact" className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-shadow">
                    Contact Us
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Footer bottom */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm order-2 md:order-1 mt-4 md:mt-0">
            © {new Date().getFullYear()} Aurora N&N Business Solutions. All rights reserved.
          </p>
          
          <div className="flex space-x-6 order-1 md:order-2">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 