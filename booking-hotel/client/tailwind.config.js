/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        primary: "#FD6D3B",
        secondary: "#FFFFFF",
        black: "#000000",
        lightGray: "#F2F2F1",
        lightMode: {
          bg: "#FFFFFF",
          div: "#FFFFFF",
          divText: "#000000",
          h1: "#000000",
          input: "#FFFFFF",
          inputText: "#000000",
          href: "#F97316",
          btn: "#F97316",
          btnText: "#000000",
          btnHoverText: "#FFFFFF",
        },
        darkMode: {
          bg: "#505050",
          div: "#1F2937",
          divText: "#FFFFFF",
          h1: "#FFFFFF",
          input: "#374151",
          inputText: "#FFFFFF",
          href: "#FFFFFF",
          btn: "#F97316",
          btnText: "#FFFFFF",
          btnHoverText: "#000000",
        },
      },
    },
  },
  plugins: [],
};
