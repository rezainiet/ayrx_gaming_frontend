/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFA500', // Example primary color (orange)
        bg_color: '#F3F7FB',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans'],
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}