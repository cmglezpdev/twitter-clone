/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "twitter-blue": "#1DA1F2",
        "twitter-dark": "#15202B",
        "modal": "#111111bd"
      },
      gridTemplateColumns: {
        "twitter": "1fr 2fr 1.5fr",
      },
      zIndex: {
        "inf": "999999"
      }
    },
  },
  plugins: [],
}