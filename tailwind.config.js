/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./../Proyecto Tienda Online/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        'max': '800px',
        'max-sub-1':'600px',
        'max-sub-2':'400px'
      }
    },
  },
  plugins: [ {
    tailwindcss: {},
    autoprefixer: {},
  }],
}

