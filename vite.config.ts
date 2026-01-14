import path from "path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  // Add the base path for GitHub Pages
  base: '/vasanthan-portfolio/', 
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Maps '@' to the 'src' directory
    },
  },
})
