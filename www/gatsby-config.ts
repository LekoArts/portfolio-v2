import { GatsbyConfig } from "gatsby"

const gatsbyConfig: GatsbyConfig & { flags: Record<string, boolean> } = {
  siteMetadata: {
    siteTitle: `Lennart Jörgens`,
  },
  flags: {
    LAZY_IMAGES: true,
    QUERY_ON_DEMAND: true,
    FAST_REFRESH: true,
  },
  plugins: [
    `gatsby-theme-core`,
    `@chakra-ui/gatsby-plugin`,
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
  ],
}

export default gatsbyConfig
