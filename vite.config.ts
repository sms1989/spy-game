/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), VitePWA({ registerType: "autoUpdate" })],
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
