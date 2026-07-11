/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        panel: 'var(--panel)',
        border: 'var(--border)',
        text: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
        },
        brand: {
          DEFAULT: 'var(--primary)',
          secondary: 'var(--secondary)',
          gradientStart: 'var(--primary)',
          gradientEnd: 'var(--secondary)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
      },
      borderRadius: {
        'apple-sm': '8px',
        'apple-md': '14px',
        'apple-lg': '18px',
        'apple-xl': '24px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': 'var(--shadow)',
        'glass': 'var(--glass-shadow)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
