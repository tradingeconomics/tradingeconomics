/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
  plugins: [],
};
