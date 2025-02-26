const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                'primary': '#3d5263',
                'secondary': '#f9c664',
                'accent': '#618eb5',
                'accent-dark': '#27333f'
            },
            fontFamily: {
                'sans': ['"Open Sans"', ...defaultTheme.fontFamily.sans],
                'inter': ['Inter'],
                'lato': ['Lato']
            }
        },
    },
    plugins: [],
};



