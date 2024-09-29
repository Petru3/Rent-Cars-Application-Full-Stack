/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'background-blue': '#306D99',
      },
      spacing: {
        '58': '58px',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'serif'],
      },
    },
  },
  plugins: [],
}
