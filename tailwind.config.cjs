/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      blue: '#0035E2',
      yellow: '#FAFF35',
      white: '#FAFAFA',
      black: '#010101',
      cyan: '#65FDFE',
      red: '#DD0101',
      orange: '#FD9801',
      pink: '#FF9997',
      transparent: '#00000000'
    },
    boxShadow: {
      lg: '0 7px 0 0'
    },
    fontFamily: {
      'VT323': 'VT323, monospace'
    }
  },
  plugins: [],
}