import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          "100": "#F5F5F5",
          "500": "#333333",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        dark: {
          "100": "#000000",
          "200": "#1A1A1A",
          "300": "#333333",
          "400": "#4D4D4D",
          "500": "#666666",
        },
        light: {
          "400": "#E6E6E6",
          "500": "#CCCCCC",
          "700": "#B3B3B3",
          "800": "#999999",
          "850": "#F5F5F5",
          "900": "#FFFFFF",
        },
        chart: {
          "1": "#000000",
          "2": "#333333",
          "3": "#666666",
          "4": "#999999",
          "5": "#CCCCCC",
        },
      },
      borderRadius: {
        "2": "8px",
        "1.5": "6px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "light-100":
          "0px 12px 20px 0px rgba(184, 184, 184, 0.03), 0px 6px 12px 0px rgba(184, 184, 184, 0.02), 0px 2px 4px 0px rgba(184, 184, 184, 0.03)",
        "light-200": "10px 10px 20px 0px rgba(218, 213, 213, 0.10)",
        "light-300": "-10px 10px 20px 0px rgba(218, 213, 213, 0.10)",
        "dark-100": "0px 2px 10px 0px rgba(46, 52, 56, 0.10)",
        "dark-200": "2px 0px 20px 0px rgba(39, 36, 36, 0.04)",
      },
      backgroundImage: {
        "auth-dark": 'url("/images/auth-dark.png")',
        "auth-light": 'url("/images/auth-light.png")',
      },
      screens: {
        xs: "420px",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        "space-grotesk": ["var(--font-space-grotesk)"],
        "sande-more": ["var(--font-sande-more-regular)"],
        "sande-more-italic": ["var(--font-sande-more-italic)"],
        "sande-more-medium": ["var(--font-sande-more-medium)"],
        "sande-more-medium-italic": ["var(--font-sande-more-medium-italic)"],
        "sande-more-semibold": ["var(--font-sande-more-semibold)"],
        "sande-more-semibold-italic": [
          "var(--font-sande-more-semibold-italic)",
        ],
        "sande-more-bold": ["var(--font-sande-more-bold)"],
        "sande-more-bold-italic": ["var(--font-sande-more-bold-italic)"],
        "sande-more-extrabold": ["var(--font-sande-more-extrabold)"],
        "sande-more-extrabold-italic": [
          "var(--font-sande-more-extrabold-italic)",
        ],
        "noto-sans": [
          "var(--font-noto-sans-regular)",
          "system-ui",
          "sans-serif",
        ],
        "noto-sans-italic": [
          "var(--font-noto-sans-italic)",
          "system-ui",
          "sans-serif",
        ],
        "noto-sans-medium": [
          "var(--font-noto-sans-medium)",
          "system-ui",
          "sans-serif",
        ],
        "noto-sans-medium-italic": [
          "var(--font-noto-sans-medium-italic)",
          "system-ui",
          "sans-serif",
        ],
        "noto-sans-semibold": [
          "var(--font-noto-sans-semibold)",
          "system-ui",
          "sans-serif",
        ],
        "noto-sans-semibold-italic": [
          "var(--font-noto-sans-semibold-italic)",
          "system-ui",
          "sans-serif",
        ],
        "noto-sans-bold": [
          "var(--font-noto-sans-bold)",
          "system-ui",
          "sans-serif",
        ],
        "noto-sans-bold-italic": [
          "var(--font-noto-sans-bold-italic)",
          "system-ui",
          "sans-serif",
        ],
        "noto-sans-extrabold": [
          "var(--font-noto-sans-extrabold)",
          "system-ui",
          "sans-serif",
        ],
        "noto-sans-extrabold-italic": [
          "var(--font-noto-sans-extrabold-italic)",
          "system-ui",
          "sans-serif",
        ],
        regular: ["var(--font-noto-sans-regular)", "system-ui", "sans-serif"],
        italic: ["var(--font-noto-sans-italic)", "system-ui", "sans-serif"],
        medium: ["var(--font-noto-sans-medium)", "system-ui", "sans-serif"],
        "medium-italic": [
          "var(--font-noto-sans-medium-italic)",
          "system-ui",
          "sans-serif",
        ],
        semibold: ["var(--font-noto-sans-semibold)", "system-ui", "sans-serif"],
        "semibold-italic": [
          "var(--font-noto-sans-semibold-italic)",
          "system-ui",
          "sans-serif",
        ],
        bold: ["var(--font-noto-sans-bold)", "system-ui", "sans-serif"],
        "bold-italic": [
          "var(--font-noto-sans-bold-italic)",
          "system-ui",
          "sans-serif",
        ],
        extrabold: [
          "var(--font-noto-sans-extrabold)",
          "system-ui",
          "sans-serif",
        ],
        "extrabold-italic": [
          "var(--font-noto-sans-extrabold-italic)",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
