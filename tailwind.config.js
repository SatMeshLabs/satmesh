/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#1E2028',
          200: '#23252F',
          300: '#2A2D39',
        },
        accent: {
          100: '#3B82F6',
          200: '#2563EB',
        },
      },
    },
  },
  plugins: [],
}