/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Use class-based dark mode
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#121212', // Main background color
        surface: '#1E1E1E', // For cards, modals, etc.
        surfaceHover: '#2A2A2A', // Hover state for surfaces
        primary: '#BB86FC', // Primary accent
        secondary: '#03DAC6', // Secondary accent
        error: '#CF6679', // Error color
        textPrimary: '#FFFFFF', // Primary text color
        textSecondary: '#B0B0B0', // Secondary text color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
