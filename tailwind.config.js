/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
        extend: {
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                colors: {
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        burgundy: {
                                DEFAULT: '#8B1538',
                                dark: '#6B0F2A',
                                light: '#A91D45'
                        },
                        crimson: {
                                DEFAULT: '#C41E3A',
                                dark: '#9A0F2A',
                                light: '#E5234D'
                        },
                        gold: {
                                DEFAULT: '#D4AF37',
                                dark: '#B8941F',
                                light: '#E5C854'
                        },
                        deepBlue: {
                                DEFAULT: '#1a1a2e',
                                dark: '#0f0f1a',
                                light: '#25253d'
                        },
                        cream: '#F5F5DC',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        }
                },
                keyframes: {
                        'accordion-down': {
                                from: {
                                        height: '0'
                                },
                                to: {
                                        height: 'var(--radix-accordion-content-height)'
                                }
                        },
                        'accordion-up': {
                                from: {
                                        height: 'var(--radix-accordion-content-height)'
                                },
                                to: {
                                        height: '0'
                                }
                        },
                        'fade-in-up': {
                                '0%': {
                                        opacity: '0',
                                        transform: 'translateY(40px)'
                                },
                                '100%': {
                                        opacity: '1',
                                        transform: 'translateY(0)'
                                }
                        },
                        'fade-in': {
                                '0%': {
                                        opacity: '0'
                                },
                                '100%': {
                                        opacity: '1'
                                }
                        },
                        'slide-in-left': {
                                '0%': {
                                        opacity: '0',
                                        transform: 'translateX(-40px)'
                                },
                                '100%': {
                                        opacity: '1',
                                        transform: 'translateX(0)'
                                }
                        },
                        'slide-in-right': {
                                '0%': {
                                        opacity: '0',
                                        transform: 'translateX(40px)'
                                },
                                '100%': {
                                        opacity: '1',
                                        transform: 'translateX(0)'
                                }
                        },
                        'scale-in': {
                                '0%': {
                                        opacity: '0',
                                        transform: 'scale(0.9)'
                                },
                                '100%': {
                                        opacity: '1',
                                        transform: 'scale(1)'
                                }
                        }
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'fade-in-up': 'fade-in-up 0.8s ease-out',
                        'fade-in': 'fade-in 1s ease-out',
                        'slide-in-left': 'slide-in-left 0.8s ease-out',
                        'slide-in-right': 'slide-in-right 0.8s ease-out',
                        'scale-in': 'scale-in 0.6s ease-out'
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};