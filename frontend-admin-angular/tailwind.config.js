/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#dc2626', // Keep for backward compat if needed, or replace usage later
                secondary: '#991b1b',

                // New Design System
                brand: {
                    dark: '#0f172a',    // Slate-900 (Sidebar)
                    primary: '#1d4ed8', // Blue-700 (Actions)
                    secondary: '#64748b', // Slate-500 (Muted)
                    bg: '#f9fafb',      // Gray-50 (Background)
                    surface: '#ffffff', // White (Cards)
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
