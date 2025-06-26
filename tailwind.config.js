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
    },
  },
  plugins: [],
}

