'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowLeft, Code, Zap, Users, Briefcase, ChefHat, MessageCircle, Palette, Database, Star, Calendar, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import { InteractiveSVG } from '@/components/InteractiveSVGs'

const projects = [
  {
    id: 1,
    title: "Dingzz Marketing",
    subtitle: "Digital Marketing Agency",
    description: "A dynamic digital marketing agency specializing in brand development and website design. Dingzz Marketing offers tailored solutions to help businesses establish a strong online presence and connect with their target audience effectively.",
    longDescription: "Dingzz Marketing is a full-service digital marketing agency that provides unlimited marketing services for growing businesses. With a unique month-to-month model and no contracts, they offer comprehensive solutions including graphic design, web development, social media management, copywriting, and strategic planning. Their innovative approach combines creativity with data-driven strategies to deliver exceptional results for over 20,000 companies worldwide.",
    url: "https://www.dingzz.ca/",
    image: "/api/placeholder/800/600",
    category: "Marketing",
    technologies: ["WordPress", "Adobe Creative Suite", "Social Media APIs", "Analytics", "Webflow", "Figma"],
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
    color: "from-blue-500 to-purple-600",
    timeline: "2020 - Present",
    team: "15+ Specialists",
    challenges: [
      "Scaling unlimited services model",
      "Managing global client base",
      "Maintaining quality across all services"
    ],
    solutions: [
      "Implemented efficient workflow automation",
      "Built dedicated team coordination system",
      "Developed quality assurance protocols"
    ]
  },
  {
    id: 2,
    title: "Gehini",
    subtitle: "AI-Powered Chatbot Platform",
    description: "An innovative platform designed to revolutionize the way users interact with AI-driven chatbots. Gehini leverages cutting-edge technology to provide seamless and intuitive user experiences.",
    longDescription: "Gehini is an advanced AI chatbot platform that specializes in educational recommendations and intelligent conversation management. Built with modern AI technologies, it provides personalized assistance across multiple domains including education, customer service, and business automation. The platform features natural language processing, machine learning capabilities, and seamless integration with existing systems.",
    url: "http://gehini.nakibshaikh.com",
    image: "/api/placeholder/800/600",
    category: "AI/Technology",
    technologies: ["Python", "TensorFlow", "Natural Language Processing", "React", "Node.js", "MongoDB"],
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
    color: "from-green-500 to-teal-600",
    timeline: "2023 - Present",
    team: "8 AI Engineers",
    challenges: [
      "Training multilingual AI models",
      "Ensuring conversation accuracy",
      "Scaling to handle millions of requests"
    ],
    solutions: [
      "Implemented advanced NLP algorithms",
      "Built robust testing framework",
      "Designed scalable cloud architecture"
    ]
  },
  {
    id: 3,
    title: "Project 9",
    subtitle: "Minimalist Web Design",
    description: "A creative endeavor focusing on minimalist web design and user-centric interfaces. Project 9 exemplifies the fusion of aesthetics and functionality in modern web development.",
    longDescription: "Project 9 represents the pinnacle of minimalist design philosophy applied to web development. This project showcases clean, intuitive interfaces that prioritize user experience while maintaining visual appeal. It demonstrates advanced CSS techniques, responsive design principles, and modern JavaScript frameworks to create seamless digital experiences.",
    url: "http://9.nakibshaikh.com",
    image: "/api/placeholder/800/600",
    category: "Design",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "Figma", "Adobe XD"],
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
    color: "from-purple-500 to-pink-600",
    timeline: "2022 - 2023",
    team: "5 Designers",
    challenges: [
      "Balancing minimalism with functionality",
      "Ensuring cross-browser compatibility",
      "Maintaining design consistency"
    ],
    solutions: [
      "Developed comprehensive design system",
      "Implemented thorough testing protocols",
      "Created detailed style guidelines"
    ]
  },
  {
    id: 4,
    title: "Biryani Hub",
    subtitle: "Culinary Experience Platform",
    description: "A culinary-themed project celebrating the rich flavors of biryani. This platform offers users an immersive experience into the world of this beloved dish, featuring recipes, history, and cultural significance.",
    longDescription: "Biryani Hub is a comprehensive culinary platform dedicated to the art and culture of biryani. It features authentic recipes from different regions, cooking techniques, ingredient guides, and the rich history behind this beloved dish. The platform includes interactive cooking tutorials, ingredient calculators, and a community section for food enthusiasts to share their experiences.",
    url: "http://biryani.nakibshaikh.com",
    image: "/api/placeholder/800/600",
    category: "Food & Culture",
    technologies: ["React", "MongoDB", "Express.js", "Recipe APIs", "Stripe", "AWS S3"],
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
    color: "from-orange-500 to-red-600",
    timeline: "2021 - Present",
    team: "6 Food Experts",
    challenges: [
      "Authenticating traditional recipes",
      "Building engaged community",
      "Scaling content management"
    ],
    solutions: [
      "Partnered with regional chefs",
      "Implemented gamification features",
      "Built automated content pipeline"
    ]
  },
  {
    id: 5,
    title: "Howdy",
    subtitle: "Interactive Greeting Platform",
    description: "A welcoming platform designed to connect users through personalized greetings and messages. Howdy emphasizes user engagement through interactive and friendly interfaces.",
    longDescription: "Howdy is an innovative social platform that focuses on creating meaningful connections through personalized greetings and interactive messaging. The platform features customizable greeting cards, real-time messaging, and community features that bring people together in a warm, welcoming digital environment.",
    url: "http://howdy.nakibshaikh.com",
    image: "/api/placeholder/800/600",
    category: "Social",
    technologies: ["Vue.js", "Socket.io", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
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
    color: "from-yellow-500 to-orange-600",
    timeline: "2022 - Present",
    team: "4 Developers",
    challenges: [
      "Building real-time communication",
      "Ensuring message delivery",
      "Creating engaging user experience"
    ],
    solutions: [
      "Implemented WebSocket architecture",
      "Built redundant message queuing",
      "Designed intuitive user interface"
    ]
  },
  {
    id: 6,
    title: "Momo",
    subtitle: "Food Ordering System",
    description: "An application centered around streamlining food ordering processes for momos. Momo integrates user-friendly features to enhance the culinary ordering experience.",
    longDescription: "Momo is a specialized food ordering platform designed specifically for momo restaurants and food trucks. It features an intuitive ordering system, real-time order tracking, payment integration, and inventory management for restaurant owners. The platform optimizes the entire food ordering workflow from menu browsing to delivery.",
    url: "http://momo.nakibshaikh.com",
    image: "/api/placeholder/800/600",
    category: "E-commerce",
    technologies: ["React Native", "Stripe API", "Firebase", "Google Maps API", "Twilio", "SendGrid"],
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
    color: "from-red-500 to-pink-600",
    timeline: "2021 - 2022",
    team: "7 Developers",
    challenges: [
      "Optimizing delivery routes",
      "Managing real-time inventory",
      "Ensuring payment security"
    ],
    solutions: [
      "Implemented AI route optimization",
      "Built real-time sync system",
      "Integrated secure payment gateways"
    ]
  },
  {
    id: 7,
    title: "Momo 2.0",
    subtitle: "Enhanced Food Platform",
    description: "An upgraded version of the original Momo project, introducing enhanced functionalities and improved user interface. Momo 2.0 aims to provide a more efficient and enjoyable user experience.",
    longDescription: "Momo 2.0 represents a complete overhaul of the original food ordering platform with advanced features including AI-powered recommendations, multi-restaurant ordering, loyalty programs, and enhanced analytics. The platform now supports multiple cuisines while maintaining its focus on delivering exceptional user experiences.",
    url: "http://momo2.nakibshaikh.com",
    image: "/api/placeholder/800/600",
    category: "E-commerce",
    technologies: ["Next.js", "GraphQL", "PostgreSQL", "AI/ML APIs", "Microservices", "Docker"],
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
    color: "from-indigo-500 to-purple-600",
    timeline: "2023 - Present",
    team: "12 Engineers",
    challenges: [
      "Migrating from legacy system",
      "Implementing AI recommendations",
      "Scaling to multiple cuisines"
    ],
    solutions: [
      "Built gradual migration strategy",
      "Trained custom ML models",
      "Designed modular architecture"
    ]
  },
  {
    id: 8,
    title: "Personal Dashboard",
    subtitle: "Project Management Hub",
    description: "A centralized hub for managing and monitoring various projects and applications. This dashboard offers real-time analytics, project statuses, and streamlined access to essential tools.",
    longDescription: "The Personal Dashboard is a comprehensive project management and analytics platform that provides real-time insights into multiple projects and applications. It features customizable widgets, advanced reporting capabilities, team collaboration tools, and integration with various third-party services to create a unified workspace for productivity and project oversight.",
    url: "http://nakibshaikh.com/dashboard",
    image: "/api/placeholder/800/600",
    category: "Productivity",
    technologies: ["React", "D3.js", "Node.js", "MongoDB", "WebSocket", "Elasticsearch"],
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
    color: "from-cyan-500 to-blue-600",
    timeline: "2020 - Present",
    team: "10 Engineers",
    challenges: [
      "Handling real-time data streams",
      "Creating flexible widget system",
      "Ensuring high availability"
    ],
    solutions: [
      "Implemented event-driven architecture",
      "Built modular widget framework",
      "Designed redundant infrastructure"
    ]
  },
  {
    id: 9,
    title: "Biryani Guys",
    subtitle: "Halal Restaurant & Catering",
    description: "A premium halal restaurant specializing in authentic biryani and South Asian cuisine. Biryani Guys offers online ordering, delivery services, and comprehensive catering solutions for events and gatherings.",
    longDescription: "Biryani Guys is a modern halal restaurant that combines traditional South Asian flavors with contemporary dining experiences. The platform features an intuitive online ordering system, real-time order tracking, comprehensive catering services, and a loyalty program. With a focus on authentic recipes and premium ingredients, Biryani Guys has become a go-to destination for biryani enthusiasts and event catering.",
    url: "https://biryaniguys.ca",
    image: "/api/placeholder/800/600",
    category: "Food & Culture",
    technologies: ["React", "Next.js", "Stripe", "MongoDB", "Twilio", "Google Maps API"],
    features: [
      "Online ordering system",
      "Real-time order tracking",
      "Catering management",
      "Loyalty rewards program",
      "Multi-location support",
      "Mobile-optimized interface"
    ],
    stats: {
      orders: "15,000+",
      locations: "3",
      rating: "4.7/5"
    },
    icon: <ChefHat className="w-6 h-6" />,
    color: "from-amber-500 to-orange-600",
    timeline: "2022 - Present",
    team: "8 Specialists",
    challenges: [
      "Managing multi-location inventory",
      "Optimizing delivery logistics",
      "Scaling catering operations"
    ],
    solutions: [
      "Built centralized inventory system",
      "Implemented route optimization",
      "Developed catering workflow automation"
    ]
  }
]

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = parseInt(params.id as string)
  const project = projects.find(p => p.id === projectId)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <Link
            href="/projects"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <MainLayout>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${project.color} text-white`}>
                  {project.icon}
                </div>
                <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-md">
                  {project.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                {project.subtitle}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {project.longDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Live Site
                </Link>
                <button className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
                  <Code className="w-5 h-5" />
                  View Code
                </button>
              </div>
            </motion.div>

            {/* Interactive Project Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 p-6">
                <InteractiveSVG projectId={project.id} className="w-full h-96" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-2xl pointer-events-none" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-4 text-center"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Interactive project visualization - hover to explore features
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {Object.entries(project.stats).map(([key, value]) => (
              <div
                key={key}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg"
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 capitalize font-medium">
                  {key}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Technologies & Features */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Technologies */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <Code className="w-6 h-6" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 rounded-lg font-medium border border-blue-200 dark:border-blue-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <Star className="w-6 h-6" />
                  Key Features
                </h3>
                <div className="space-y-3">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Project Details */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <Calendar className="w-6 h-6" />
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Timeline</span>
                    <span className="font-medium text-gray-900 dark:text-white">{project.timeline}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Team Size</span>
                    <span className="font-medium text-gray-900 dark:text-white">{project.team}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 dark:text-gray-400">Category</span>
                    <span className="font-medium text-gray-900 dark:text-white">{project.category}</span>
                  </div>
                </div>
              </div>

              {/* Challenges & Solutions */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Challenges & Solutions
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3">Challenges</h4>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">Solutions</h4>
                    <ul className="space-y-2">
                      {project.solutions.map((solution, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Interested in Similar Work?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss how we can bring your vision to life with cutting-edge technology
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Start a Project
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all duration-300"
              >
                View More Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </MainLayout>
  )
}