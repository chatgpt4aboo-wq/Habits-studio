import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "hsl(var(--void))",
          raised: "hsl(var(--void-raised))",
        },
        bone: {
          DEFAULT: "hsl(var(--bone))",
          sunken: "hsl(var(--bone-sunken))",
          soft: "hsl(var(--bone-soft))",
        },
        plate: "hsl(var(--plate))",
        ink: {
          DEFAULT: "hsl(var(--ink))",
          soft: "hsl(var(--ink-soft))",
          faint: "hsl(var(--ink-faint))",
        },
        signal: "hsl(var(--signal))",
        navy: "hsl(var(--navy))",
        line: {
          dark: "hsl(var(--line-dark))",
          light: "hsl(var(--line-light))",
        },
      },
      fontFamily: {
        // The same family at two widths: the marks a little narrower and
        // heavier, the reading text at its natural width.
        display: [
          ["Archivo Variable", "Archivo", "Helvetica Neue", "sans-serif"],
          { fontVariationSettings: '"wdth" 87' },
        ],
        body: ["Archivo Variable", "Archivo", "system-ui", "Helvetica Neue", "sans-serif"],
      },
      fontSize: {
        // The wordmark scale. Tight, heavy, and always letter-spaced up.
        "mark-xl": ["clamp(3rem, 11vw, 9rem)", { lineHeight: "0.9", letterSpacing: "0.02em" }],
        "mark-lg": ["clamp(2.25rem, 6vw, 4.5rem)", { lineHeight: "0.94", letterSpacing: "0.03em" }],
        "mark-md": ["clamp(1.75rem, 3.6vw, 2.75rem)", { lineHeight: "1", letterSpacing: "0.04em" }],
        "mark-sm": ["1.25rem", { lineHeight: "1.05", letterSpacing: "0.06em" }],
      },
      maxWidth: {
        prose: "36rem",
      },
      keyframes: {
        "rise-in": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        tape: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        sheen: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "rise-in": "rise-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.7s ease-out both",
        tape: "tape 44s linear infinite",
        sheen: "sheen 9s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
