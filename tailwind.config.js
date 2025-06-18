/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				// AI-Tech theme colors
				'neon-green': '#00FF00',
				'dark-bg': '#1E1E1E',
				'medium-gray': '#808080',
				'tech-white': '#FFFFFF',
				'quantum-blue': '#00FFFF',
				'bitcoin-orange': '#F7931A',
				
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#00FF00',
					foreground: '#1E1E1E',
				},
				secondary: {
					DEFAULT: '#808080',
					foreground: '#FFFFFF',
				},
				accent: {
					DEFAULT: '#00FFFF',
					foreground: '#1E1E1E',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 5px #00FF00' },
					'50%': { boxShadow: '0 0 20px #00FF00, 0 0 30px #00FF00' }
				},
				'typing': {
					'from': { width: '0' },
					'to': { width: '100%' }
				},
				'blink': {
					'0%, 50%': { borderColor: 'transparent' },
					'51%, 100%': { borderColor: '#00FF00' }
				},
				'matrix': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100vh)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px #00FF00, inset 0 0 5px #00FF00',
						opacity: '1'
					},
					'50%': { 
						boxShadow: '0 0 25px #00FF00, inset 0 0 15px #00FF00',
						opacity: '0.8'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'typing': 'typing 3.5s steps(40, end)',
				'blink': 'blink 1s step-end infinite',
				'matrix': 'matrix 8s linear infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}