import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * Habits Studio theme. Colours map 1:1 to the CSS variables in src/index.css
 * so that both themes (Paper / Studio Night) come for free.
 */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "hsl(var(--paper))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          sunken: "hsl(var(--surface-sunken))",
        },
        ink: {
          DEFAULT: "hsl(var(--ink))",
          soft: "hsl(var(--ink-soft))",
          faint: "hsl(var(--ink-faint))",
        },
        line: {
          DEFAULT: "hsl(var(--line))",
          strong: "hsl(var(--line-strong))",
        },
        kelp: {
          DEFAULT: "hsl(var(--kelp))",
          hover: "hsl(var(--kelp-hover))",
          tint: "hsl(var(--kelp-tint))",
          on: "hsl(var(--on-kelp))",
        },
        volt: {
          DEFAULT: "hsl(var(--volt))",
          on: "hsl(var(--on-volt))",
        },
        clay: {
          DEFAULT: "hsl(var(--clay))",
          tint: "hsl(var(--clay-tint))",
        },
        ramp: {
          0: "hsl(var(--ramp-0))",
          1: "hsl(var(--ramp-1))",
          2: "hsl(var(--ramp-2))",
          3: "hsl(var(--ramp-3))",
          4: "hsl(var(--ramp-4))",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Iowan Old Style", "Georgia", "serif"],
        body: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Editorial display scale — tight leading, optical letter-spacing.
        "display-xl": ["clamp(2.75rem, 7vw, 5.25rem)", { lineHeight: "0.96", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 3.5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-sm": ["1.375rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 3px)",
        sm: "calc(var(--radius) - 6px)",
        xl: "calc(var(--radius) + 6px)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        lift: "var(--shadow-lift)",
      },
      maxWidth: {
        prose: "34rem",
      },
      keyframes: {
        "rise-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pop-mark": {
          "0%": { transform: "scale(0.6)", opacity: "0.4" },
          "60%": { transform: "scale(1.08)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "sheet-in": {
          from: { opacity: "0", transform: "translateY(16px) scale(0.985)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        drift: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "rise-in": "rise-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.5s ease-out both",
        "pop-mark": "pop-mark 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "sheet-in": "sheet-in 0.24s cubic-bezier(0.22, 1, 0.36, 1)",
        drift: "drift 38s linear infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
