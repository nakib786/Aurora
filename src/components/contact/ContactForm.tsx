'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from '../animations/MotionComponents';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: true, amount: 0.2 });

  // 3D tilt effect
  const [tiltPosition, setTiltPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!formRef.current) return;
    
    const { left, top, width, height } = formRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    setTiltPosition({ x, y });
  };
  
  const handleMouseLeave = () => {
    setTiltPosition({ x: 0, y: 0 });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll just log the data
      console.log('Form submitted:', formData);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError('There was an error submitting the form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div id="contact-form" className="py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 opacity-20"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Colorful blobs */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur-3xl opacity-20"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl opacity-20"
      ></motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium mb-4 shadow-lg shadow-purple-500/20">
            Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              Send Us a Message
            </span>
            <motion.div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 80, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            ></motion.div>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a question or want to work with us? Send us a message and we&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        <div 
          className="max-w-3xl mx-auto perspective-1000"
          ref={formRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="contact-3d-card rounded-2xl shadow-2xl p-8 overflow-hidden relative"
            style={{
              transform: `rotateY(${tiltPosition.x * 5}deg) rotateX(${-tiltPosition.y * 5}deg)`,
              transition: 'transform 0.1s ease'
            }}
          >
            {/* Glassmorphism background */}
            <div className="absolute inset-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-gray-700/50 z-0"></div>
            
            {/* Animated gradient border */}
            <div className="absolute inset-0 p-[2px] rounded-2xl overflow-hidden z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-slow"></div>
            </div>
            
            <div className="relative z-10">
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-md border border-emerald-300/30 dark:border-emerald-700/30 rounded-lg text-emerald-800 dark:text-emerald-300"
                >
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-emerald-500/20 mr-3">
                      <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p>Your message has been sent successfully! We'll get back to you soon.</p>
                  </div>
                </motion.div>
              )}

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-gradient-to-r from-rose-500/20 to-red-500/20 backdrop-blur-md border border-rose-300/30 dark:border-rose-700/30 rounded-lg text-rose-800 dark:text-rose-300"
                >
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-rose-500/20 mr-3">
                      <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p>{submitError}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants} className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className={`w-full px-5 py-4 bg-white/5 rounded-xl backdrop-blur-sm border ${
                        errors.name 
                          ? 'border-rose-500/50 focus:border-rose-500' 
                          : 'border-white/10 focus:border-purple-500'
                      } placeholder-gray-400 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-rose-500 text-sm">{errors.name}</p>
                    )}
                    <div className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className={`w-full px-5 py-4 bg-white/5 rounded-xl backdrop-blur-sm border ${
                        errors.email 
                          ? 'border-rose-500/50 focus:border-rose-500' 
                          : 'border-white/10 focus:border-purple-500'
                      } placeholder-gray-400 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-rose-500 text-sm">{errors.email}</p>
                    )}
                    <div className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Phone (Optional)"
                      className="w-full px-5 py-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 placeholder-gray-400 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition duration-200"
                    />
                    <div className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 bg-white/5 rounded-xl backdrop-blur-sm border ${
                        errors.subject 
                          ? 'border-rose-500/50 focus:border-rose-500' 
                          : 'border-white/10 focus:border-purple-500'
                      } placeholder-gray-400 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200 appearance-none`}
                    >
                      <option value="" className="bg-white dark:bg-gray-800">Select a Subject</option>
                      <option value="General Inquiry" className="bg-white dark:bg-gray-800">General Inquiry</option>
                      <option value="Accounting Services" className="bg-white dark:bg-gray-800">Accounting Services</option>
                      <option value="Web Development" className="bg-white dark:bg-gray-800">Web Development</option>
                      <option value="Support" className="bg-white dark:bg-gray-800">Support</option>
                      <option value="Other" className="bg-white dark:bg-gray-800">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-rose-500 text-sm">{errors.subject}</p>
                    )}
                    <div className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="md:col-span-2 relative">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      className={`w-full px-5 py-4 bg-white/5 rounded-xl backdrop-blur-sm border ${
                        errors.message 
                          ? 'border-rose-500/50 focus:border-rose-500' 
                          : 'border-white/10 focus:border-purple-500'
                      } placeholder-gray-400 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200 resize-none`}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-rose-500 text-sm">{errors.message}</p>
                    )}
                    <div className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="md:col-span-2 flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 rounded-full text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:-translate-y-1 transition-all duration-200 group overflow-hidden"
                    >
                      {/* Background animation */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x"></span>
                      
                      {/* Shimmer effect */}
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-shimmer"></span>
                      
                      {/* Button content */}
                      <span className="relative flex items-center">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </span>
                    </button>
                  </motion.div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
        
        {/* Privacy note */}
        <motion.p 
          variants={itemVariants} 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8"
        >
          Your information is protected by our <a href="/privacy" className="text-purple-500 hover:text-purple-400 underline">Privacy Policy</a>
        </motion.p>
      </div>
    </div>
  );
};

export default ContactForm; 