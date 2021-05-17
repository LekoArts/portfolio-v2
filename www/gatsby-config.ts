import { GatsbyConfig } from "gatsby"
import { slugifyOptions } from "utils"

require(`dotenv`).config()

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

const gatsbyConfig: GatsbyConfig = {
  flags: {
    DEV_SSR: false,
  },
  siteMetadata: {
    siteTitle: `Lennart Jörgens`,
    siteTitleDefault: `Lennart Jörgens - Software Engineer`,
    siteUrl: `https://lekoarts-portfolio-v2.gatsbyjs.io`,
    siteDescription: `Lennart is a software engineer and passionate about working on open source products & building communities around them. He currently works at Gatsby on the open source project.`,
    siteImage: `/social/default-og-image.png?v=1`,
    twitter: `@lekoarts_de`,
  },
  plugins: [
    `gatsby-theme-core`,
    `@chakra-ui/gatsby-plugin`,
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    // Overwrite the default "slugify" option
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
        slugify: slugifyOptions,
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.gstatic.com`],
        interval: 300,
        timeout: 30000,
        web: [
          {
            name: `Inter`,
            file: `https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap`,
          },
          {
            name: `Crimson Pro`,
            file: `https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@600..800&display=swap`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lennart Jörgens - Software Engineer`,
        short_name: `Lennart Jörgens`,
        description: `Lennart is a software engineer and passionate about working on open source products & building communities around them. He currently works at Gatsby on the open source project.`,
        start_url: `/`,
        background_color: `#0f172a`,
        theme_color: `#ea580c`,
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
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {
        allPageHeaders: [`Permissions-Policy: interest-cohort=()`],
      },
    },
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-perf-budgets`,
      options: {},
    },
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {},
    },
  ].filter(Boolean),
}

export default gatsbyConfig
