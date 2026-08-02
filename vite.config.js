import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({

  plugins: [react()],

  build: {

    chunkSizeWarningLimit: 1600,

    sourcemap: false,

    cssCodeSplit: true,

    reportCompressedSize: true

  }

});