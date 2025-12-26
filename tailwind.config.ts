import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Primary Blue - Main brand color (darker, more professional)
                'primary-blue': '#1e3a5f',
                'primary-blue-dark': '#152a45',
                'primary-blue-light': '#2d5a8a',

                // Accent colors
                'accent-blue': '#3b82f6',
                'accent-cyan': '#06b6d4',

                // Legacy tech-blue (for compatibility)
                'tech-blue': '#1e3a5f',
                'tech-blue-dark': '#152a45',
                'tech-blue-light': '#2d5a8a',

                // Bright Duolingo-inspired colors for CoerLingo
                'duo': {
                    'green': '#58cc02',
                    'green-light': '#89e219',
                    'green-dark': '#58a700',
                    'blue': '#1cb0f6',
                    'blue-light': '#49c0f8',
                    'blue-dark': '#1899d6',
                    'yellow': '#ffc800',
                    'yellow-light': '#ffde00',
                    'orange': '#ff9600',
                    'red': '#ff4b4b',
                    'purple': '#ce82ff',
                    'pink': '#ff86d0',
                },
                // Background colors - bright and friendly
                'bg': {
                    'primary': '#ffffff',
                    'secondary': '#f7f7f7',
                    'card': '#ffffff',
                    'dark': '#131f24',
                    'green': '#d7ffb8',
                    'blue': '#ddf4ff',
                    'yellow': '#fff4d4',
                    'purple': '#f3e8ff',
                },
                // Text colors
                'text': {
                    'primary': '#3c3c3c',
                    'secondary': '#777777',
                    'light': '#afafaf',
                }
            },
            fontFamily: {
                sans: ['DIN Round', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
            },
            animation: {
                'bounce-slow': 'bounce 2s infinite',
                'pulse-slow': 'pulse 3s infinite',
                'wiggle': 'wiggle 0.5s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'pop': 'pop 0.3s ease-out',
                'shake': 'shake 0.5s ease-in-out',
                'celebrate': 'celebrate 0.6s ease-out',
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                pop: {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '50%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-5px)' },
                    '75%': { transform: 'translateX(5px)' },
                },
                celebrate: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.2) rotate(5deg)' },
                    '100%': { transform: 'scale(1) rotate(0deg)' },
                },
            },
            borderRadius: {
                'xl': '16px',
                '2xl': '20px',
                '3xl': '24px',
                '4xl': '32px',
            },
            boxShadow: {
                'duo': '0 2px 0 0 #e5e5e5',
                'duo-green': '0 4px 0 0 #58a700',
                'duo-blue': '0 4px 0 0 #1899d6',
                'duo-yellow': '0 4px 0 0 #e5ac00',
                'duo-orange': '0 4px 0 0 #cd7900',
                'card': '0 2px 4px rgba(0,0,0,0.08)',
                'card-hover': '0 8px 24px rgba(0,0,0,0.12)',
            },
        },
    },
    plugins: [],
}
export default config
