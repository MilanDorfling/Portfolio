// tailwind.config.js
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#22c55e", // Tailwind's lime-500
          dark: "#16a34a",
        },
        background: {
          DEFAULT: "#18181b",
          light: '#27272a',
        },
        foreground: {
          DEFAULT: '#f4f4f5',
          muted: '#a1a1aa', 
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["SF Mono", "monospace"],
      },
    },
  },
  plugins: [],
};