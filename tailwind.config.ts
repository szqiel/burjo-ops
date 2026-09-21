import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        burjo: {
          canvas: "#202120",
          surface: "#282927",
          surfaceSoft: "#242522",
          ink: "#F5F5F0",
          muted: "#A5A69F",
          quiet: "#777873",
          border: "#3A3B37",
          blue: "#35C3F6",
          yellow: "#FFE837",
          green: "#16A34A",
          text: "#F5F5F0",
        },
      },
      fontFamily: {
        sans: ["Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
        display: ["Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
