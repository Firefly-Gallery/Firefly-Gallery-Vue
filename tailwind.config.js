/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark", "light",
      {
        dark_firefly: {
          "primary": "#6ee7b7",
          "secondary": "#fde047",
          "accent": "#76ABAE",
          "neutral": "#1f2937",
          "base-100": "#212625",
          "info": "#a3e635",
          "success": "#22c55e",
          "warning": "#fb923c",
          "error": "#ef4444",
        },
      },
    ],
  },
}