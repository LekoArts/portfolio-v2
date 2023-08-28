export const defaults = {
  writingSource: `content/writing`,
  gardenSource: `content/garden`,
  dataSource: `src/data`,
}

/**
 * Set default values for all theme options
 * @param {IPluginOptions} themeOptions - Incoming options
 * @returns {{ writingSource: string; gardenSource: string; dataSource: string; }} Default values unless options are specified
 */
export const withDefaults = (themeOptions) => {
  const writingSource = themeOptions.writingSource || defaults.writingSource
  const gardenSource = themeOptions.gardenSource || defaults.gardenSource
  const dataSource = themeOptions.dataSource || defaults.dataSource

  return {
    writingSource,
    gardenSource,
    dataSource,
  }
}

/** @typedef {Object} IPluginOptions
 * @property {string} [writingSource]
 * @property {string} [gardenSource]
 * @property {string} [dataSource]
 */
