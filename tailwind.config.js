/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
      },
      colors: {
        primary: "#00ff85",
        dark: "#111827",
        secondary: "#ffcc00",
        "secondary-text": "#1e132e",
      },
    },
  },
  plugins: [],
};
