/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-reverse-slow': 'spin-reverse 6s linear infinite',
        'spotlight': 'spotlight 2s ease .75s 1 forwards',
        'pulse-glow': 'pulse-glow 2s infinite alternate',
      },
      boxShadow: {
        'glow': '0 0 15px 2px rgba(79, 70, 229, 0.7), 0 0 20px 4px rgba(168, 85, 247, 0.5)',
      },
      keyframes: {
        'spin-reverse': {
          to: { transform: 'rotate(-360deg)' },
        },
        spotlight: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.5) translateY(30px)',
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1) translateY(0)',
          },
        },
        'pulse-glow': {
          '0%': {
            boxShadow: '0 0 10px 2px rgba(79, 70, 229, 0.5), 0 0 15px 4px rgba(168, 85, 247, 0.3)',
          },
          '100%': {
            boxShadow: '0 0 20px 4px rgba(79, 70, 229, 0.8), 0 0 30px 8px rgba(168, 85, 247, 0.6)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dot-pattern': 'radial-gradient(circle, currentColor 1px, transparent 1px)',
        'circle-pattern': 'repeating-radial-gradient(rgba(0,0,0,0) 0, rgba(0,0,0,0) 3px, currentColor 3px, currentColor 4px)',
        'grid-pattern': 'linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-pattern': '20px 20px',
        'circle-pattern': '20px 20px',
        'grid-pattern': '40px 40px',
      },
    },
  },
  plugins: [],
}; 