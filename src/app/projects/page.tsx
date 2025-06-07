'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Zap, Users, Briefcase, ChefHat, MessageCircle, Palette, Database, Star, Eye, Play, Sparkles, Search } from 'lucide-react'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'

const projects = [
  {
    id: 1,
    title: "Dingzz Marketing",
    subtitle: "Digital Marketing Agency",
    description: "A dynamic digital marketing agency specializing in brand development and website design. Dingzz Marketing offers tailored solutions to help businesses establish a strong online presence and connect with their target audience effectively.",
    longDescription: "Dingzz Marketing is a full-service digital marketing agency that provides unlimited marketing services for growing businesses. With a unique month-to-month model and no contracts, they offer comprehensive solutions including graphic design, web development, social media management, copywriting, and strategic planning. Their innovative approach combines creativity with data-driven strategies to deliver exceptional results for over 20,000 companies worldwide.",
    url: "https://www.dingzz.ca/",
    image: "/api/placeholder/600/400",
    category: "Marketing",
    technologies: ["React", "Next.js", "Tailwind CSS", "Node.js", "Analytics"],
    features: [
      "Unlimited marketing services",
      "No contracts or hourly rates", 
      "Full-stack creative team",
      "24/7 support and communication",
      "AI-powered content creation",
      "Multi-language support"
    ],
    stats: {
      clients: "20,000+",
      projects: "69,696",
      satisfaction: "98%"
    },
    icon: <Briefcase className="w-6 h-6" />,
    color: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    title: "Gehini",
    subtitle: "AI-Powered Chatbot Platform",
    description: "An innovative platform designed to revolutionize the way users interact with AI-driven chatbots. Gehini leverages cutting-edge technology to provide seamless and intuitive user experiences.",
    longDescription: "Gehini is an advanced AI chatbot platform that specializes in educational recommendations and intelligent conversation management. Built with modern AI technologies, it provides personalized assistance across multiple domains including education, customer service, and business automation. The platform features natural language processing, machine learning capabilities, and seamless integration with existing systems.",
    url: "http://gehini.nakibshaikh.com",
    image: "/api/placeholder/600/400",
    category: "AI/Technology",
    technologies: ["Python", "Flask", "TensorFlow", "React", "PostgreSQL"],
    features: [
      "Advanced AI conversation engine",
      "Educational recommendation system",
      "Multi-language support",
      "Real-time learning capabilities",
      "API integration ready",
      "Analytics dashboard"
    ],
    stats: {
      accuracy: "94%",
      languages: "40+",
      responses: "1M+"
    },
    icon: <MessageCircle className="w-6 h-6" />,
    color: "from-green-500 to-teal-600"
  },
  {
    id: 3,
    title: "Project 9",
    subtitle: "Minimalist Web Design",
    description: "A creative endeavor focusing on minimalist web design and user-centric interfaces. Project 9 exemplifies the fusion of aesthetics and functionality in modern web development.",
    longDescription: "Project 9 represents the pinnacle of minimalist design philosophy applied to web development. This project showcases clean, intuitive interfaces that prioritize user experience while maintaining visual appeal. It demonstrates advanced CSS techniques, responsive design principles, and modern JavaScript frameworks to create seamless digital experiences.",
    url: "http://9.nakibshaikh.com",
    image: "/api/placeholder/600/400",
    category: "Design",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    features: [
      "Minimalist design approach",
      "Responsive across all devices",
      "Optimized performance",
      "Accessibility compliant",
      "Modern animations",
      "Clean codebase"
    ],
    stats: {
      performance: "98/100",
      accessibility: "100/100",
      loadTime: "0.8s"
    },
    icon: <Palette className="w-6 h-6" />,
    color: "from-purple-500 to-pink-600"
  },
  {
    id: 4,
    title: "Biryani Hub",
    subtitle: "Culinary Experience Platform",
    description: "A culinary-themed project celebrating the rich flavors of biryani. This platform offers users an immersive experience into the world of this beloved dish, featuring recipes, history, and cultural significance.",
    longDescription: "Biryani Hub is a comprehensive culinary platform dedicated to the art and culture of biryani. It features authentic recipes from different regions, cooking techniques, ingredient guides, and the rich history behind this beloved dish. The platform includes interactive cooking tutorials, ingredient calculators, and a community section for food enthusiasts to share their experiences.",
    url: "http://biryani.nakibshaikh.com",
    image: "/api/placeholder/600/400",
    category: "Food & Culture",
    technologies: ["React", "Node.js", "MongoDB", "Express.js", "CSS3"],
    features: [
      "Authentic regional recipes",
      "Step-by-step cooking guides",
      "Ingredient calculator",
      "Cultural history sections",
      "Community recipe sharing",
      "Nutritional information"
    ],
    stats: {
      recipes: "150+",
      regions: "12",
      users: "5,000+"
    },
    icon: <ChefHat className="w-6 h-6" />,
    color: "from-orange-500 to-red-600"
  },
  {
    id: 5,
    title: "Howdy",
    subtitle: "Interactive Greeting Platform",
    description: "A welcoming platform designed to connect users through personalized greetings and messages. Howdy emphasizes user engagement through interactive and friendly interfaces.",
    longDescription: "Howdy is an innovative social platform that focuses on creating meaningful connections through personalized greetings and interactive messaging. The platform features customizable greeting cards, real-time messaging, and community features that bring people together in a warm, welcoming digital environment.",
    url: "http://howdy.nakibshaikh.com",
    image: "/api/placeholder/600/400",
    category: "Social",
    technologies: ["Vue.js", "Node.js", "Socket.io", "PostgreSQL", "Redis"],
    features: [
      "Personalized greeting system",
      "Real-time messaging",
      "Custom greeting cards",
      "Community features",
      "Multi-language greetings",
      "Social sharing integration"
    ],
    stats: {
      greetings: "10,000+",
      users: "2,500+",
      satisfaction: "96%"
    },
    icon: <Users className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-600"
  },
  {
    id: 6,
    title: "Momo",
    subtitle: "Food Ordering System",
    description: "An application centered around streamlining food ordering processes for momos. Momo integrates user-friendly features to enhance the culinary ordering experience.",
    longDescription: "Momo is a specialized food ordering platform designed specifically for momo restaurants and food trucks. It features an intuitive ordering system, real-time order tracking, payment integration, and inventory management for restaurant owners. The platform optimizes the entire food ordering workflow from menu browsing to delivery.",
    url: "http://momo.nakibshaikh.com",
    image: "/api/placeholder/600/400",
    category: "E-commerce",
    technologies: ["React", "Node.js", "Stripe API", "Firebase", "Google Maps API"],
    features: [
      "Streamlined ordering process",
      "Real-time order tracking",
      "Payment gateway integration",
      "Restaurant management dashboard",
      "Delivery optimization",
      "Customer reviews system"
    ],
    stats: {
      orders: "25,000+",
      restaurants: "50+",
      rating: "4.8/5"
    },
    icon: <ChefHat className="w-6 h-6" />,
    color: "from-red-500 to-pink-600"
  },
  {
    id: 7,
    title: "Momo 2.0",
    subtitle: "Enhanced Food Platform",
    description: "An upgraded version of the original Momo project, introducing enhanced functionalities and improved user interface. Momo 2.0 aims to provide a more efficient and enjoyable user experience.",
    longDescription: "Momo 2.0 represents a complete overhaul of the original food ordering platform with advanced features including AI-powered recommendations, multi-restaurant ordering, loyalty programs, and enhanced analytics. The platform now supports multiple cuisines while maintaining its focus on delivering exceptional user experiences.",
    url: "http://momo2.nakibshaikh.com",
    image: "/api/placeholder/600/400",
    category: "E-commerce",
    technologies: ["Next.js", "TypeScript", "GraphQL", "PostgreSQL", "Prisma"],
    features: [
      "AI-powered food recommendations",
      "Multi-restaurant ordering",
      "Loyalty rewards program",
      "Advanced analytics dashboard",
      "Social dining features",
      "Voice ordering capability"
    ],
    stats: {
      orders: "50,000+",
      restaurants: "100+",
      rating: "4.9/5"
    },
    icon: <Zap className="w-6 h-6" />,
    color: "from-indigo-500 to-purple-600"
  },
  {
    id: 9,
    title: "Biryani Guys",
    subtitle: "Halal Restaurant & Delivery",
    description: "Premium halal biryani restaurant offering authentic Indian and Pakistani cuisine with modern fusion elements. Features online ordering, delivery, and catering services with certified halal ingredients.",
    longDescription: "Biryani Guys serves a large variety of dishes that combine modern fusion cuisine with classic Halal Indian and Pakistani cuisine. Using only the best products and unique cooking oils that are lower in fat and cholesterol, every meal is expertly prepared by chefs with over 15 years of expertise. The platform features comprehensive online ordering, multiple delivery integrations, and premium catering services.",
    url: "https://biryaniguys.ca",
    image: "/api/placeholder/600/400",
    category: "Food & Culture",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Stripe API"],
    features: [
      "Online ordering system",
      "Multiple delivery platforms",
      "Catering services",
      "Halal certification",
      "Party trays and packages",
      "Mobile-responsive design"
    ],
    stats: {
      dishes: "50+",
      locations: "3+",
      rating: "4.8★"
    },
    icon: <ChefHat className="w-6 h-6" />,
    color: "from-orange-500 to-red-600"
  },
  {
    id: 8,
    title: "Personal Dashboard",
    subtitle: "Project Management Hub",
    description: "A centralized hub for managing and monitoring various projects and applications. This dashboard offers real-time analytics, project statuses, and streamlined access to essential tools.",
    longDescription: "The Personal Dashboard is a comprehensive project management and analytics platform that provides real-time insights into multiple projects and applications. It features customizable widgets, advanced reporting capabilities, team collaboration tools, and integration with various third-party services to create a unified workspace for productivity and project oversight.",
    url: "http://nakibshaikh.com/dashboard",
    image: "/api/placeholder/600/400",
    category: "Productivity",
    technologies: ["React", "TypeScript", "D3.js", "Node.js", "MongoDB", "WebSocket"],
    features: [
      "Real-time project analytics",
      "Customizable dashboard widgets",
      "Team collaboration tools",
      "Third-party integrations",
      "Advanced reporting system",
      "Mobile-responsive design"
    ],
    stats: {
      projects: "100+",
      users: "500+",
      uptime: "99.9%"
    },
    icon: <Database className="w-6 h-6" />,
    color: "from-cyan-500 to-blue-600"
  }
]

