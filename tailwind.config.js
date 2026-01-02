/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.6' }],
        base: ['0.875rem', { lineHeight: '1.6' }],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            fontSize: '0.875rem',
            lineHeight: '1.6',
            color: '#374151',
            h1: {
              fontSize: '1.75rem',
              fontWeight: '600',
              lineHeight: '1.3',
              marginTop: '0',
              marginBottom: '1rem',
              color: '#111827',
            },
            h2: {
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '1.3',
              marginTop: '2rem',
              marginBottom: '0.75rem',
              color: '#111827',
            },
            h3: {
              fontSize: '1.25rem',
              fontWeight: '600',
              lineHeight: '1.4',
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              color: '#111827',
            },
            h4: {
              fontSize: '1.125rem',
              fontWeight: '600',
              lineHeight: '1.4',
              marginTop: '1.25rem',
              marginBottom: '0.5rem',
            },
            p: {
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
            },
            a: {
              color: '#2563eb',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: '#1d4ed8',
                textDecoration: 'underline',
              },
            },
            code: {
              color: '#dc2626',
              backgroundColor: '#f3f4f6',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
              fontSize: '0.8125rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1e293b',
              color: '#e2e8f0',
              fontSize: '0.8125rem',
              padding: '0.75rem',
            },
            ul: {
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
              paddingLeft: '1.25rem',
            },
            li: {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            },
            table: {
              fontSize: '0.875rem',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

