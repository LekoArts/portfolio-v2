/// <reference types="vitest" />
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    globals: true,
    setupFiles: `./vitest/setup.ts`,
    include: [`packages/**/__tests__/*.ts`, `www/**/__tests__/*.{ts,tsx}`],
    coverage: {
      reporter: [`text`, `json`, `html`],
    },
    deps: {
      inline: [`gatsby-script`],
    },
  },
})
