/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            h1: {
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
            },
            h2: {
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
            },
            h3: {
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
            },
            h4: {
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
            },
            p: {
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
            },
            li: {
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
            },
            a: {
              color: '#ffa896',
              '&:hover': {
                color: 'rgba(255, 168, 150, 0.8)',
              },
              fontFamily: 'Inter, sans-serif',
            },
            strong: {
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
            },
            code: {
              color: '#00ff66',
              backgroundColor: '#18181b',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
