/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary_50: '#DCF0D6',
        primary_100: '#CFEBC7',
        primary_200: '#B5E0AA',
        primary_300: '#9CD58C',
        primary_400: '#82CA6E',
        primary_500: '#68BF50',
        primary_600: '#4F9D3A',
        primary_700: '#3A742B',
        primary_800: '#264B1C',
        primary_900: '#11220C',
        secondary_50: '#C8CDC8',
        secondary_100: '#BDC3BD',
        secondary_200: '#CFD9E7',
        secondary_300: '#929C92',
        secondary_400: '#A5BAD3',
        secondary_500: '#7494BA',
        secondary_600: '#5377A2',
        secondary_700: '#344D6E',
        secondary_800: '#2E425D',
        secondary_900: '#1C2533',
        gradient_t: '#4F4A46',
        primary: '#68BF50',
        primary_l: '#7BC766',
        primary_d: '#5EAB49',
        highlight: '#B4DFA8',
        secondary: '#171A17',
        secondary_l: '#1C1F1C',
        secondary_d: '#121412',
        white: '#FFFFFF',
        white_d: '#F5F7FA',
        grey: '#ADB0AC',
        grey_l: '#B7BCB5',
        grey_d: '#9E9F9E',
      },
      boxShadow: {
        idle: 'rgba(104, 191, 80, 0.50) 0px 5px 8px',
        primary: 'rgba(104, 191, 80, 0.50) 0px 5px 10px',
        double_border: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
    scale: {
      active: '99',
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    require('tailwind-scrollbar-hide'),
  ],
  addons: [],
};
