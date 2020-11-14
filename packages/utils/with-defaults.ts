import { PluginOptions } from "gatsby"

export const withDefaults = (themeOptions: PluginOptions) => {
  const blogSource = (themeOptions.blogSource as string) || `content/blog`
  const blogPath = (themeOptions.blogPath as string) || `/blog`
  const blogPrefix = (themeOptions.blogPrefix as string) || `/blog`
  const tagPath = (themeOptions.tagPath as string) || `/tags`
  const tagPrefix = (themeOptions.tagPrefix as string) || `/tags`
  const formatString = (themeOptions.formatString as string) || `YYYY-MM-DD`

  return {
    blogSource,
    blogPath,
    blogPrefix,
    tagPath,
    tagPrefix,
    formatString,
  }
}
