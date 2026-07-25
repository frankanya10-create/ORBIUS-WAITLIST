import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FCFAF6",
          100: "#F4EFE4",
          200: "#EAE2D0",
          300: "#DCD1B7",
        },
        ink: {
          950: "#141310",
          800: "#242219",
          600: "#4A4738",
          400: "#847F6C",
        },
        lime: {
          300: "#DCFF66",
          400: "#CDF13C",
          500: "#B8DE1F",
        },
        lavender: {
          300: "#DCD1FF",
          400: "#C3B2FF",
          500: "#A991FF",
        },
        teal: {
          300: "#B9F0E8",
          400: "#8FE3D6",
          500: "#63D2C1",
        },
        coral: {
          300: "#FFD3C2",
          400: "#FFB199",
          500: "#FF8F6E",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        marker: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        marker: "marker 0.6s cubic-bezier(0.65,0,0.35,1) forwards",
        "spin-slow": "spin-slow 14s linear infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
