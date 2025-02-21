import { defineConfig, ProxyOptions } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  console.log("🛠️ Vite draait in mode:", mode);

  const isDev = mode === "development";

  const proxyConfig: Record<string, ProxyOptions> = isDev
    ? {
        "/places-api": {
          target: "http://localhost:8080",
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path: string) =>
            path.replace(/^\/places-api/, "/places-api"), // 🔹 Fix
        },
        "/locationiq-api": {
          target: "http://localhost:8080",
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path: string) =>
            path.replace(/^\/locationiq-api/, "/locationiq-api"), // 🔹 Fix
        },
      }
    : {};

  console.log("🌐 Proxy instellingen:", proxyConfig);

  return {
    server: {
      proxy: proxyConfig,
      watch: {
        usePolling: true,
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
        },
        manifest: {
          name: "Chauffeurs-Wiki",
          short_name: "ChauffeursWiki",
          description: "Een handige tool voor chauffeurs met locatiebeheer",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          start_url: "/",
          icons: [
            {
              src: "/icons/icon-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/icons/icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
  };
});
