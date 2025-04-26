'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How can I contact your customer support team?",
    answer: "You can reach our customer support team by filling out the contact form above, emailing us at support@aurora.com, or calling our toll-free number at 1-800-AURORA-HELP during business hours (9am-5pm EST, Monday to Friday)."
  },
  {
    question: "What is the typical response time for inquiries?",
    answer: "We strive to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend calling our support line for immediate assistance."
  },
  {
    question: "Do you offer consultations for new clients?",
    answer: "Yes, we offer free initial consultations for new clients. You can schedule a consultation by filling out the contact form and mentioning your interest in a consultation in the message field."
  },
  {
    question: "What services does Aurora offer?",
    answer: "Aurora offers a comprehensive range of services including web design, app development, digital marketing, branding solutions, and consulting services. Each service is tailored to meet the specific needs of our clients."
  },
  {
    question: "Where are your offices located?",
    answer: "Our main offices are located in San Francisco and New York. However, we serve clients globally and offer remote consultations for clients outside these locations."
  },
  {
    question: "Do you provide support after project completion?",
    answer: "Absolutely! We offer ongoing support and maintenance packages for all our completed projects. Our support team is available to address any issues or updates needed after your project goes live."
  }
];

const ContactFAQ: React.FC = () => {
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItemIndex(openItemIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/40 border border-gray-700/50 rounded-lg overflow-hidden"
          >
            <button
              className="flex justify-between items-center w-full px-6 py-4 text-left"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium text-white">{item.question}</span>
              <svg
                className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${
                  openItemIndex === index ? 'transform rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <motion.div
              initial="collapsed"
              animate={openItemIndex === index ? "open" : "collapsed"}
              variants={{
                open: { height: "auto", opacity: 1 },
                collapsed: { height: 0, opacity: 0 }
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-4 text-gray-300">
                {item.answer}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContactFAQ; 