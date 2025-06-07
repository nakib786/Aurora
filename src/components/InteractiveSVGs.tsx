'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface InteractiveSVGProps {
  projectId: number
  className?: string
}

interface SVGComponentProps {
  hoveredElement: string | null
  setHoveredElement: (element: string | null) => void
}

export const InteractiveSVG: React.FC<InteractiveSVGProps> = ({ projectId, className = "" }) => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)

  const svgComponents = {
    1: <DingzzMarketingSVG hoveredElement={hoveredElement} setHoveredElement={setHoveredElement} />,
    2: <GehiniAISVG hoveredElement={hoveredElement} setHoveredElement={setHoveredElement} />,
    3: <Project9SVG hoveredElement={hoveredElement} setHoveredElement={setHoveredElement} />,
    4: <BiryaniHubSVG hoveredElement={hoveredElement} setHoveredElement={setHoveredElement} />,
    5: <HowdySVG hoveredElement={hoveredElement} setHoveredElement={setHoveredElement} />,
    6: <MomoSVG hoveredElement={hoveredElement} setHoveredElement={setHoveredElement} />,
    7: <Momo2SVG hoveredElement={hoveredElement} setHoveredElement={setHoveredElement} />,
    8: <DashboardSVG hoveredElement={hoveredElement} setHoveredElement={setHoveredElement} />,
    9: <BiryaniGuysSVG hoveredElement={hoveredElement} setHoveredElement={setHoveredElement} />
  }

  return (
    <div className={`w-full h-full ${className}`}>
      {svgComponents[projectId as keyof typeof svgComponents] || <DefaultSVG />}
    </div>
  )
}

// Dingzz Marketing SVG
const DingzzMarketingSVG: React.FC<SVGComponentProps> = ({ hoveredElement, setHoveredElement }) => (
  <svg viewBox="0 0 800 600" className="w-full h-full">
    <defs>
      <linearGradient id="marketingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    
    <rect width="800" height="600" fill="url(#marketingGrad)" opacity="0.1" />
    
    <motion.rect
      x="50" y="50" width="700" height="500" rx="20"
      fill="white" stroke="#E5E7EB" strokeWidth="2"
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setHoveredElement('dashboard')}
      onHoverEnd={() => setHoveredElement(null)}
    />
    
    <rect x="70" y="70" width="660" height="60" fill="#F3F4F6" rx="10" />
    <text x="90" y="105" fill="#374151" fontSize="24" fontWeight="bold">Dingzz Marketing Dashboard</text>
    
    <motion.g
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHoveredElement('analytics')}
      onHoverEnd={() => setHoveredElement(null)}
    >
      <rect x="90" y="150" width="300" height="180" fill="#F9FAFB" stroke="#E5E7EB" rx="8" />
      <text x="110" y="175" fill="#6B7280" fontSize="14">Analytics Overview</text>
      
      {[0, 1, 2, 3, 4].map(i => (
        <motion.rect
          key={i}
          x={120 + i * 50} y={200 + (4 - i) * 20} width="30" height={20 + i * 20}
          fill="url(#marketingGrad)"
          initial={{ height: 0 }}
          animate={{ height: 20 + i * 20 }}
          transition={{ delay: i * 0.1 }}
        />
      ))}
    </motion.g>
    
    <motion.g
      whileHover={{ scale: 1.1 }}
      onHoverStart={() => setHoveredElement('social')}
      onHoverEnd={() => setHoveredElement(null)}
    >
      <rect x="420" y="150" width="300" height="180" fill="#F9FAFB" stroke="#E5E7EB" rx="8" />
      <text x="440" y="175" fill="#6B7280" fontSize="14">Social Media Management</text>
      
      <circle cx="470" cy="220" r="25" fill="#1877F2" />
      <circle cx="540" cy="220" r="25" fill="#1DA1F2" />
      <circle cx="610" cy="220" r="25" fill="#E4405F" />
      <circle cx="680" cy="220" r="25" fill="#0A66C2" />
    </motion.g>
    
    {hoveredElement && (
      <motion.text
        x="400" y="550"
        textAnchor="middle"
        fill="#6B7280"
        fontSize="16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {hoveredElement === 'dashboard' && 'Complete Marketing Dashboard'}
        {hoveredElement === 'analytics' && 'Real-time Analytics & Insights'}
        {hoveredElement === 'social' && 'Multi-platform Social Management'}
      </motion.text>
    )}
  </svg>
)

