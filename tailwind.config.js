/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: "#06070B",
        panel: "#111527",
        "panel-2": "#171D35",
        stroke: "rgba(255,255,255,0.08)",
        muted: "#95A0C6",
        text: "#F6F7FB",
        aqua: "#5FD3BC",
        warn: "#F2B868",
        danger: "#FF6C88",
        accent: "#7A6BFF",
        electric: "#3DA3FF"
      },
      boxShadow: {
        glow: "0px 16px 48px rgba(77, 93, 255, 0.18)"
      },
      borderRadius: {
        xl2: "28px"
      }
    }
  },
  plugins: []
};
