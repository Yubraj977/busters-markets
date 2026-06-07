import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#071A0E',
          900: '#1B4332',
          800: '#2D6A4F',
          700: '#40916C',
          600: '#52B788',
          500: '#74C69D',
          400: '#95D5B2',
          300: '#B7E4C7',
          200: '#D8F3DC',
          100: '#F0FFF4',
          50:  '#F7FFF9',
        },
        cream: '#FEFAE0',
        sage:  '#87A878',
        gold:  '#F4A261',
        ember: '#E63946',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%':     { transform: 'translateY(-12px) rotate(4deg)' },
          '66%':     { transform: 'translateY(-6px) rotate(-3deg)' },
        },
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to:   { transform: 'translateX(0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      animation: {
        float:           'float 7s ease-in-out infinite',
        'float-slow':    'float 10s ease-in-out infinite',
        ticker:          'ticker 35s linear infinite',
        'slide-in-right':'slide-in-right 0.3s ease-out',
        'fade-up':       'fade-up 0.5s ease-out forwards',
        shimmer:         'shimmer 2s linear infinite',
      },
      backgroundImage: {
        'hero-mesh': `
          radial-gradient(ellipse at 15% 60%, #2D6A4F 0%, transparent 55%),
          radial-gradient(ellipse at 80% 20%, #40916C 0%, transparent 45%),
          radial-gradient(ellipse at 60% 90%, #1B4332 0%, transparent 50%),
          linear-gradient(160deg, #0A1F14 0%, #1B4332 60%, #2D6A4F 100%)
        `,
      },
    },
  },
  plugins: [],
}
export default config
