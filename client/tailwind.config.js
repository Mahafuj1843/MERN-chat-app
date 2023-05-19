module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#0c7075","600":"#0c7075","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a"}
      }
    },
    screens:{
      'xs':'380px',
      sm:"480px",
      md:"768px",
      lg:"1023px",
      xl:"1280px",
    },
    fontFamily:{
      nunito:['Nunito', 'sans-serif']
    },
  },
  plugins: [require("daisyui")],
}

