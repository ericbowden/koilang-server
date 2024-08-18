import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

//declare const process: { env: { NODE_ENV: string } };
//const isProd = process.env.NODE_ENV == "production";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./server/dist",
  },

  // dev server options
  server: {
    proxy: {
      // port python server is running locally
      "/process": "http://localhost:8080",
    },
  },

  plugins: [react()],
});
