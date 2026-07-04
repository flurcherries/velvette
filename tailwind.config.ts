import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#f7e8eb',
        rosewater: '#f4d7dc',
        sage: '#dfe8d9',
        mint: '#e7f2e4',
        parchment: '#fcf7f2',
        ink: '#5a4d4f',
      },
      fontFamily: {
        sans: ['Laila', 'serif'],
        writing: ['EB Garamond', 'serif'],
      },
      boxShadow: {
        velvet: '0 15px 45px rgba(122, 92, 95, 0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config;