const categories = ["All", "Marketing", "AI/Technology", "Design", "Food & Culture", "Social", "E-commerce", "Productivity"]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <MainLayout>
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y, opacity }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/4 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/3 w-72 h-72 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Interactive Background Grid */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Interactive Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-500/40 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.2, 1],
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

        <div className="max-w-7xl mx-auto relative">
          {/* Hero Content */}
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Premium Badge with Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-200/30 dark:border-blue-800/30 mb-12 shadow-2xl"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <span className="text-base font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Premium Portfolio Showcase
                </span>
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Dynamic Main Title with Advanced Typography */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative mb-12"
              >
                <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black leading-none tracking-tight">
                  <motion.span 
                    className="block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent mb-4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    Our
                  </motion.span>
                  <motion.span 
                    className="block relative"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent relative z-10">
                      Projects
                    </span>
                    {/* Advanced Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-cyan-600/30 blur-3xl -z-10"
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        scale: [0.8, 1.1, 0.8],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    {/* Text Shadow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent opacity-20 blur-sm -z-5">
                      Projects
                    </div>
                  </motion.span>
                </h1>
              </motion.div>

              {/* Enhanced Subtitle with Better Typography */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="max-w-5xl mx-auto mb-16"
              >
                <p className="text-2xl md:text-3xl lg:text-4xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  Discover our{" "}
                  <motion.span 
                    className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    innovative solutions
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.5 }}
                    />
                  </motion.span>{" "}
                  spanning across multiple domains
                </p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mt-6 font-light"
                >
                  From AI-powered platforms to immersive digital experiences that drive real impact
                </motion.p>
              </motion.div>

              {/* Enhanced Stats with Interactive Elements */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="grid grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto mb-20"
              >
                {[
                  { number: "9+", label: "Projects", gradient: "from-blue-600 to-purple-600", delay: 0 },
                  { number: "6+", label: "Categories", gradient: "from-purple-600 to-cyan-600", delay: 0.1 },
                  { number: "100%", label: "Passion", gradient: "from-cyan-600 to-blue-600", delay: 0.2 }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.6 + stat.delay }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center group cursor-default"
                  >
                    <div className="relative">
                      <div className={`text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        {stat.number}
                      </div>
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
                      />
                    </div>
                    <div className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Call-to-Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
                  onClick={() => document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Explore Projects
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.button>
                
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-2xl font-semibold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 backdrop-blur-sm"
                >
                  Get In Touch
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="max-w-4xl mx-auto mb-16"
          >
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects, technologies, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`group relative px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  <span className="relative z-10">{category}</span>
                  {selectedCategory === category && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects-grid" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Showing <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredProjects.length}</span> of <span className="font-semibold">{projects.length}</span> projects
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchTerm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    bounce: 0.3
                  }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="group relative"
                >
                  {/* Main Card */}
                  <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3 border border-slate-200/50 dark:border-slate-700/50">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Hero Image Section */}
                    <div className="relative h-56 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                      </div>
                      
                      {/* Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg"
                        >
                          <div className="text-white text-3xl">
                            {project.icon}
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold border border-white/20">
                          {project.category}
                        </span>
                      </div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-400/30">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-green-100 text-xs font-medium">Live</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative p-8">
                      {/* Header */}
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                          {project.subtitle}
                        </p>
                      </div>
                      
                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                            className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 transition-colors cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div key={key} className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                            <div className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center justify-center gap-1">
                              {value}
                              {key === 'rating' && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium capitalize">
                              {key}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                          <Play className="w-4 h-4" />
                          Live Demo
                        </motion.a>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Link
                            href={`/projects/${project.id}`}
                            className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Link>
                        </motion.div>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 pointer-events-none rounded-3xl"
                    />
                    
                    {/* Border Glow */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 rounded-3xl border-2 border-blue-500/30 pointer-events-none"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-500 dark:text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">No projects found</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                Try adjusting your search terms or category filters to find what you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-3xl p-16 text-white overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-8 right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-8 left-8 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl animate-pulse" />
            
            <div className="relative text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 mb-8"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Let&apos;s Collaborate</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-6xl font-black mb-6 leading-tight"
              >
                Ready to Start Your{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Next Project?
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed"
              >
                Let&apos;s collaborate and bring your ideas to life with innovative solutions that make a real impact
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Get In Touch
                  <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:animate-ping" />
                </Link>
                
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Learn More About Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </MainLayout>
  )
}