export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./main.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        solara: {
          primary: '#706fd3',
          accent1: '#e55039',
          accent2: '#78e08f',
          border: '#82ccdd',
          bg: '#ced6e0',
          text1: '#57606f',
          text2: '#f1f2f6',
        }
      },
      borderRadius: {
        'solara': '7px',
      }
    }
  },
  plugins: [],
}
