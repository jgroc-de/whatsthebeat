/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js}', './public/index.html', './templates/**/*'],
	theme: {
		colors: {
			lightOrange: '#f7e3d4',
			orange: '#fc7307',
			blue: '#55b9f3',
			yellow: '#fddc22',
			dark: '#342e09',
			lightGreen: '#90ee90',
		},
		extend: {
			boxShadow: {
				'lg': '5px 5px 11px #489dcf, -5px -5px 11px #62d5ff',
				'inner': 'inset 22px 22px 43px #489dcf, inset -22px -22px 43px #62d5ff'
			}
		},
	},
	plugins: [],
}
