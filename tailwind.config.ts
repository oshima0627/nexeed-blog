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
          DEFAULT: "#D97706",
          dark: "#B45309",
          light: "#F59E0B",
        },
        claude: {
          orange: "#D97706",
          dark: "#92400E",
          light: "#FDE68A",
          bg: "#FFFBEB",
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
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Consolas",
          "Monaco",
          "monospace",
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            h1: {
              fontSize: '1.5rem',
              lineHeight: '2rem',
            },
            h2: {
              fontSize: '1.25rem',
              lineHeight: '1.75rem',
            },
            a: {
              color: '#D97706',
              '&:hover': {
                color: '#B45309',
              },
            },
            code: {
              color: '#D97706',
              backgroundColor: '#FEF3C7',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
              fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
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
        lg: {
          css: {
            h1: {
              fontSize: '1.75rem',
              lineHeight: '2.25rem',
            },
            h2: {
              fontSize: '1.5rem',
              lineHeight: '2rem',
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
