import path from "path"
import react from "@vitejs/plugin-react"
import viteCompression from "vite-plugin-compression"
import { defineConfig } from "vite"

export default defineConfig({
  base: '/ai-tech-portfolio/',
  plugins: [react(), viteCompression({ algorithm: 'brotliCompress' })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

