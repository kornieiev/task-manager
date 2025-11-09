/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Специальные шрифты для заголовков и акцентов
        merriweather: ["Merriweather", "serif"],
        audiowide: ["Audiowide", "sans-serif"],
        exo: ["Exo 2", "sans-serif"], // Альтернативное имя для Exo 2
        orbitron: ["Orbitron", "sans-serif"],
      },
      keyframes: {
        "pulse-custom": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "pulse-slow": "pulse-custom 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-fast": "pulse-custom 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
  corePlugins: {
    backdropFilter: true,
  },
};