// Gehini AI SVG
const GehiniAISVG: React.FC<SVGComponentProps> = ({ hoveredElement, setHoveredElement }) => (
  <svg viewBox="0 0 800 600" className="w-full h-full">
    <defs>
      <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#14B8A6" />
      </linearGradient>
    </defs>
    
    <rect width="800" height="600" fill="url(#aiGrad)" opacity="0.1" />
    
    <motion.rect
      x="100" y="50" width="600" height="500" rx="20"
      fill="white" stroke="#E5E7EB" strokeWidth="2"
      whileHover={{ scale: 1.02 }}
    />
    
    <rect x="120" y="70" width="560" height="50" fill="#F3F4F6" rx="10" />
    <circle cx="150" cy="95" r="15" fill="url(#aiGrad)" />
    <text x="180" y="100" fill="#374151" fontSize="18" fontWeight="bold">Gehini AI Assistant</text>
    
    <motion.g
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHoveredElement('chat')}
      onHoverEnd={() => setHoveredElement(null)}
    >
      <rect x="400" y="150" width="260" height="40" fill="#3B82F6" rx="20" />
      <text x="420" y="175" fill="white" fontSize="14">Help me find a good course</text>
      
      <rect x="140" y="210" width="400" height="80" fill="#F3F4F6" rx="20" />
              <text x="160" y="235" fill="#374151" fontSize="14">I would be happy to help! Based on your interests,</text>
      <text x="160" y="255" fill="#374151" fontSize="14">here are some recommended courses:</text>
      <text x="160" y="275" fill="#374151" fontSize="14">• Machine Learning Fundamentals</text>
    </motion.g>
    
    <motion.g
      whileHover={{ scale: 1.1, rotate: 5 }}
      onHoverStart={() => setHoveredElement('brain')}
      onHoverEnd={() => setHoveredElement(null)}
    >
      <circle cx="400" cy="380" r="80" fill="none" stroke="url(#aiGrad)" strokeWidth="3" />
      
      {[0, 1, 2, 3, 4, 5].map(i => (
        <motion.circle
          key={i}
          cx={400 + Math.cos(i * Math.PI / 3) * 60}
          cy={380 + Math.sin(i * Math.PI / 3) * 60}
          r="8"
          fill="url(#aiGrad)"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
        />
      ))}
    </motion.g>
    
    {hoveredElement && (
      <motion.text
        x="400" y="570"
        textAnchor="middle"
        fill="#6B7280"
        fontSize="16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {hoveredElement === 'chat' && 'Intelligent Conversation Engine'}
        {hoveredElement === 'brain' && 'AI Neural Network Processing'}
      </motion.text>
    )}
  </svg>
)

// Project 9 SVG
const Project9SVG: React.FC<SVGComponentProps> = ({ hoveredElement, setHoveredElement }) => (
  <svg viewBox="0 0 800 600" className="w-full h-full">
    <defs>
      <linearGradient id="designGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    
    <rect width="800" height="600" fill="#FAFAFA" />
    
    <motion.g
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setHoveredElement('grid')}
      onHoverEnd={() => setHoveredElement(null)}
    >
      {[0, 1, 2, 3].map(i => (
        <motion.rect
          key={i}
          x={100 + i * 150} y="150" width="120" height="120"
          fill="white" stroke="#E5E7EB" strokeWidth="1" rx="8"
          whileHover={{ y: 140 }}
        />
      ))}
    </motion.g>
    
    <motion.g
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHoveredElement('typography')}
      onHoverEnd={() => setHoveredElement(null)}
    >
      <text x="400" y="100" textAnchor="middle" fill="#374151" fontSize="48" fontWeight="300">
        Minimal
      </text>
      <text x="400" y="350" textAnchor="middle" fill="#6B7280" fontSize="18" fontWeight="400">
        Clean • Modern • Functional
      </text>
    </motion.g>
    
    {hoveredElement && (
      <motion.text
        x="400" y="550"
        textAnchor="middle"
        fill="#6B7280"
        fontSize="16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {hoveredElement === 'grid' && 'Responsive Grid System'}
        {hoveredElement === 'typography' && 'Clean Typography Design'}
      </motion.text>
    )}
  </svg>
)

