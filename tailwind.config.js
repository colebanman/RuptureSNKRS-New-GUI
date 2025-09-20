/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"
    ],
  },
  theme: {
    colors: {
      primary: '#1f232f',
      secondary: '#462645',
      secText:'#A9A9A9',
      white: colors.white,
      green: colors.green,
      secondary: '#5865f2',
      success:'#1cd17f',
      fail:'#fc5889',
      etc:'#2179fd',
      notification:'#61618C',
      test:"#ba86f6",
      lightWhite:"#D3D3D3",
      orange: {
        1000:'#dd7b00',
        900: '#ff9433',
        800: '#ffae48'
      },
      submit:"#ab6ffd",
      gray: {
        1000:'#2a2f3e',
        900: '#1f232f',
        800: '#1a1d26',
        700: '#25272b',
        600: '#202225',
        400: '#1b1e3a',
        300: '#1C1F29',
        200: '#585a5e',
        100: '#292938'
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}