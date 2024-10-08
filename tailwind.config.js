/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
    theme: {
        fontFamily: {
            sans: ["Inter", "sans-serif"],
            // sans: ["Graphik", "sans-serif"],
            // serif: ["Merriweather", "serif"],
        },
        extend: {},
    },
    plugins: [
        // ...
        require("@tailwindcss/aspect-ratio"),
        require("tw-elements/dist/plugin.cjs"),
        require("flowbite/plugin"), // add this line
    ],
};