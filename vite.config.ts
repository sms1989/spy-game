/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "جاسوس",
        short_name: "جاسوس",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "screenshot-1.jpg",
            sizes: "1680x780",
            form_factor: "narrow",
            label: "صفحه شروع",
            type: "image/jpeg",
          },
          {
            src: "screenshot-2.jpg",
            sizes: "1680x780",
            form_factor: "narrow",
            label: "نمایش کلمه",
            type: "image/jpeg",
          },
          {
            src: "screenshot-3.jpg",
            sizes: "1680x780",
            form_factor: "narrow",
            label: "انتقال به نفر بعد",
            type: "image/jpeg",
          },
          {
            src: "screenshot-4.jpg",
            sizes: "1680x780",
            form_factor: "narrow",
            label: "نمایش جاسوس",
            type: "image/jpeg",
          },
          {
            src: "screenshot-5.jpg",
            sizes: "1680x780",
            form_factor: "narrow",
            label: "نمایش زمان",
            type: "image/jpeg",
          },
        ],
        launch_handler: {
          client_mode: "auto",
        },
        display: "standalone",
        theme_color: "#1f1f23",
        categories: ["games", "entertainment"],
        description: "بازی دسته جمعی جاسوس",
        lang: "fa",
        start_url: "/",
        id: "/",
        dir: "rtl",
        orientation: "portrait",
        background_color: "#1f1f23",
        display_override: ["fullscreen"],
        protocol_handlers: [
          {
            protocol: "web+app",
            url: "/",
          },
        ],
        share_target: {
          action: "/",
          method: "GET",
          params: {
            title: "text",
            text: "text",
            url: "url",
          },
        },
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/setupTests.ts"],
    coverage: {
      exclude: [
        "*.config.js",
        ".eslintrc.cjs",
        "**/*.d.ts",
        "src/router/*",
        "src/main.tsx",
        "src/Components/AsyncPage.tsx",
      ],
    },
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});
