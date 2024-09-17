/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  darkMode: ['[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: '#222831',
        secondary: '#76ABAE',
        'gray-pure': '#EEEEEE',
        'primary-light': '#31363F'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
