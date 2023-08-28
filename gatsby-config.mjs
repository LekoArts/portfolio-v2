/* eslint-disable import/no-default-export */
import path from "path"
import dotenv from "dotenv"
import remarkSlug from "remark-slug"
import remarkGfm from "remark-gfm"
import remarkSmartyPants from "remark-smartypants"
import rehypeMetaAsAttributes from "@lekoarts/rehype-meta-as-attributes"
import camelCase from "lodash.camelcase"
import { withDefaults } from "./src/utils/with-defaults.mjs"
import { capitalize } from "./src/utils/capitalize.mjs"
import { slugifyOptions } from "./src/utils/slugify.mjs"
import { site } from "./src/constants/meta.mjs"

dotenv.config()

const { GITHUB_TOKEN, FLICKR_API_KEY } = process.env

const options = withDefaults({})

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const gatsbyConfig = {
  siteMetadata: {
    siteTitle: site.title,
    siteTitleDefault: site.titleDefault,
    siteUrl: site.url,
    siteDescription: site.description,
    siteImage: site.defaultOgImage,
    twitter: site.twitter,
  },
  trailingSlash: `always`,
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
          remarkPlugins: [remarkGfm, remarkSlug, remarkSmartyPants],
          rehypePlugins: [rehypeMetaAsAttributes],
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
    `gatsby-plugin-vanilla-extract`,
    `gatsby-plugin-image`,
    // Overwrite the default "slugify" option
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: path.resolve(`src/pages`),
        slugify: slugifyOptions,
        ignore: {
          patterns: [`**/*.css.ts`],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: site.titleDefault,
        short_name: site.title,
        description: site.description,
        start_url: `/`,
        background_color: `#0f172a`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
        excludes: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback`,
          `/privacy-policy`,
          `/legal-notice`,
        ],
        query: `#graphql
        {
          posts: allPost(filter: { published: { eq: true } } ) {
            nodes {
              path: slug
              lastmod: lastUpdated
            }
          }
          garden: allGarden {
            nodes {
              lastmod: lastUpdated
              path: slug
            }
          }
          other: allSitePage(filter: { pluginCreator: { name: { ne: "default-site-plugin" } } } ) {
            nodes {
              path
            }
          }
        }
        `,
        resolveSiteUrl: () => site.url,
        resolvePages: ({ posts, garden, other }) => [].concat(posts.nodes, garden.nodes, other.nodes),
        serialize: ({ path: pagePath, lastmod }) => ({
          url: pagePath,
          lastmod,
        }),
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `#graphql
        {
          site {
            siteMetadata {
              title: siteTitleDefault
              description: siteDescription
              siteUrl
              site_url: siteUrl
            }
          }
        }
        `,
        feeds: [
          {
            query: `#graphql
            {
              posts: allPost(filter: {published: {eq: true}}, sort: {date: DESC}) {
                nodes {
                  title
                  date
                  description
                  slug
                }
              }
              garden: allGarden(sort: {lastUpdated: DESC}) {
                nodes {
                  title
                  date: lastUpdated(formatString: "MMM DD, YYYY")
                  description
                  slug
                }
              }
            }
            `,
            serialize: ({ query: { site: s, posts, garden } }) => {
              // Combine posts and garden + sort them by date
              const allEntries = [...posts.nodes, ...garden.nodes].sort(
                (a, b) => Date.parse(b.date) - Date.parse(a.date)
              )

              return allEntries.map((node) => {
                const url = `${s.siteMetadata.siteUrl}${node.slug}`
                const content = `<p>${node.description}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`

                return {
                  title: node.title,
                  url,
                  guid: url,
                  date: node.date,
                  description: node.description,
                  custom_elements: [{ "content:encoded": content }],
                }
              })
            },
            output: `/rss.xml`,
            title: site.titleDefault,
            language: `en`,
            image_url: `${site.url}/social/logo-60w.png`,
          },
        ],
      },
    },
  ].filter(Boolean),
}

export default gatsbyConfig
