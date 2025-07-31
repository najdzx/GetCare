/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#434bb8',
        'light-blue': '#e8eaff',
        'dark-blue': '#363c96',
        'custom-gray': '#f5f5f7'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        '20px': '20px',
      },
    },
  },
  plugins: [],
}

