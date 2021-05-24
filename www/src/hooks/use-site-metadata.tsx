import { graphql, useStaticQuery } from "gatsby"

type Props = {
  site: {
    siteMetadata: {
      siteTitle: string
      siteTitleDefault: string
      siteUrl: string
      siteDescription: string
      siteImage: string
      twitter: string
    }
  }
}

export const useSiteMetadata = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteTitleDefault
          siteUrl
          siteDescription
          siteImage
          twitter
        }
      }
    }
  `)

  return data.site.siteMetadata
}
