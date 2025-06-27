/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b5998', // 연한 남색
          light: '#5b7bbd',   // 더 연한 남색
        },
        background: '#f8fafc', // 흰색 계열
        success: '#22c55e', // 초록
        warning: '#facc15', // 노랑
        info: '#0ea5e9',    // 파랑
        danger: '#ef4444',  // 빨강
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-up-delay': 'fadeInUp 0.8s ease-out 0.3s both',
        'wave-move': 'waveMove 3s ease-in-out',
        'wave-up-down': 'waveUpDown 4s ease-in-out',
        'border-glow': 'borderGlow 2s linear infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        waveMove: {
          '0%': { 
            transform: 'translateX(-50%) translateY(100%)'
          },
          '50%': { 
            transform: 'translateX(-25%) translateY(0%)'
          },
          '100%': { 
            transform: 'translateX(0%) translateY(-100%)'
          },
        },
        waveUpDown: {
          '0%': { 
            transform: 'translateY(100%)'
          },
          '25%': { 
            transform: 'translateY(0%)'
          },
          '50%': { 
            transform: 'translateY(-100%)'
          },
          '75%': { 
            transform: 'translateY(0%)'
          },
          '100%': { 
            transform: 'translateY(100%)'
          },
        },
        borderGlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}

