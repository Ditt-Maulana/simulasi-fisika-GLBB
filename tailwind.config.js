/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        space: {
          900: '#020617',
          800: '#0f172a',
        },
      },
      boxShadow: {
        glass: '0 20px 60px rgba(15, 23, 42, 0.65)',
      },
    },
  },
  plugins: [],
};
