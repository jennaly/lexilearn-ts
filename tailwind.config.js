/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "fredoka-one": ["Fredoka One", "cursive"],
      gaegu: ["Gaegu", "cursive"],
    },
  },
  daisyui: {
    themes: false,
  },
  plugins: [],
};
