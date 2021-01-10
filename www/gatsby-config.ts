import { GatsbyConfig } from "gatsby"

const gatsbyConfig: GatsbyConfig & { flags: Record<string, boolean> } = {
  siteMetadata: {
    siteTitle: `Lennart Jörgens`,
    primaryNavigation: [
      {
        name: `Writing`,
        link: `/writing`,
      },
      {
        name: `Art`,
        link: `/art`,
      },
      {
        name: `About`,
        link: `/about`,
      },
    ],
    footerNavigation: [
      {
        heading: {
          name: `Writing`,
          link: `/writing`,
        },
        items: [
          {
            name: `Digital Garden`,
            link: `/garden`,
          },
          {
            name: `Tutorials`,
            link: `/tutorials`,
          },
          {
            name: `React`,
            link: `/react`,
          },
          {
            name: `Community`,
            link: `/community`,
          },
        ],
      },
      {
        heading: {
          name: `Art`,
          link: `/art`,
        },
        items: [
          {
            name: `UI`,
            link: `/art/ui`,
          },
          {
            name: `3D`,
            link: `/art/3d`,
          },
          {
            name: `Photography`,
            link: `/art/photography`,
          },
        ],
      },
      {
        heading: {
          name: `About`,
          link: `/about`,
        },
        items: [
          {
            name: `Speaking`,
            link: `/speaking`,
          },
          {
            name: `Uses`,
            link: `/uses`,
          },
          {
            name: `GitHub`,
            link: `/github`,
          },
        ],
      },
      {
        heading: {
          name: `Social`,
          link: null,
        },
        items: [
          {
            name: `Twitter`,
            link: `https://www.twitter.com/lekoarts_de`,
            isExternal: true,
          },
          {
            name: `Instagram`,
            link: `https://www.instagram.com/lekoarts.de`,
            isExternal: true,
          },
          {
            name: `GitHub`,
            link: `https://www.github.com/LekoArts`,
            isExternal: true,
          },
        ],
      },
    ],
  },
  flags: {
    FAST_REFRESH: false,
    DEV_SSR: true,
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
