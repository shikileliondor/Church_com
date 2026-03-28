import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C0392B',
        secondary: '#2471A3',
        accent: '#D4AC0D',
        purple: '#7D3C98',
        dark: '#1A1A2E',
        light: '#FAFAFA',
      },
    },
  },
};

export default config;
