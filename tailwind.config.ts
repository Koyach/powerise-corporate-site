import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-violet': '#4C2A85',
        'rich-lavender': '#907AD6',
        'gold': '#FFD700',
        'charcoal': '#333333',
        'off-white': '#F0F0F0',
        'dark-slate': '#1A1A2E',
        'white-lilac': '#F8F7FC',
      },
      fontFamily: {
        // Use next/font provided CSS variables
        sans: ['var(--font-noto-sans-jp)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        jp: ['var(--font-noto-sans-jp)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
