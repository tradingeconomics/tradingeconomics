/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      colors: {
        gray: '#EEEEEE',
        primary: '#222831',
        secondary: '#76ABAE',
        'primary-light': '#31363F'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
