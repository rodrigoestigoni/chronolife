/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#22D3EE",
        highlight: "#F59E0B",
        background: "#F9FAFB",
        textmain: "#111827"
      }
    },
  },
  plugins: [],
}
