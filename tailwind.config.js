/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./**/*.html", "./**/*.js"],
  theme: {
    extend: {
      colors: {
        "primary": "#3B82F6",
        "secondary": "#10B981",
        "accent": "#F59E0B",
        "background": "#050505",
        "surface": "#121212",
        "surface-hover": "#1E1E1E",
        "text-main": "#FAFAFA",
        "muted": "#A1A1AA",
      },
      fontFamily: {
        "headline": ["Outfit", "sans-serif"],
        "body": ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
