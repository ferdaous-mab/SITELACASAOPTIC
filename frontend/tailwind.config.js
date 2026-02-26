


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        casa: {
          50: '#fff1f1',
          100: '#ffe6e6',
          200: '#ffc7c7',
          300: '#ffa3a3',
          400: '#ff6b6b',
          500: '#c1121f',
          600: '#a10f1a',
          700: '#7e0c14',
          800: '#5c080f',
          900: '#2b0408',
        },
        'casa-dark': '#0b0b0b',
        'casa-white': '#ffffff',
      },
    },
  },
  plugins: [],
}