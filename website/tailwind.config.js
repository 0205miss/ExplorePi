/** @type {import('tailwindcss').Config} */
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "nav-purple": "#8A2BE2",
        "nav-gold": "#F7B52C",
        "search-bar": "rgb(255,255,255,.1)",
      },
      backgroundImage: {
        border: "linear-gradient(to left, #743ad5, #d53a9d);",
      },
      backgroundSize: {
        "border-size": "100% 2px",
      },
      height: {
        explorer: "calc(100% - 8rem)",
        stream: "calc(100% - 4rem)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    addVariablesForColors,
    nextui({
      themes: {
        "purple-style": {
          colors: {
            primary: {
              100: "#D9D6FF",
              200: "#B4ADFF",
              300: "#8E84FF",
              400: "#7066FF",
              500: "#4033FF",
              600: "#2F25DB",
              700: "#2119B7",
              800: "#161093",
              900: "#0D097A",
              DEFAULT: "#4033FF",
            },
            success: {
              100: "#F1FCCF",
              200: "#DFF9A0",
              300: "#C3ED6E",
              400: "#A5DC48",
              500: "#7DC615",
              600: "#63AA0F",
              700: "#4D8E0A",
              800: "#387206",
              900: "#2A5F04",
              DEFAULT:"#7DC615",
            }
          },
        },
      },
    }),
  ],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}