/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'hero-bg':"url(/hero-bg.png)",
        'reservation':"url(/reservation_bg.jpg)",
        'footer':"url(/footer_bg.svg)",
      },
      fontFamily:{
        "Playfair":[ "Playfair", ],
        "Manrope":[ "Manrope", ],
        "Outfit":[ "Outfit", ],
      }
    },
  },
  plugins: [],
}