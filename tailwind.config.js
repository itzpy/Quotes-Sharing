/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable 'class' strategy for dark mode
  theme: {
    extend: {
      colors: {
        // Custom colors that work well in both light and dark modes
        primary: {
          light: '#8B5CF6', // Purple in light mode
          dark: '#A78BFA'   // Lighter purple in dark mode
        },
      }
    },
  },
  plugins: [],
}
