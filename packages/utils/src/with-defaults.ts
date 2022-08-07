import { PluginOptions } from "gatsby"

export const defaults = {
  writingSource: `content/writing`,
  gardenSource: `content/garden`,
  dataSource: `src/data`,
}

/**
 * Set default values for all theme options
 * @param themeOptions - Incoming options
 * @returns Default values unless options are specified
 */
export const withDefaults = (themeOptions: PluginOptions) => {
  const writingSource = (themeOptions.writingSource as string) || defaults.writingSource
  const gardenSource = (themeOptions.gardenSource as string) || defaults.gardenSource
  const dataSource = (themeOptions.dataSource as string) || defaults.dataSource

  return {
    writingSource,
    gardenSource,
    dataSource,
  }
}
