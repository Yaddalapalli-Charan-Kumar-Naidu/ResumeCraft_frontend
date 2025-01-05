/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6B18f4",
        secondary: "#ff073a",
        accent: "#0ff0fc",
        background: "#1a1a2e",
        highlight: "#f5ff00",
      },
    },
  },
  plugins: [],
}

