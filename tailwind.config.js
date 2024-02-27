/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: { // disable b/c component library to be integrated in 3rd-party apps
    preflight: false, // preflight over-rides browser defaults (e.g., for links, headers, etc)
  }
};
