const colors = require('tailwindcss/colors')

module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}', // Inclui .js e .jsx para segurança
    ],
    theme: {
      extend: {
        colors: {
            ...colors
        },
      },
    },
    plugins: [],
  };