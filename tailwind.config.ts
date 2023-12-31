import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'instrument': ['Instrument Sans', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        'extra-tight': '-0.05em',
        'ultra-wide': '0.6em',
        'mega-wide': '1.8em',
      },
      lineHeight: {
        'tall': '5',
      },
    },
  },
  plugins: [],
}
export default config
