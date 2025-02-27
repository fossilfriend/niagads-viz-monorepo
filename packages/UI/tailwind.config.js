const {heroui} = require("@heroui/theme");
/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    plugins: [heroui()],
};



