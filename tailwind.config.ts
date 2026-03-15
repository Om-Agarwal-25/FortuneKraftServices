import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1628',
          light: '#1a3a5c',
          dark: '#060e1a',
        },
        gold: {
          DEFAULT: '#F0A500',
          light: '#FFD166',
          dark: '#c47f00',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-playfair)'],
      },
    },
  },
  plugins: [],
}

export default config
