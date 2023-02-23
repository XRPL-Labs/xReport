/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['proxima-nova', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
      },
      colors: {
        xAppBlue: {
          100: '#F3F5FF',
          900: '#0030CF'
        },
        xAppOrange: {
          100: '#FFFBF4',
          900: '#F8BF4C'
        },
        xAppGreen: {
          100: '#F3FDF9',
          900: '#3BDC96'
        },
        xAppRed: {
          100: '#FFF5F5',
          900: '#EB5757'
        },
      }
    },
    plugins: [],
  }
}