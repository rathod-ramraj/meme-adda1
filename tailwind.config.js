/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        /** Body: Google-style pairing (Roboto ≈ product UI, Poppins ≈ display headings). */
        sans: ["Roboto", "system-ui", "sans-serif"],
        heading: ["Poppins", "system-ui", "sans-serif"],
      },
      colors: {
        page: "#F5F5F5",
        muted: "#6B7280",
        border: "#E5E7EB",
        card: "#0B0B0F",
        testimonial: "#F3F4F6",
        glass: "rgba(255,255,255,0.05)",
        accent: {
          blue: "#4F8EF7",
          green: "#6EE7B7",
          purple: "#A78BFA",
          emerald: "#34D399",
        },
      },
      boxShadow: {
        card: "0 20px 60px rgba(0,0,0,0.4)",
        glow: "0 0 80px rgba(100,200,255,0.2)",
        "glow-hover": "0 0 40px rgba(100,200,255,0.4)",
        lift: "0 10px 30px rgba(0,0,0,0.15)",
        /** Elevation for dark promotion cards — uses spread so it's visible on dark bg. */
        promo:
          "0 4px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.35)",
        "promo-hover":
          "0 8px 32px rgba(79,142,247,0.22), 0 4px 18px rgba(0,0,0,0.55)",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease",
      },
    },
  },
  plugins: [],
};
