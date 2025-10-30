/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // adjust to your file structure
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
