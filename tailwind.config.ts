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
        background: "#000000",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#D946EF", // Neon Purple
          hover: "#c026d3",
        },
        secondary: {
          DEFAULT: "#8B5CF6", // Blue/Indigo
          hover: "#7c3aed",
        },
        accent: {
          cyan: "#00EAFF",
          pink: "#DE3BD6",
        },
        card: {
          DEFAULT: "rgba(9, 9, 15, 0.5)",
          border: "rgba(255, 255, 255, 0.1)",
        }
      },
      fontFamily: {
        tektur: ['var(--font-tektur)', 'sans-serif'],
        satoshi: ['var(--font-satoshi)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(180deg, #000005 0%, #132A2C 100%)',
      },
      boxShadow: {
        'neon': '0px 0px 10px rgba(222, 59, 214, 0.4), 1px 0px 5px rgba(1, 92, 104, 0.4)',
      }
    },
  },
  plugins: [],
};
export default config;
