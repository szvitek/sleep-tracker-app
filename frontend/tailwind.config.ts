import type { Config } from 'tailwindcss';
import tailwindForms from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [tailwindForms],
} satisfies Config;
