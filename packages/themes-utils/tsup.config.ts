/* eslint-disable import/no-default-export */
import { defineConfig } from "tsup"

export default defineConfig({
  name: `themes-utils`,
  entry: [`src/index.ts`],
  treeshake: true,
  clean: true,
  dts: true,
  splitting: true,
  format: [`esm`],
  target: `node18`,
  minify: true,
  shims: true,
  external: [`react`],
})
