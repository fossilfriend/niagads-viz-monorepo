/** @type {import('tailwindcss').Config} */
const {heroui} = require("@heroui/theme");

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "../../node_modules/@heroui/theme/dist/components/(button|dropdown|slider).js",
        "../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    plugins: [heroui()],
};



