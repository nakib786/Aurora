/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-reverse-slow': 'spin-reverse 6s linear infinite',
        'spotlight': 'spotlight 2s ease .75s 1 forwards',
        'pulse-glow': 'pulse-glow 2s infinite alternate',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "float-delayed": "float 4s ease-in-out 1s infinite",
        "float-slow": "float 5s ease-in-out 0.5s infinite",
        "pulse": "pulse 2s ease-in-out infinite",
        "pulse-delayed": "pulse 2s ease-in-out 0.7s infinite",
        "pulse-slow": "pulse 3s ease-in-out 1.3s infinite",
        "twinkle": "twinkle 5s ease-in-out infinite"
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
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulse: {
          '0%, 100%': { opacity: 0.8 },
          '50%': { opacity: 0.4 }
        },
        twinkle: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 }
        }
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
  plugins: [require('tailwindcss-animate')],
}; 