import { GatsbyConfig, PluginOptions } from "gatsby"
import remarkSlug from "remark-slug"
import remarkSmartyPants from "remark-smartypants"
import camelCase from "lodash.camelcase"
import { withDefaults, capitalize } from "utils"

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
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `src/pages`,
          path: `src/pages`,
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
      `gatsby-remark-images`,
      mdx && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          lessBabel: true,
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1024,
                quality: 90,
                linkImagesToOriginal: true,
              },
            },
          ],
          remarkPlugins: [remarkSlug, remarkSmartyPants],
        },
      },
      `gatsby-transformer-sharp`,
      {
        resolve: `gatsby-transformer-yaml`,
        options: {
          typeName: ({ node }) => capitalize(camelCase(node.name)),
        },
      },
      `gatsby-plugin-sharp`,
      `gatsby-plugin-catch-links`,
    ],
  }
}

export default gatsbyConfig
