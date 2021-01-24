import { PluginOptions } from "gatsby"

/**
 * Set default values for all theme options
 * @param themeOptions - Incoming options
 * @returns Default values unless options are specified
 */
export const withDefaults = (themeOptions: PluginOptions) => {
  const writingSource = (themeOptions.writingSource as string) || `content/writing`
  const gardenSource = (themeOptions.writingSource as string) || `content/garden`
  const dataSource = (themeOptions.dataSource as string) || `src/data`

  return {
    writingSource,
    gardenSource,
    dataSource,
  }
}
