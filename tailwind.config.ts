import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background system
        surface: {
          950: "#0a0b0d",
          900: "#0f1114",
          800: "#161a1f",
          700: "#1e2329",
          600: "#252d36",
        },
        // Primary text
        parchment: {
          50: "#faf8f4",
          100: "#f5f1e8",
          200: "#ebe3d0",
          300: "#d8ccb4",
          400: "#bfad90",
          500: "#a08d70",
        },
        // Emerald accent
        emerald: {
          950: "#021a0f",
          900: "#042d1a",
          800: "#074d2e",
          700: "#0a6e41",
          600: "#0d8f54",
          500: "#10a867",
          400: "#2ec47f",
          300: "#5dd49b",
        },
        // Champagne / gold premium accent
        champagne: {
          900: "#2a1f00",
          800: "#4d3800",
          700: "#7a5a00",
          600: "#a67c00",
          500: "#c89e2a",
          400: "#d4b050",
          300: "#e0c478",
          200: "#edd99e",
          100: "#f7eeca",
        },
        // Muted grays
        slate: {
          950: "#0c0d10",
          900: "#111318",
          800: "#1a1d24",
          700: "#242830",
          600: "#323742",
          500: "#464d5c",
          400: "#606878",
          300: "#848e9c",
          200: "#a8b0bc",
          100: "#cdd3dc",
          50: "#eceef2",
        },
      },
      fontFamily: {
        display: ["DM Serif Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        "display-2xl": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2rem, 4vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
        "42": "10.5rem",
        "section": "8rem",
        "section-sm": "5rem",
      },
      borderWidth: {
        "0.5": "0.5px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
        "line-draw": "lineDraw 1.5s ease-out forwards",
        "count-up": "countUp 2s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        lineDraw: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