// Biryani Hub SVG
const BiryaniHubSVG: React.FC<SVGComponentProps> = ({ hoveredElement, setHoveredElement }) => (
  <svg viewBox="0 0 800 600" className="w-full h-full">
    <defs>
      <linearGradient id="recipeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#DC2626" />
      </linearGradient>
    </defs>
    
    <rect width="800" height="600" fill="url(#recipeGrad)" opacity="0.1" />
    
    <motion.rect
      x="50" y="50" width="700" height="500" rx="20"
      fill="white" stroke="#E5E7EB" strokeWidth="2"
      whileHover={{ scale: 1.02 }}
    />
    
    <rect x="70" y="70" width="660" height="60" fill="#FEF3C7" rx="10" />
    <text x="90" y="105" fill="#92400E" fontSize="24" fontWeight="bold">Biryani Hub - Recipe Collection</text>
    
    <motion.g
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHoveredElement('recipes')}
      onHoverEnd={() => setHoveredElement(null)}
    >
      {[0, 1, 2, 3, 4, 5].map(i => (
        <motion.g key={i}>
          <motion.rect 
            x={90 + (i % 3) * 200} 
            y={160 + Math.floor(i / 3) * 140} 
            width="180" 
            height="120" 
            fill="#FEF3C7" 
            stroke="#F59E0B" 
            strokeWidth="2" 
            rx="8"
            whileHover={{ y: 150 + Math.floor(i / 3) * 140 }}
          />
          <circle 
            cx={180 + (i % 3) * 200} 
            cy={200 + Math.floor(i / 3) * 140} 
            r="25" 
            fill="url(#recipeGrad)" 
          />
          <text 
            x={180 + (i % 3) * 200} 
            y={240 + Math.floor(i / 3) * 140} 
            textAnchor="middle" 
            fill="#92400E" 
            fontSize="12" 
            fontWeight="bold"
          >
            Recipe {i + 1}
          </text>
        </motion.g>
      ))}
    </motion.g>
    
    {hoveredElement && (
      <motion.text
        x="400" y="570"
        textAnchor="middle"
        fill="#6B7280"
        fontSize="16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {hoveredElement === 'recipes' && 'Authentic Regional Biryani Recipes'}
      </motion.text>
    )}
  </svg>
)

// Howdy SVG
const HowdySVG: React.FC<SVGComponentProps> = ({ hoveredElement, setHoveredElement }) => (
  <svg viewBox="0 0 800 600" className="w-full h-full">
    <defs>
      <linearGradient id="socialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    
    <rect width="800" height="600" fill="url(#socialGrad)" opacity="0.1" />
    
    <motion.rect
      x="100" y="50" width="600" height="500" rx="20"
      fill="white" stroke="#E5E7EB" strokeWidth="2"
      whileHover={{ scale: 1.02 }}
    />
    
    <rect x="120" y="70" width="560" height="50" fill="#FEF3C7" rx="10" />
    <motion.text 
      x="400" y="100" textAnchor="middle" fill="#92400E" fontSize="28" fontWeight="bold"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      Howdy! 👋
    </motion.text>
    
    <motion.g
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHoveredElement('greetings')}
      onHoverEnd={() => setHoveredElement(null)}
    >
      {[0, 1, 2].map(i => (
        <motion.g key={i}>
          <motion.rect 
            x={140 + i * 160} 
            y="150" 
            width="140" 
            height="100" 
            fill="#FEF3C7" 
            stroke="#F59E0B" 
            strokeWidth="2" 
            rx="10"
            whileHover={{ y: 140, rotate: 2 }}
          />
          <text 
            x={210 + i * 160} 
            y="185" 
            textAnchor="middle" 
            fill="#92400E" 
            fontSize="14" 
            fontWeight="bold"
          >
            {['Good Morning!', 'Hello Friend!', 'Have a Great Day!'][i]}
          </text>
        </motion.g>
      ))}
    </motion.g>
    
    {hoveredElement && (
      <motion.text
        x="400" y="570"
        textAnchor="middle"
        fill="#6B7280"
        fontSize="16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {hoveredElement === 'greetings' && 'Personalized Greeting Cards'}
      </motion.text>
    )}
  </svg>
)

