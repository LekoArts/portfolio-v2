import { GatsbyConfig, PluginOptions } from "gatsby"
import { withDefaults } from "utils"

const gatsbyConfig = (themeOptions: PluginOptions): GatsbyConfig => {
  const options = withDefaults(themeOptions)
  const { mdx = true } = themeOptions

  return {
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: options.writingSource,
          path: options.writingSource,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: options.gardenSource,
          path: options.gardenSource,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: options.dataSource,
          path: options.dataSource,
        },
      },
      {
        resolve: `gatsby-source-graphql`,
        options: {
          typeName: `GitHub`,
          fieldName: `github`,
          url: `https://api.github.com/graphql`,
          headers: {
            Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
          },
          fetchOptions: {},
        },
      },
      mdx && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          lessBabel: true,
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 960,
                quality: 90,
                linkImagesToOriginal: false,
              },
            },
          ],
          plugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 960,
                quality: 90,
                linkImagesToOriginal: false,
              },
            },
          ],
        },
      },
      `gatsby-transformer-sharp`,
      `gatsby-transformer-yaml`,
      `gatsby-plugin-sharp`,
    ],
  }
}

export default gatsbyConfig
