import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

declare const process: { env: { NODE_ENV: string } };

const isProd = process.env.NODE_ENV == "production";

// https://vitejs.dev/config/
export default defineConfig({
  base: isProd ? "dist" : "",
  build: {
    outDir: "./server/dist",
  },

  plugins: [react()],
});
