/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: "IBM Plex Sans",
    },
    extend: {
      colors: {
        MainDark: "#121212",
        DimeGray: "#5f5f5f",
        DarkGray: "#2f2f2f",
        MidnightGray: "#252525",
        CharcoalGray: "#2e2e2e",
        Crimson: "#ff3b5c",
        LightGrey: "#e8e8e8",
        Skyblue: "#5ba4e9",
        ButtercupYellow: "#face15",
      },
      backgroundImage: {
        /* GRADIENT-COLOR */
        primaryGradient: "linear-gradient(to right , #121212, #252525)",
      },
    },
  },
  plugins: [],
};
