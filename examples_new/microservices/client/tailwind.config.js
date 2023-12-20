/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0e0e0e',
        light: '#fdfdfd',
      },
      boxShadow: {
        blkSm: '2px 2px 6px rgba(0, 0, 0, 0.35), 3px 3px 6px rgba(0, 0, 0, 0.25)',
        blkLg: '6px 6px 10px rgba(0, 0, 0, 0.35), 8px 8px 10px rgba(0, 0, 0, 0.25)',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-4turn)' },
        },
        rotate1: {
          '0%': { transform: 'translate(0%, 0%) rotate(0turn)' },
          '25%': { transform: 'translate(0%, 285%) rotate(0.25turn)' },
          '50%': { transform: 'translate(-410%, 285%) rotate(0.5turn)' },
          '75%': { transform: 'translate(-410%, 0%) rotate(0.75turn)' },
          '100%': { transform: 'translate(0%, 0%) rotate(1turn)' },
        },
        rotate2: {
          '0%': { transform: 'translate(0%, 0%) rotate(-0turn)' },
          '25%': { transform: 'translate(0%, -285%) rotate(-0.25turn)' },
          '50%': { transform: 'translate(410%, -285%) rotate(-0.5turn)' },
          '75%': { transform: 'translate(410%, 0%) rotate(-0.75turn)' },
          '100%': { transform: 'translate(0%, 0%) rotate(-1turn)' },
        },
      },
      animation: {
        spin: 'spin 5s linear infinite',
        rotate1: 'rotate1 8s linear infinite',
        rotate2: 'rotate2 8s linear infinite',
      },
    },
  },
  plugins: [],
};
