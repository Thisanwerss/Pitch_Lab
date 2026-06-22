import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.GITHUB_PAGES_BASE ?? "/",
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/index.js",
        assetFileNames: "assets/[name][extname]",
        chunkFileNames: "assets/[name].js",
      },
    },
  },
  plugins: [react()],
});
