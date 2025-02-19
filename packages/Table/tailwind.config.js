const defaultTheme = require('tailwindcss/defaultTheme');
const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "../../node_modules/@heroui/theme/dist/components/(button|dropdown|slider).js"
    ],
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
                'roboto': ['Roboto']
            }
        },
    },
    plugins: [heroui()],
    corePlugins: { // disable b/c component library to be integrated in 3rd-party apps
        preflight: false, // preflight over-rides browser defaults (e.g., for links, headers, etc)
    }
};



