 /** @type {import('tailwindcss').Config} */
 export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDF8F3',
          100: '#F9EDE0',
          200: '#F3DDC6',
          300: '#EBC4A1',
          400: '#DFA678',
          500: '#D08B5A',
          600: '#BA7050',
          700: '#995844',
          800: '#7D483B',
          900: '#673E33',
        },
        ink: {
          50: '#F5F5F7',
          100: '#E8E8EC',
          200: '#D1D1D9',
          300: '#B1B1BE',
          400: '#9090A0',
          500: '#6E6E80',
          600: '#535363',
          700: '#43434F',
          800: '#38383F',
          900: '#2A2A32',
          950: '#1F1F24',
        },
        rose: {
          50: '#FDF2F4',
          100: '#FCE7EB',
          200: '#FBD0D9',
          300: '#F9AEC0',
          400: '#F47D9D',
          500: '#E84F7C',
          600: '#D03368',
          700: '#B02659',
          800: '#94224E',
          900: '#7D2146',
        },
        sage: {
          50: '#F4F7F4',
          100: '#E6EDE6',
          200: '#CEDCCF',
          300: '#A8C3AA',
          400: '#7CA681',
          500: '#5B8961',
          600: '#487050',
          700: '#3B5943',
          800: '#324A39',
          900: '#2A3E30',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};