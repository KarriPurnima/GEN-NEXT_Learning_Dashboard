import type { Config } from "tailwindcss";

const config: Config = {
  // Only scan these paths to keep builds fast
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // ── Custom Color Palette ──────────────────────────────
      colors: {
        // Backgrounds
        bg: {
          base:    "#0a0a0f",   // Near-black base
          surface: "#111118",   // Tile/card surface
          elevated:"#16161f",   // Hover-elevated tile
          border:  "#1e1e2e",   // Subtle border
        },
        // Accent colors
        accent: {
          purple: "#7c3aed",    // Primary violet
          blue:   "#3b82f6",    // Secondary blue
          cyan:   "#06b6d4",    // Highlight cyan
          green:  "#10b981",    // Progress/success
          pink:   "#ec4899",    // Streak indicator
        },
        // Text colors
        text: {
          primary:   "#f1f5f9",
          secondary: "#94a3b8",
          muted:     "#475569",
        },
      },

      // ── Custom Font Sizes ─────────────────────────────────
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },

      // ── Background Gradients ──────────────────────────────
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "tile-glow":
          "radial-gradient(ellipse at top left, rgba(124,58,237,0.08) 0%, transparent 60%)",
        "hero-gradient":
          "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.08) 100%)",
      },

      // ── Custom Box Shadows (glow effects) ─────────────────
      boxShadow: {
        "glow-purple": "0 0 20px rgba(124,58,237,0.3), 0 0 60px rgba(124,58,237,0.1)",
        "glow-blue":   "0 0 20px rgba(59,130,246,0.3), 0 0 60px rgba(59,130,246,0.1)",
        "glow-cyan":   "0 0 20px rgba(6,182,212,0.3)",
        "tile-hover":  "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,58,237,0.2)",
      },

      // ── Animation ─────────────────────────────────────────
      keyframes: {
        // Skeleton pulsing loader animation
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // Subtle floating animation for hero tile
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-6px)" },
        },
        // Streak fire pulse
        pulse_slow: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0.6" },
        },
      },
      animation: {
        shimmer:     "shimmer 2s infinite linear",
        float:       "float 4s ease-in-out infinite",
        pulse_slow:  "pulse_slow 2s ease-in-out infinite",
      },

      // ── Grid Layout ───────────────────────────────────────
      gridTemplateColumns: {
        bento:       "repeat(12, 1fr)",
        "bento-tab": "repeat(8, 1fr)",
      },

      // ── Border Radius ─────────────────────────────────────
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;