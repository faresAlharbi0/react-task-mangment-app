// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/react-task-mangment-app/", // <--- add this
  plugins: [react()],
  build: {
    target: "esnext", // ensures WASM support
  },
});
