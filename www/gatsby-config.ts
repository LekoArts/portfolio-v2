import { GatsbyConfig } from "gatsby"

require(`dotenv`).config()

const gatsbyConfig: GatsbyConfig = {
  flags: {
    FAST_REFRESH: false,
    DEV_SSR: true,
  },
  siteMetadata: {
    siteTitle: `Lennart Jörgens`,
  },
  plugins: [
    `gatsby-theme-core`,
    `@chakra-ui/gatsby-plugin`,
    `gatsby-plugin-image`,
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
    `gatsby-plugin-gatsby-cloud`,
  ],
}

export default gatsbyConfig
