/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0a0a0a',
          raised: '#121212',
          overlay: '#1a1a1a',
          highlight: '#242424',
        },
        text: {
          primary: '#e8e8e8',
          secondary: '#8a8a8a',
          tertiary: '#5a5a5a',
        },
        subtle: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.15)',
          strong: 'rgba(255, 255, 255, 0.20)',
        },
        accent: {
          DEFAULT: '#e8793a',
          dim: '#c4632e',
          glow: 'rgba(232, 121, 58, 0.15)',
          text: '#f0a070',
        },
        // Feature card accent colors
        blue: {
          accent: '#3b82f6',
          glow: 'rgba(59, 130, 246, 0.15)',
        },
        purple: {
          accent: '#a855f7',
          glow: 'rgba(168, 85, 247, 0.15)',
        },
        emerald: {
          accent: '#10b981',
          glow: 'rgba(16, 185, 129, 0.15)',
        },
        cyan: {
          accent: '#06b6d4',
          glow: 'rgba(6, 182, 212, 0.15)',
        },
        rose: {
          accent: '#f43f5e',
          glow: 'rgba(244, 63, 94, 0.15)',
        },
        amber: {
          accent: '#f59e0b',
          glow: 'rgba(245, 158, 11, 0.15)',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        card: '8px',
        button: '6px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)',
        glow: '0 0 20px rgba(232, 121, 58, 0.15)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.15)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.15)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.15)',
        'glow-rose': '0 0 20px rgba(244, 63, 94, 0.15)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        borderGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
