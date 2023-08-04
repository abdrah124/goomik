/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        light: {
          "0%": { filter: "brightness(100%)" },
          "50%": { filter: "brightness(130%)" },
          "100%": { filter: "brightness(100%)" },
        },
      },
      animation: {
        light: "light 3s ease-in-out infinite",
      },
      screens: {
        "[480]": "480px",
      },
    },
  },
  plugins: [],
};
