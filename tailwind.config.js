/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {},
  },
  plugins: [
    // ...
    require("@tailwindcss/aspect-ratio"),
    require("tw-elements/dist/plugin.cjs"),
  ],
};
