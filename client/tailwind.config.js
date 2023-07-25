/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				primary: {
					default: "#68BF50",
					light: "#7BC766",
					dark: "#5EAB49",
				},
				secondary: {
					default: "#1C2533",
					light: "#1C1F1C",
					dark: "#121412",
				},
				common: {
					white: "#FFFFFF",
					white_d: "#F5F7FA",
					grey: "#ADB0AC",
					grey_l: "#B7BCB5",
					grey_d: "#9E9F9E",
					black: "#000000",
				},
				primary_default: "#68BF50",
				primary_50: "#DCF0D6",
				primary_100: "#CFEBC7",
				primary_200: "#B5E0AA",
				primary_300: "#9CD58C",
				primary_400: "#82CA6E",
				primary_500: "#68BF50",
				primary_600: "#4F9D3A",
				primary_700: "#3A742B",
				primary_800: "#264B1C",
				primary_900: "#11220C",
				secondary_50: "#C8CDC8",
				secondary_100: "#BDC3BD",
				secondary_200: "#CFD9E7",
				secondary_300: "#929C92",
				secondary_400: "#A5BAD3",
				secondary_500: "#7494BA",
				secondary_600: "#5377A2",
				secondary_700: "#344D6E",
				secondary_800: "#2E425D",
				secondary_900: "#1C2533",
				gradient_t: "#4F4A46",
				primary: "#68BF50",
				primary_l: "#7BC766",
				primary_d: "#5EAB49",
				highlight: "#B4DFA8",
				// secondary: "#171A17",
				secondary_l: "#1C1F1C",
				secondary_d: "#121412",
				white: "#FFFFFF",
				white_d: "#F5F7FA",
				grey: "#ADB0AC",
				grey_l: "#B7BCB5",
				grey_d: "#9E9F9E",
			},
			boxShadow: {
				idle: "rgba(104, 191, 80, 0.50) 0px 5px 8px",
				primary: "rgba(104, 191, 80, 0.50) 0px 5px 10px",
				double_border: "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
			},
		},
		daisyui: {
			themes: [
				{
					munchies: {
						primary: "#68BF50",
						"primary-focus": "#5EAB49",
						secondary: "#5377A2",
					},
				},
			],
		},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
