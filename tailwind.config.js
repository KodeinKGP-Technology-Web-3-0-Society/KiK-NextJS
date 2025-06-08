/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ], // make sure Tailwind scans your files
  theme: {
    extend: {
      screens: {
        "max-lg": { max: "1000px" },
        "max-md": { max: "900px" },
      },
      backgroundImage: {
        "fancy-radial":
          "radial-gradient(64.18% 64.18% at 71.16% 35.69%, #def9fa 0.89%, #bef3f5 17.23%, #9dedf0 42.04%, #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%)",
      },
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        "victor-mono": ["Victor Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
