import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-manrope)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        wood: {
          50: '#FAF9F7',
          100: '#F2EFE9',
          200: '#E6E0D6',
          300: '#D1C4B5',
          400: '#B09E8C',
          500: '#8F7A66',
          600: '#6D5B4B',
          700: '#524338',
          800: '#3B3029',
          900: '#261F1A',
          950: '#0F0D0B',
        },
        accent: '#D96B1E',
        'accent-hover': '#E88B3D',
        'accent-glow': 'rgba(217, 107, 30, 0.4)',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, rgba(15,13,11,0.92) 0%, rgba(15,13,11,0.6) 50%, rgba(15,13,11,0.3) 100%)',
        'gradient-mesh': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(217,107,30,0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(217,107,30,0.08), transparent)',
      },
      boxShadow: {
        'glow': '0 0 60px -12px rgba(217, 107, 30, 0.35)',
        'glow-lg': '0 0 80px -16px rgba(217, 107, 30, 0.4)',
        'card': '0 4px 24px -4px rgba(38, 31, 26, 0.08), 0 8px 48px -12px rgba(38, 31, 26, 0.12)',
        'card-hover': '0 24px 48px -12px rgba(38, 31, 26, 0.18), 0 0 0 1px rgba(38, 31, 26, 0.04)',
        'inner-soft': 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
