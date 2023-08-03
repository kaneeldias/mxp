/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Lato', 'sans-serif'],
                'serif': ['Merriweather', 'serif'],
                'mono': ['Menlo', 'monospace'],
            },
            fontWeight: {
                'light': 300,
            },
            colors: {
                'aiesec-blue': '#037ef3'
            }
        },
    },
    plugins: []
}
