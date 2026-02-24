// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
<<<<<<< HEAD
  base: "/react-task-mangment-app/dist",
  plugins: [react()],
  build: {
    target: "esnext",
=======
  base: "/faresAlharbi0/react-task-mangment-app", // <--- add this
  plugins: [react()],
  build: {
    target: "esnext", // ensures WASM support
>>>>>>> 656bc80 (fixes issues)
  },
});
