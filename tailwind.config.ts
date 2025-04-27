import type { Config } from "tailwindcss";

export default {
  //darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(0.74 0.063 80.8)",
        input: "oklch(0.74 0.063 80.8)",
        ring: "oklch(0.51 0.077 74.3)",
        background: "oklch(0.91 0.048 83.6)",
        foreground: "oklch(0.41 0.077 78.9)",
        story: {
          primary: "#9b87f5",
          secondary: "#FEF7CD",
          accent: "#F97316",
          text: "#4A3B76",
          background: "#FFFFFF",
        },
        primary: {
          DEFAULT: "oklch(0.71 0.097 111.7)",
          foreground: "oklch(0.98 0.005 0)",
        },
        secondary: {
          DEFAULT: "oklch(0.88 0.055 83.6)",
          foreground: "oklch(0.51 0.077 78.9)",
        },
        destructive: {
          DEFAULT: "oklch(0.63 0.24 29.2)",
          foreground: "oklch(0.97 0.018 0)",
        },
        muted: {
          DEFAULT: "oklch(0.86 0.064 83.7)",
          foreground: "oklch(0.51 0.077 74.3)",
        },
        accent: {
          DEFAULT: "oklch(0.86 0.055 83.6)",
          foreground: "oklch(0.26 0.016 0)",
        },
        popover: {
          DEFAULT: "oklch(0.92 0.042 83.6)",
          foreground: "oklch(0.41 0.077 74.3)",
        },
        card: {
          DEFAULT: "oklch(0.92 0.042 83.6)",
          foreground: "oklch(0.41 0.077 74.3)",
        },
        chart: {
          "1": "oklch(0.66 0.19 41.6)",
          "2": "oklch(0.68 0.16 184.9)",
          "3": "oklch(0.48 0.09 210.9)",
          "4": "oklch(0.85 0.19 85.4)",
          "5": "oklch(0.74 0.19 66.3)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Nunito", "sans-serif"],
        serif: ["var(--font-serif)", "PT Serif", "serif"],
      },
      borderRadius: {
        lg: "0.625rem",
        md: "calc(0.625rem - 2px)",
        sm: "calc(0.625rem - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  // plugins: [require("tailwindcss-animate")],
} satisfies Config;
