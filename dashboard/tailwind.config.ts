import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#050608",
        panel: "#0B0F16",
        line: "#1B2433",
        cyan: "#00D4FF",
        indigo: "#5B5BFF",
        violet: "#B14EFF",
        online: "#00FF99",
        warn: "#FFD84D",
        err: "#FF4D6D",
        ink: "#F5F7FA",
        muted: "#8B97A8",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
        body: ["var(--font-body)"],
      },
      boxShadow: {
        "glow-cyan": "0 0 24px rgba(0,212,255,0.35)",
        "glow-indigo": "0 0 24px rgba(91,91,255,0.35)",
        "glow-violet": "0 0 24px rgba(177,78,255,0.35)",
        "glow-online": "0 0 12px rgba(0,255,153,0.55)",
        "glow-err": "0 0 12px rgba(255,77,109,0.55)",
      },
      animation: {
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
        "spin-slower": "spin 30s linear infinite reverse",
        scan: "scan 3s linear infinite",
        drift: "drift 6s ease-in-out infinite",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
