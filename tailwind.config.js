/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          light: '#FAF9F5',
          DEFAULT: '#F4F3EF',
          muted: '#EBEAE5',
          border: 'rgba(0, 0, 0, 0.08)',
        },
        onyx: {
          DEFAULT: '#0A0A0C',
          50: '#18181C',
          100: '#121215',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        accent: {
          orange: '#FF4D26', // Moisez marker scribble
          purple: '#7928CA', // Studio up button
          cyan: '#00F0FF',
          green: '#10B981', // Available indicator
        },
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 22s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
