/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'mfe-search-',
  content: ["./projects/search/src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

