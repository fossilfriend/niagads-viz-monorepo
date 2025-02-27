const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    purge: {
        content: ['./src/**/*.{js,jsx,ts,tsx}']
    },
    plugins: [],
};



