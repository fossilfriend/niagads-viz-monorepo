/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                'primary': '#27333f',
                'secondary': '#f9c664',
            },
            fontFamily: {
                'sans': ['"Open Sans"', ...defaultTheme.fontFamily.sans],
                'inter': ['Inter']
            }
        },
    },
    plugins: [],
    corePlugins: { // disable b/c component library to be integrated in 3rd-party apps
        preflight: false, // preflight over-rides browser defaults (e.g., for links, headers, etc)
    }
};



