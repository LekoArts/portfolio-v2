import { GatsbyConfig, PluginOptions } from "gatsby"
import remarkSlug from "remark-slug"
import remarkSmartyPants from "remark-smartypants"
import camelCase from "lodash.camelcase"
import { withDefaults, capitalize } from "utils"

const { GITHUB_TOKEN } = process.env

const gatsbyConfig = (themeOptions: PluginOptions): GatsbyConfig => {
  const options = withDefaults(themeOptions)

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
          name: `pages`,
          path: `src/pages`,
        },
      },
      GITHUB_TOKEN && {
        resolve: `gatsby-source-graphql`,
        options: {
          typeName: `GitHub`,
          fieldName: `github`,
          url: `https://api.github.com/graphql`,
          headers: {
            Authorization: `bearer ${GITHUB_TOKEN}`,
          },
          fetchOptions: {},
        },
      },
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
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
          mdxOptions: {
            remarkPlugins: [remarkSlug, remarkSmartyPants],
          },
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
    ].filter(Boolean),
  }
}

export default gatsbyConfig