// Momo SVG
const MomoSVG: React.FC<SVGComponentProps> = ({ hoveredElement, setHoveredElement }) => (
  <svg viewBox="0 0 800 600" className="w-full h-full">
    <defs>
      <linearGradient id="foodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    
    <rect width="800" height="600" fill="url(#foodGrad)" opacity="0.1" />
    
    <motion.rect
      x="50" y="50" width="700" height="500" rx="20"
      fill="white" stroke="#E5E7EB" strokeWidth="2"
      whileHover={{ scale: 1.02 }}
    />
    
    <rect x="70" y="70" width="660" height="60" fill="#FEE2E2" rx="10" />
    <text x="90" y="105" fill="#DC2626" fontSize="24" fontWeight="bold">Momo - Food Ordering</text>
    
    <motion.g
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHoveredElement('menu')}
      onHoverEnd={() => setHoveredElement(null)}
    >
      {[0, 1, 2, 3].map(i => (
        <motion.g key={i}>
          <motion.rect 
            x={90 + (i % 2) * 300} 
            y={160 + Math.floor(i / 2) * 120} 
            width="280" 
            height="100" 
            fill="#FEE2E2" 
            stroke="#EF4444" 
            strokeWidth="2" 
            rx="10"
            whileHover={{ scale: 1.02 }}
          />
          
          <circle 
            cx={130 + (i % 2) * 300} 
            cy={200 + Math.floor(i / 2) * 120} 
            r="25" 
            fill="url(#foodGrad)" 
          />
          
          <text 
            x={180 + (i % 2) * 300} 
            y={195 + Math.floor(i / 2) * 120} 
            fill="#DC2626" 
            fontSize="14" 
            fontWeight="bold"
          >
            {['Chicken Momo', 'Veg Momo', 'Buff Momo', 'Fried Momo'][i]}
          </text>
          <text 
            x={180 + (i % 2) * 300} 
            y={215 + Math.floor(i / 2) * 120} 
            fill="#DC2626" 
            fontSize="12"
          >
            ${[12.99, 10.99, 14.99, 13.99][i]}
          </text>
        </motion.g>
      ))}
    </motion.g>
    
    {hoveredElement && (
      <motion.text
        x="400" y="570"
        textAnchor="middle"
        fill="#6B7280"
        fontSize="16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {hoveredElement === 'menu' && 'Delicious Momo Menu Selection'}
      </motion.text>
    )}
  </svg>
)

// Momo 2.0 SVG
const Momo2SVG: React.FC<SVGComponentProps> = ({ hoveredElement, setHoveredElement }) => (
  <svg viewBox="0 0 800 600" className="w-full h-full">
    <defs>
      <linearGradient id="enhancedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    
    <rect width="800" height="600" fill="url(#enhancedGrad)" opacity="0.1" />
    
    <motion.rect
      x="50" y="50" width="700" height="500" rx="20"
      fill="white" stroke="#E5E7EB" strokeWidth="2"
      whileHover={{ scale: 1.02 }}
    />
    
    <rect x="70" y="70" width="660" height="60" fill="#EDE9FE" rx="10" />
    <text x="90" y="105" fill="#6366F1" fontSize="24" fontWeight="bold">Momo 2.0 - AI-Powered Platform</text>
    
    <motion.g
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHoveredElement('ai')}
      onHoverEnd={() => setHoveredElement(null)}
    >
      <rect x="90" y="150" width="300" height="180" fill="#EDE9FE" stroke="#6366F1" strokeWidth="2" rx="10" />
      <text x="110" y="175" fill="#6366F1" fontSize="16" fontWeight="bold">AI Recommendations</text>
      
      <circle cx="240" cy="230" r="40" fill="none" stroke="url(#enhancedGrad)" strokeWidth="3" />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <motion.circle
          key={i}
          cx={240 + Math.cos(i * Math.PI / 3) * 30}
          cy={230 + Math.sin(i * Math.PI / 3) * 30}
          r="6"
          fill="url(#enhancedGrad)"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
        />
      ))}
    </motion.g>
    
    {hoveredElement && (
      <motion.text
        x="400" y="570"
        textAnchor="middle"
        fill="#6B7280"
        fontSize="16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {hoveredElement === 'ai' && 'AI-Powered Food Recommendations'}
      </motion.text>
    )}
  </svg>
)

