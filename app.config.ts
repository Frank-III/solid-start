import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  middleware: "./src/middleware.ts",
  ssr: false 
});
