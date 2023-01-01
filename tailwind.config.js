/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/components/**/*.tsx',
    './src/pages/**/*.tsx'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        merriweather: "'Merriweather Sans', sans-serif",
      }    
    },
    boxShadow: {
      'sm': '2px 2px 2px 1px rgba(0, 0, 0, 0.2)'
    }
  },
  plugins: [],
}