// Dashboard SVG
const DashboardSVG: React.FC<SVGComponentProps> = ({ hoveredElement, setHoveredElement }) => (
  <svg viewBox="0 0 800 600" className="w-full h-full">
    <defs>
      <linearGradient id="dashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    
    <rect width="800" height="600" fill="url(#dashGrad)" opacity="0.1" />
    
    <motion.rect
      x="50" y="50" width="700" height="500" rx="20"
      fill="white" stroke="#E5E7EB" strokeWidth="2"
      whileHover={{ scale: 1.02 }}
    />
    
    <rect x="70" y="70" width="660" height="60" fill="#ECFDF5" rx="10" />
    <text x="90" y="105" fill="#065F46" fontSize="24" fontWeight="bold">Personal Dashboard - Project Hub</text>
    
    <motion.g
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setHoveredElement('widgets')}
      onHoverEnd={() => setHoveredElement(null)}
    >
      {[0, 1, 2, 3].map(i => (
        <motion.g key={i}>
          <motion.rect 
            x={90 + (i % 2) * 300} 
            y={150 + Math.floor(i / 2) * 140} 
            width="280" 
            height="120" 
            fill="#ECFDF5" 
            stroke="#10B981" 
            strokeWidth="2" 
            rx="10"
            whileHover={{ scale: 1.05, y: 140 + Math.floor(i / 2) * 140 }}
          />
          
          <text 
            x={110 + (i % 2) * 300} 
            y={175 + Math.floor(i / 2) * 140} 
            fill="#065F46" 
            fontSize="14" 
            fontWeight="bold"
          >
            {['Project Analytics', 'Team Collaboration', 'Real-time Monitoring', 'Performance Metrics'][i]}
          </text>
        </motion.g>
      ))}
    </motion.g>
    
    {hoveredElement && (
      <motion.text
        x="400" y="570"
        textAnchor="middle"
        fill="#6B7280"
        fontSize="16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {hoveredElement === 'widgets' && 'Customizable Dashboard Widgets'}
      </motion.text>
    )}
  </svg>
)

// Biryani Guys SVG
const BiryaniGuysSVG: React.FC<SVGComponentProps> = ({ hoveredElement, setHoveredElement }) => (
  <svg viewBox="0 0 800 600" className="w-full h-full">
    <defs>
      <linearGradient id="biryaniGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    
    <rect width="800" height="600" fill="url(#biryaniGrad)" opacity="0.1" />
    
    <motion.rect
      x="50" y="50" width="700" height="500" rx="20"
      fill="white" stroke="#E5E7EB" strokeWidth="2"
      whileHover={{ scale: 1.02 }}
    />
    
    <rect x="70" y="70" width="660" height="60" fill="#FEF3C7" rx="10" />
    <text x="90" y="105" fill="#92400E" fontSize="24" fontWeight="bold">Biryani Guys - Order Online</text>
    
    <motion.g
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHoveredElement('menu')}
      onHoverEnd={() => setHoveredElement(null)}
    >
      <ellipse cx="200" cy="250" rx="80" ry="40" fill="#8B4513" />
      <ellipse cx="200" cy="240" rx="80" ry="40" fill="#D2691E" />
      <ellipse cx="200" cy="230" rx="75" ry="35" fill="#F4A460" />
      
      {[0, 1, 2].map(i => (
        <motion.path
          key={i}
          d={`M ${180 + i * 20} 200 Q ${185 + i * 20} 180 ${190 + i * 20} 200 Q ${195 + i * 20} 180 ${200 + i * 20} 200`}
          stroke="#E5E7EB"
          strokeWidth="3"
          fill="none"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
        />
      ))}
      
      <text x="200" y="320" textAnchor="middle" fill="#92400E" fontSize="16" fontWeight="bold">
        Chicken Biryani - $16.99
      </text>
    </motion.g>
    
    <motion.g
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHoveredElement('tracking')}
      onHoverEnd={() => setHoveredElement(null)}
    >
      <rect x="400" y="180" width="300" height="200" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" rx="10" />
      <text x="420" y="205" fill="#92400E" fontSize="16" fontWeight="bold">Order Status</text>
      
             {['Order Placed', 'Preparing', 'Out for Delivery'].map((step, i) => (
         <motion.g key={i}>
           <motion.circle 
             cx={450 + i * 80} 
             cy="250" 
             r="12" 
             fill={i <= 1 ? "url(#biryaniGrad)" : "#E5E7EB"}
           />
           <text 
             x={450 + i * 80} 
             y="270" 
             textAnchor="middle" 
             fill="#92400E" 
             fontSize="10"
           >
             {step}
           </text>
         </motion.g>
       ))}
    </motion.g>
    
    {hoveredElement && (
      <motion.text
        x="400" y="570"
        textAnchor="middle"
        fill="#6B7280"
        fontSize="16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {hoveredElement === 'menu' && 'Authentic Halal Biryani & Cuisine'}
        {hoveredElement === 'tracking' && 'Real-time Order Tracking'}
      </motion.text>
    )}
  </svg>
)

const DefaultSVG = () => (
  <svg viewBox="0 0 800 600" className="w-full h-full">
    <rect width="800" height="600" fill="#F3F4F6" />
    <text x="400" y="300" textAnchor="middle" fill="#6B7280" fontSize="24">
      Project Visualization
    </text>
  </svg>
) 