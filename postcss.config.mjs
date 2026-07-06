/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {}, /* <--- THIS IS THE NEW MAGIC WORD */
    autoprefixer: {},
  },
};

export default config;