/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      colors: {
        ink: {
          950: '#0E1420',
          900: '#141C2B',
          800: '#1D283B',
          700: '#2A374C',
          600: '#3D4C64',
          500: '#5A6B85',
          400: '#8593A8',
          300: '#B2BCCB',
          200: '#DCE1E9',
          100: '#EEF1F5',
          50: '#F6F8FA',
        },
        brand: {
          950: '#0A1F3D',
          900: '#0F2C56',
          800: '#153A70',
          700: '#1C4A8C',
          600: '#255BA8',
          500: '#3170C4',
          400: '#5B92DA',
          300: '#93B8E8',
          200: '#C5D8F2',
          100: '#E4EDFA',
          50: '#F2F6FC',
        },
        saffron: {
          600: '#B4650A',
          500: '#D9800F',
          400: '#F0972A',
          300: '#F6B667',
          100: '#FCEFDD',
        },
        signal: {
          positive: '#1A7F52',
          'positive-bg': '#E7F5EE',
          negative: '#C23B33',
          'negative-bg': '#FBEAE8',
          neutral: '#5A6B85',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(14, 20, 32, 0.04), 0 1px 8px rgba(14, 20, 32, 0.04)',
        raised: '0 4px 16px rgba(14, 20, 32, 0.08)',
      },
      borderRadius: {
        card: '10px',
      },
      fontSize: {
        'display-lg': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        kpi: ['1.875rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
    },
  },
  plugins: [],
};
