import { GatsbyConfig, PluginOptions } from "gatsby"
import remarkSlug from "remark-slug"
import remarkSmartyPants from "remark-smartypants"
import camelCase from "lodash.camelcase"
import { withDefaults, capitalize } from "utils"

const { GITHUB_TOKEN, FLICKR_API_KEY } = process.env

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
          name: `src/pages`,
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
      FLICKR_API_KEY && {
        resolve: `@lekoarts/gatsby-source-flickr`,
        options: {
          api_key: FLICKR_API_KEY,
          username: `ars_aurea`,
          endpoints: [
            {
              method: `flickr.photosets.getList`,
              extension: {
                method: `flickr.photosets.getPhotos`,
                mapping: `id:photoset_id`,
                args: {
                  extras: `description,last_update,date_taken,url_sq,url_t,url_s,url_q,url_m,url_n,url_z,url_c,url_l,url_o,media,views,original_format`,
                },
              },
            },
          ],
        },
      },
      {
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
    ].filter(Boolean),
  }
}

export default gatsbyConfig
