'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from '../animations/MotionComponents';

interface FAQItem {
  question: string;
  answer: string;
  gradientFrom: string;
  gradientTo: string;
}

const faqData: FAQItem[] = [
  {
    question: "How can I contact your customer support team?",
    answer: "You can reach our customer support team by filling out the contact form above, emailing us at support@aurora.com, or calling our toll-free number at 1-800-AURORA-HELP during business hours (9am-5pm EST, Monday to Friday).",
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600"
  },
  {
    question: "What is the typical response time for inquiries?",
    answer: "We strive to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend calling our support line for immediate assistance.",
    gradientFrom: "from-indigo-500",
    gradientTo: "to-purple-600"
  },
  {
    question: "Do you offer consultations for new clients?",
    answer: "Yes, we offer free initial consultations for new clients. You can schedule a consultation by filling out the contact form and mentioning your interest in a consultation in the message field.",
    gradientFrom: "from-purple-500",
    gradientTo: "to-pink-600"
  },
  {
    question: "What services does Aurora offer?",
    answer: "Aurora offers a comprehensive range of services including web design, app development, digital marketing, branding solutions, and consulting services. Each service is tailored to meet the specific needs of our clients.",
    gradientFrom: "from-pink-500",
    gradientTo: "to-rose-600"
  },
  {
    question: "Where are your offices located?",
    answer: "Our main offices are located in San Francisco and New York. However, we serve clients globally and offer remote consultations for clients outside these locations.",
    gradientFrom: "from-rose-500",
    gradientTo: "to-orange-600"
  },
  {
    question: "Do you provide support after project completion?",
    answer: "Absolutely! We offer ongoing support and maintenance packages for all our completed projects. Our support team is available to address any issues or updates needed after your project goes live.",
    gradientFrom: "from-orange-500",
    gradientTo: "to-amber-600"
  }
];

const ContactFAQ: React.FC = () => {
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItemIndex(openItemIndex === index ? null : index);
  };

  return (
    <div id="contact-faq" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
            <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#fff"></circle>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-0 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-3xl"
        animate={{ 
          x: [0, 60, 0], 
          y: [0, 40, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-0 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
        animate={{ 
          x: [0, -60, 0], 
          y: [0, -40, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 25, 
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
          <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium mb-4 shadow-lg shadow-indigo-500/20">
            Support
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
              Frequently Asked Questions
            </span>
            <motion.div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 64, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            ></motion.div>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our services, support, and how we can help you.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-5">
            {faqData.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* FAQ item with gradient border */}
                <div className="relative p-[1px] rounded-xl overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradientFrom} ${item.gradientTo} opacity-30`}></div>
                  
                  {/* Glassmorphism background */}
                  <div className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden relative">
                    <button
                      className="flex justify-between items-center w-full px-6 py-5 text-left"
                      onClick={() => toggleItem(index)}
                    >
                      <h3 className="font-medium text-white text-lg flex items-center">
                        <div className={`mr-4 h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-r ${item.gradientFrom} ${item.gradientTo} text-white`}>
                          <span className="text-sm font-bold">{index + 1}</span>
                        </div>
                        {item.question}
                      </h3>
                      <div className={`flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-white/10 transition-transform duration-300 ${
                        openItemIndex === index ? 'rotate-180' : ''
                      }`}>
                        <svg
                          className="w-4 h-4 text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>
                    <AnimatePresence>
                      {openItemIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 text-gray-300 border-t border-white/5 pt-3 mt-2">
                            <div className="pl-12">
                              <p className="leading-relaxed">{item.answer}</p>
                              <div className="mt-4 flex">
                                <motion.button 
                                  className={`text-sm inline-flex items-center bg-gradient-to-r ${item.gradientFrom} ${item.gradientTo} text-white py-1.5 px-4 rounded-full font-medium hover:shadow-lg transition-all duration-200 group`}
                                  whileHover={{ y: -2 }}
                                  whileTap={{ y: 0 }}
                                >
                                  Learn more
                                  <svg className="ml-1.5 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-400">
              Still have questions? 
              <a href="#contact-form" className="ml-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium hover:underline">
                Contact our support team
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactFAQ; 