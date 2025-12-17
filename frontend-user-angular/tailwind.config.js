/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#dc2626',
                secondary: '#991b1b',

                // New Design System
                brand: {
                    dark: '#111827',    // Gray-900
                    primary: '#0f766e', // Teal-700 (Professional Teal)
                    accent: '#0d9488',  // Teal-600
                    bg: '#f3f4f6',      // Gray-100 (Background)
                    surface: '#ffffff', // White
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
