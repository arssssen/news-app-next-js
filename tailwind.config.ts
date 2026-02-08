import type { Config } from 'tailwindcss';
import lineClamp from '@tailwindcss/line-clamp';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/shared/**/*.{ts,tsx}',
    './src/widgets/**/*.{ts,tsx}',
    './src/features/**/*.{ts,tsx}',
    './src/entities/**/*.{ts,tsx}',
    './src/processes/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#101214',
        paper: '#f7f6f3',
        sand: '#efece4',
        accent: '#2357ff',
        accentMuted: '#dae2ff',
        danger: '#d63b3b',
        success: '#0f9d58',
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'ui-sans-serif', 'system-ui'],
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 8px 24px rgba(16, 18, 20, 0.08)',
      },
    },
  },
  plugins: [lineClamp],
};

export default config;
