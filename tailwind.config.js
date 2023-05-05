/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
		colors: {
			BaseWhite: '#FFFFFF',

			Primary400: '#16B364',
			Primary300: '#3CCB7F',
			Primary200: '#AAF0C4',
			Primary100: '#EDFCF2',

			Typography400: '#26272B',
			Typography300: '#3F3F46',
			Typography200: '#A0A0AB',
			Typography100: '#F4F4F5',
			Typography000: '#E7E5E4',
			Typography001: '#FAFAF9',
			Typography002: '#1D2939',

			Error400: '#BC1B06',
			Error300: '#F04438',
			Error200: '#FDA29B',
			Error100: '#FFFBFA',

			Warning400: '#DC6803',
			Warning300: '#FDB022',
			Warning200: '#FEDF89',
			Warning100: '#FFFCF5',
		},
	},
	plugins: [],
};
