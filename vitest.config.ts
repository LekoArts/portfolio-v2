import { defineConfig } from "vitest/config"
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"

export default defineConfig({
  test: {
    globals: true,
    setupFiles: `./vitest/setup.ts`,
    include: [`packages/**/__tests__/*.ts`, `src/**/__tests__/*.{ts,tsx}`],
    coverage: {
      reporter: [`text`, `json`, `html`],
    },
  },
  plugins: [vanillaExtractPlugin()],
})
