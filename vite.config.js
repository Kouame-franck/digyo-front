import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5175,
    strictPort: true,
    proxy: {
      // Pointe sur le backend de production (donc sur la vraie base de données) : plus besoin
      // de backend ni de base locale pour développer/tester le front. Remettre en
      // "http://localhost:3001" ponctuellement si un backend local est explicitement voulu.
      "/api": { target: "https://api-digyo.digyo.pro", changeOrigin: true, secure: true },
    },
  },
})
