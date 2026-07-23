/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [
    require("nativewind/preset"),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D45B09",
        secondary: "#1E4620",
        background: "#FFFFFF",
        surface: "#0C0C0C",
        end: "#D82D2D",
      }
    },
  },
  plugins: [],
};