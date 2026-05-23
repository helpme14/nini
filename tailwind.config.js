export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fffaf5',
        blush: '#fce8ec',
        'blush-dark': '#f0c4cc',
        coffee: '#6f5c4d',
        'warm-gray': '#9b8b84',
        rose: '#e8a0a8',
        petal: '#fdf2f4',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        handwritten: ['Caveat', 'cursive'],
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%,100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      boxShadow: {
        glass: '0 8px 32px rgba(180,100,100,0.08)',
        warm: '0 6px 28px rgba(220,130,140,0.18)',
        glow: '0 0 50px rgba(255,182,193,0.4)',
        card: '0 2px 16px rgba(120,80,80,0.08)',
      },
    },
  },
}