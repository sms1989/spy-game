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
        display: "standalone",
        theme_color: "#000000",
        categories: ["games", "entertainment"],
        description: "بازی دسته جمعی جاسوس",
        lang: "fa",
        start_url: "/",
        dir: "rtl",
        orientation: "portrait",
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
