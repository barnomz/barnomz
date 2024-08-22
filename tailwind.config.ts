import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "./src/constants/palette";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors,
  },
  plugins: [],
} satisfies Config;
