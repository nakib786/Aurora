'use client';

import React from 'react';

const WebDesignScene: React.FC = () => {
  // Create deterministic star positions instead of random ones
  const stars = [
    { cx: 120, cy: 100, r: 1, opacity: 0.7 },
    { cx: 180, cy: 200, r: 1, opacity: 0.8 },
    { cx: 220, cy: 150, r: 1, opacity: 0.6 },
    { cx: 500, cy: 100, r: 1, opacity: 0.7 },
    { cx: 550, cy: 180, r: 1, opacity: 0.9 },
    { cx: 600, cy: 120, r: 1, opacity: 0.8 },
    { cx: 650, cy: 220, r: 1, opacity: 0.7 },
    { cx: 700, cy: 180, r: 1, opacity: 0.6 },
    { cx: 430, cy: 380, r: 1, opacity: 0.7 },
    { cx: 380, cy: 420, r: 1, opacity: 0.8 },
    { cx: 320, cy: 380, r: 1, opacity: 0.6 },
    { cx: 270, cy: 420, r: 1, opacity: 0.9 },
    { cx: 150, cy: 450, r: 1.5, opacity: 0.7 },
    { cx: 480, cy: 350, r: 1.5, opacity: 0.6 },
    { cx: 550, cy: 250, r: 1.5, opacity: 0.8 },
    { cx: 650, cy: 150, r: 1.5, opacity: 0.7 },
    { cx: 200, cy: 300, r: 1, opacity: 0.6 },
    { cx: 350, cy: 200, r: 1, opacity: 0.8 },
    { cx: 400, cy: 150, r: 1, opacity: 0.7 },
    { cx: 450, cy: 400, r: 1, opacity: 0.6 },
    { cx: 300, cy: 450, r: 1, opacity: 0.9 },
    { cx: 250, cy: 350, r: 1, opacity: 0.7 },
    { cx: 750, cy: 250, r: 1, opacity: 0.8 },
    { cx: 100, cy: 350, r: 1, opacity: 0.6 },
    { cx: 50, cy: 250, r: 1, opacity: 0.7 },
    { cx: 80, cy: 400, r: 1, opacity: 0.8 },
    { cx: 150, cy: 200, r: 1, opacity: 0.9 },
    { cx: 300, cy: 100, r: 1, opacity: 0.6 },
    { cx: 500, cy: 450, r: 1, opacity: 0.7 },
    { cx: 600, cy: 400, r: 1, opacity: 0.8 },
    { cx: 700, cy: 350, r: 1, opacity: 0.6 },
    { cx: 750, cy: 300, r: 1, opacity: 0.7 },
    { cx: 580, cy: 250, r: 1, opacity: 0.8 },
    { cx: 680, cy: 280, r: 1, opacity: 0.7 },
    { cx: 720, cy: 320, r: 1, opacity: 0.6 },
    { cx: 620, cy: 350, r: 1, opacity: 0.9 },
    { cx: 420, cy: 220, r: 1, opacity: 0.7 },
    { cx: 370, cy: 270, r: 1, opacity: 0.8 },
    { cx: 330, cy: 320, r: 1, opacity: 0.6 },
    { cx: 280, cy: 170, r: 1, opacity: 0.7 },
    { cx: 530, cy: 200, r: 1, opacity: 0.8 },
    { cx: 580, cy: 150, r: 1, opacity: 0.7 },
    { cx: 630, cy: 100, r: 1, opacity: 0.6 },
    { cx: 680, cy: 50, r: 1, opacity: 0.9 },
    { cx: 50, cy: 180, r: 1, opacity: 0.7 },
    { cx: 100, cy: 130, r: 1, opacity: 0.8 },
    { cx: 150, cy: 80, r: 1, opacity: 0.6 },
    { cx: 200, cy: 130, r: 1, opacity: 0.7 },
    { cx: 250, cy: 80, r: 1, opacity: 0.8 },
    { cx: 730, cy: 400, r: 1, opacity: 0.7 }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 800 600" 
        className="w-full h-full"
      >
        {/* Background */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Main background */}
        <rect width="800" height="600" fill="url(#bgGradient)" />
        
        {/* Grid lines */}
        <g opacity="0.1">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480, 510, 540, 570].map((y, i) => (
            <line 
              key={`h-${i}`} 
              x1="0" 
              y1={y} 
              x2="800" 
              y2={y} 
              stroke="#94a3b8" 
              strokeWidth="0.5" 
            />
          ))}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780].map((x, i) => (
            <line 
              key={`v-${i}`} 
              x1={x} 
              y1="0" 
              x2={x} 
              y2="600" 
              stroke="#94a3b8" 
              strokeWidth="0.5" 
            />
          ))}
        </g>
        
        {/* Decorative elements */}
        <circle cx="150" cy="150" r="80" fill="url(#blueGlow)" filter="url(#glow)" />
        <circle cx="650" cy="450" r="100" fill="url(#purpleGlow)" filter="url(#glow)" />
        
        {/* Modern Device Mockups */}
        <g transform="translate(200, 100)">
          {/* Desktop mockup */}
          <rect x="0" y="0" width="400" height="250" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <rect x="0" y="0" width="400" height="20" rx="8" fill="#334155" />
          <circle cx="10" cy="10" r="4" fill="#ef4444" />
          <circle cx="24" cy="10" r="4" fill="#f59e0b" />
          <circle cx="38" cy="10" r="4" fill="#10b981" />
          
          {/* Desktop content */}
          <rect x="20" y="40" width="140" height="16" rx="4" fill="#3b82f6" />
          <rect x="20" y="70" width="360" height="6" rx="3" fill="#64748b" />
          <rect x="20" y="85" width="320" height="6" rx="3" fill="#64748b" />
          <rect x="20" y="100" width="340" height="6" rx="3" fill="#64748b" />
          
          <rect x="20" y="130" width="100" height="30" rx="6" fill="#3b82f6" />
          <rect x="130" y="130" width="100" height="30" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          
          <rect x="240" y="40" width="140" height="120" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" opacity="0.7" />
          
          {/* Tablet mockup */}
          <g transform="translate(50, 280)">
            <rect x="0" y="0" width="150" height="200" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1.5" />
            <rect x="5" y="10" width="140" height="180" rx="2" fill="#0f172a" />
            <rect x="65" y="5" width="20" height="3" rx="1.5" fill="#475569" />
            <circle cx="75" cy="195" r="7" fill="#334155" stroke="#8b5cf6" strokeWidth="0.5" />
            
            {/* Tablet content */}
            <rect x="20" y="25" width="110" height="10" rx="5" fill="#8b5cf6" />
            <rect x="20" y="45" width="110" height="4" rx="2" fill="#64748b" />
            <rect x="20" y="55" width="90" height="4" rx="2" fill="#64748b" />
            <rect x="20" y="75" width="70" height="20" rx="4" fill="#8b5cf6" />
            <rect x="20" y="105" width="110" height="60" rx="4" fill="#1e293b" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.7" />
          </g>
          
          {/* Mobile mockup */}
          <g transform="translate(250, 290)">
            <rect x="0" y="0" width="80" height="170" rx="12" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
            <rect x="5" y="10" width="70" height="150" rx="8" fill="#0f172a" />
            <rect x="30" y="5" width="20" height="3" rx="1.5" fill="#475569" />
            <circle cx="40" cy="165" r="5" fill="#334155" stroke="#06b6d4" strokeWidth="0.5" />
            
            {/* Mobile content */}
            <rect x="15" y="20" width="50" height="8" rx="4" fill="#06b6d4" />
            <rect x="15" y="35" width="50" height="3" rx="1.5" fill="#64748b" />
            <rect x="15" y="42" width="40" height="3" rx="1.5" fill="#64748b" />
            <rect x="15" y="55" width="30" height="15" rx="3" fill="#06b6d4" />
            <rect x="15" y="80" width="50" height="70" rx="4" fill="#1e293b" stroke="#06b6d4" strokeWidth="0.5" opacity="0.7" />
          </g>
        </g>
        
        {/* Technology icons as simple shapes */}
        <g transform="translate(600, 200)">
          {/* React */}
          <circle cx="0" cy="0" r="15" fill="none" stroke="#61dafb" strokeWidth="2" />
          <circle cx="0" cy="0" r="5" fill="#61dafb" />
          <ellipse cx="0" cy="0" rx="30" ry="10" fill="none" stroke="#61dafb" strokeWidth="2" transform="rotate(30)" />
          <ellipse cx="0" cy="0" rx="30" ry="10" fill="none" stroke="#61dafb" strokeWidth="2" transform="rotate(90)" />
          <ellipse cx="0" cy="0" rx="30" ry="10" fill="none" stroke="#61dafb" strokeWidth="2" transform="rotate(150)" />
          
          {/* Next.js */}
          <g transform="translate(0, 100)">
            <rect x="-20" y="-15" width="40" height="30" rx="5" fill="none" stroke="#ffffff" strokeWidth="2" />
            <path d="M-10,-5 L0,5 L10,-5" fill="none" stroke="#ffffff" strokeWidth="2" />
          </g>
          
          {/* TailwindCSS */}
          <g transform="translate(0, 200)">
            <path d="M-20,-10 Q-10,-20 0,-10 Q10,-20 20,-10" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <path d="M-20,10 Q-10,0 0,10 Q10,0 20,10" fill="none" stroke="#38bdf8" strokeWidth="2" />
          </g>
        </g>
        
        {/* Decorative stars - using predefined positions instead of random */}
        {stars.map((star, i) => (
          <circle 
            key={i} 
            cx={star.cx} 
            cy={star.cy} 
            r={star.r} 
            fill="#f8fafc" 
            opacity={star.opacity} 
          />
        ))}
      </svg>
    </div>
  );
};

// Main ThreeScene component
const ThreeScene: React.FC = () => {
  return (
    <div className="w-full h-[70vh] relative overflow-hidden">
      <WebDesignScene />
    </div>
  );
};

export default ThreeScene; 