/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        safari: {
          50:"#efe8e2",100:"#e6dacf",200:"#d4bfa9",300:"#c3a486",400:"#b38a67",
          500:"#9a6f4d",600:"#7b573e",700:"#5a3e2b",800:"#3e291c",900:"#24160f"
        },
        sand:{200:"#ecd8b8",300:"#e3c99a",400:"#d9b97b"}
      },
      fontFamily:{
        safari:['"Bowlby One SC"','system-ui','sans-serif'],
        body:['Inter','system-ui','sans-serif']
      }
    }
  },
  plugins: []
}
