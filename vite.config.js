import { defineConfig } from "vite";
import { configDefaults } from "vitest/dist/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    mockReset: true,
    coverage: {
      reporter: ["text", "html"],
    },
    exclude: [
      ...configDefaults.exclude,
      "**/PointsPage.magevney.test.jsx",
      "**/WomanFilter.lau.test.jsx",
      "**/App.test.jsx",
    ],
  },
});
