const hexToRGBA = require('hex-to-rgba');
const lineClamp = require("@tailwindcss/line-clamp");
const typography = require("@tailwindcss/typography");

module.exports = {
  mode: "jit",
  darkMode: "media",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "768px",
      md: "1025px",
      lg: "1280px",
      xl: "1440px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      unset: "unset",
      inherit: "inherit",
      white: "#fff",
      black: "#000",
      gray: {
        DEFAULT: "#475467",
        25: "#fcfcfd",
        50: "#f9fafb",
        100: "#f2f4f7",
        200: "#e4e7ec",
        300: "#d0d5dd",
        400: "#98a2b3",
        500: "#667085",
        600: "#475467",
        700: "#344054",
        800: "#1d2939",
        900: "#101828",
      },
      error: {
        DEFAULT: '#d92d20',
        25: '#fffbfa',
        50: '#fef3f2',
        100: '#fee4e2',
        200: '#fecdca',
        300: '#fda29b',
        400: '#f97066',
        500: '#f04438',
        600: '#d92d20',
        700: '#b42318',
        800: '#912018',
        900: '#7a271a',
      },
      warning: {
        DEFAULT: '#dc6803',
        25: '#fffcf5',
        50: '#fffaeb',
        100: '#fef0c7',
        200: '#fedf89',
        300: '#fec84b',
        400: '#fdb022',
        500: '#f79009',
        600: '#dc6803',
        700: '#b54708',
        800: '#93370d',
        900: '#7a2e0e',
      },
      success: {
        DEFAULT: '#039855',
        25: '#f6fef9',
        50: '#ecfdf3',
        100: '#d1fadf',
        200: '#a6f4c5',
        300: '#6ce9a6',
        400: '#32d583',
        500: '#12b76a',
        600: '#039855',
        700: '#027a48',
        800: '#05603a',
        900: '#054f31',
      },
    },
    fontFamily: {
      text: [
        "TWK Lausanne",
        "Inter",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "Liberation Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      mono: [
        "IBM Plex Mono",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },
    spacing: {
      px: "1px",
      0: "0px",
      1: "0.25rem",
      1.5: "0.375rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      11: "2.75rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "16rem",
    },
    fontSize: {
      xs: ["0.75rem", "1.75"],
      sm: ["0.875rem", "1.75"],
      md: ["1rem", "1.75"],
      lg: ["1.125rem", "1.75"],
      xl: ["1.25rem", "1.75"],
    },
    letterSpacing: {
      normal: '0.008rem',
    },
    fontWeight: {
      normal: 300,
      medium: 400,
      semibold: 500,
    },
    backdropBlur: {
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      xxl: "2.5rem",
    },
    boxShadow: (theme) => ({
      border: `inset 0 0 0 1px ${theme("colors.gray.300")}`,
      "border-light": `inset 0 0 0 1px ${theme("colors.gray.200")}`,
      "border-focus": `inset 0 0 0 1px ${theme("colors.gray.300")}`,
      "border-error": `inset 0 0 0 1px ${theme("colors.error.300")}`,
      focus: `0 0 0 0.25rem ${theme("colors.gray.100")}`,
      "focus-error": `0 0 0 0.25rem ${theme("colors.error.100")}`,
      xs: `0 1px 0.125rem ${hexToRGBA(theme("colors.gray.900"), 0.05)}`,
      sm: `0 1px 0.1875rem ${hexToRGBA(
        theme("colors.gray.900"),
        0.1
      )}, 0 1px 0.125rem ${hexToRGBA(theme("colors.gray.900"), 0.06)}`,
      md: `0 0.25rem 0.5rem -0.125rem ${hexToRGBA(
        theme("colors.gray.900"),
        0.1
      )}, 0 0.125rem 0.25rem -0.125rem ${hexToRGBA(
        theme("colors.gray.900"),
        0.06
      )}`,
      lg: `0 0.75rem 1rem -0.25rem ${hexToRGBA(
        theme("colors.gray.900"),
        0.1
      )}, 0 0.25rem 0.375rem -0.125rem ${hexToRGBA(
        theme("colors.gray.900"),
        0.05
      )}`,
      xl: `0 1.25rem 1.5rem -0.25rem ${hexToRGBA(
        theme("colors.gray.900"),
        0.1
      )}, 0 0.5rem 0.5rem -0.25rem ${hexToRGBA(
        theme("colors.gray.900"),
        0.04
      )}`,
      "2xl": `0 1.75rem 2rem -0.375rem ${hexToRGBA(
        theme("colors.gray.900"),
        0.1
      )}, 0 1rem 0.625rem -0.25rem ${hexToRGBA(
        theme("colors.gray.900"),
        0.03
      )}`,
      "3xl": `0 2.25rem 2.5rem -0.375rem ${hexToRGBA(
        theme("colors.gray.900"),
        0.1
      )}, 0 2rem 0.75rem -0.375rem ${hexToRGBA(
        theme("colors.gray.900"),
        0.02
      )}`,
    }),
    extend: {
      animation: {
        fadeIn: "fadeIn 0.2s ease-out",
        fadeOut: "fadeOut 0.2s ease-in",
        enter: "enter 0.2s ease-out",
        enterCenter: "enterCenter 0.2s ease-out",
        exit: "exit 0.2s ease-in forwards",
        exitCenter: "exitCenter 0.2s ease-in forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        enter: {
          "0%": { opacity: 0, transform: "scale(.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        enterCenter: {
          "0%": { opacity: 0, transform: "translate(-50%, -50%) scale(.9)" },
          "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
        exit: {
          "0%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(.9)" },
        },
        exitCenter: {
          "0%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
          "100%": { opacity: 0, transform: "translate(-50%, -50%) scale(0.9)" },
        },
      },
    },
  },
  plugins: [
    lineClamp,
    typography,
  ],
};
