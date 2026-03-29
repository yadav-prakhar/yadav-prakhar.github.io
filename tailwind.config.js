/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./js/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Instrument Serif', 'Georgia', 'serif'],
        body: ['Source Serif 4', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        accent: {
          DEFAULT: '#00FF41',
          light: '#00AA30',
          dark: '#00DD38',
          50: '#f0fff0', 100: '#e0ffe0', 200: '#c0ffc0', 300: '#90ffa0', 400: '#60ff60',
          500: '#00FF41', 600: '#00DD38', 700: '#00AA30', 800: '#008825', 900: '#006620'
        },
        'accent-alt': {
          DEFAULT: '#FFB000',
          light: '#CC8800',
          dark: '#FFB000',
          50: '#fff8e0', 100: '#ffefc0', 200: '#ffe090', 300: '#ffd060', 400: '#ffc040',
          500: '#FFB000', 600: '#CC8C00', 700: '#996800', 800: '#664500', 900: '#332200'
        }
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.08)',
        glow: '0 0 20px rgba(0, 255, 65, 0.3)'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      }
    }
  },
  plugins: [],
}
