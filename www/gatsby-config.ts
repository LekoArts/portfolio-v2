import { GatsbyConfig } from "gatsby"

const gatsbyConfig: GatsbyConfig & { flags: Record<string, boolean> } = {
  siteMetadata: {
    title: `Lennart Jörgens`,
  },
  flags: {
    LAZY_IMAGES: true,
    QUERY_ON_DEMAND: true,
    FAST_REFRESH: true,
  },
  plugins: [`gatsby-theme-core`],
}

export default gatsbyConfig
