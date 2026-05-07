import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupFiles.ts"],
  },
  plugins: [
    viteReact(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
  ],
});
