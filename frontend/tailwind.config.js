/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:{
          100: "#227B94",
          200: "#3bba9c",
          300: "#FBBC04",
          400: "#003366"
        }
      },
    },
  },
  plugins: [],
}