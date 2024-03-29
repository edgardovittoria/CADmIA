/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navPrimaryColor': '#c4c4c4',
        'navSecondaryColor': '#696968',
        'cubeColor': '#420202',
        'shereColor': '#6b5d10',
        'cylinderColor': '#5e3507',
        'torusColor': '#06065e',
        'coneColor': '#065c06',
        'canvasPrimaryColor': '#d1d5db',
        'canvasSecondaryColor': '#ffffff',
        'modalBackground': 'linear-gradient(to bottom right, #1F2937, #a5763c)'
      },
    },
  },
  plugins: [require("daisyui")],
}