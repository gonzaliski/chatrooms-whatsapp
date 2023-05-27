/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      animation: {
        "bounce-slow": "bounce 3s linear infinite",
        popup: "bounce 3s linear 1",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        wpp_chat: "url('../public/chat-bg.png')",
      },
      colors: {
        "wpp-green.100": "#111b21",
        "wpp-green.300": "#202c33",
        "wpp-green.300-darker": "##101a20",
        "wpp-darkblue": "#2A3942",
        "wpp-primary": "#00a884",
        "outgoing-bg": "#005c4b",
        "incoming-bg": "#202c33",
        "conversation-panel": "#0b141a",
      },
    },
  },
  plugins: [],
};
