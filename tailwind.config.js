/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Águas profundas: o azul-marinho da logo
        mar: {
          950: '#060d19',
          900: '#0b1628',
          800: '#13223b',
          700: '#1d3152',
          600: '#2a4470',
          500: '#3d5d92',
        },
        // Latão de bordo: o cobre/dourado das ferragens e da âncora
        latao: {
          200: '#f3dcb8',
          300: '#e6bd84',
          400: '#d6a46a',
          500: '#c8945a',
          600: '#a87440',
          700: '#7e5530',
        },
        // Laranja sinalizador — a faixa da Fluyr X 850 e o colete salva-vidas
        sinal: {
          400: '#ff8640',
          500: '#f26a1b',
          600: '#d4560c',
        },
        // Lona de vela: os fundos claros
        lona: {
          50: '#fbf9f5',
          100: '#f4f0e8',
          200: '#e8e1d3',
          300: '#d5cab5',
        },
        nevoa: '#9fb0c8',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      opacity: Object.fromEntries(
        [...Array.from({ length: 21 }, (_, i) => i * 5), 8, 12, 15, 18, 22, 35, 45, 55, 65, 85, 88, 92]
          .sort((a, b) => a - b)
          .map((v) => [String(v), String(v / 100)]),
      ),
      keyframes: {
        mare: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-25%)' },
        },
        boia: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      animation: {
        mare: 'mare 14s ease-in-out infinite',
        boia: 'boia 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
