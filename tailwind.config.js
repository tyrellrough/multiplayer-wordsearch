/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'wordSearch-green': '#03FA03B2',
      'wordSearch-yellow': '#F4F501B2',
      'wordSearch-orange': '#EE5A06B2',
      'wordSearch-red': '#F60607B2',
      'wordSearch-purple': '#7903F1B2',
      'wordSearch-darkBlue': '#0203EDB2',
      'wordSearch-blue': '#048BC2B2',
      'wordSearch-pink': '#F33A6AB2',
    },
    extend: {

    },
  },
  plugins: [],
}

