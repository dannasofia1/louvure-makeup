/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#b44f4f',
        'primary-light': '#fca5a5',
        'secondary': '#3E2723',
        'background-light': '#fdf2f0',
        'background-dark': '#1d1515',
        'accent-gold': '#c9a96e',
      },
      fontFamily: {
        'display': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        'body': ['"Jost"', 'system-ui', 'sans-serif'],
        'sans': ['"Jost"', 'system-ui', 'sans-serif'],
        'serif': ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        floatUp: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.25, 1, 0.5, 1) both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'scale-in': 'scaleIn 0.35s cubic-bezier(0.25, 1, 0.5, 1) both',
        'gradient-shift': 'gradientShift 6s ease infinite',
        'float-up': 'floatUp 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
