import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      process: "process/browser",
    },
  },
  server: {
    proxy: {
      "/qr": {
        target: "https://api.ethfollow.xyz/api/v1/users",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/qr/, ""),
      },
    },
  },
});
