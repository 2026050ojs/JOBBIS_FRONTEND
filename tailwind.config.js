/** @type {import('tailwindcss').Config} */
export default {
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
      },
    },
  },
  plugins: [],
}

