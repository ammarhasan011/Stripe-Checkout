import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/user": {
        target: "http://localhost:3000",
      },
    },
  },

  plugins: [react()],
});
