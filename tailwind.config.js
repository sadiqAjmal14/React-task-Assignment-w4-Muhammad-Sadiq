/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1F2937',
        'gradient-start': '#4C51BF',
        'gradient-end': '#9F7AEA',
      },
      spacing: {
        '4.5': '1.125rem', // Adding custom spacing values
      },
    },
  },
  plugins: [],
}

