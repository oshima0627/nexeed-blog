import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E40AF",
          dark: "#1E3A8A",
        },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Hiragino Kaku Gothic ProN",
          "Yu Gothic",
          "sans-serif",
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            a: {
              color: '#1E40AF',
              '&:hover': {
                color: '#1E3A8A',
              },
            },
            code: {
              color: '#1E40AF',
              backgroundColor: '#F3F4F6',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1F2937',
              color: '#F9FAFB',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: 'inherit',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
