import { graphql, useStaticQuery } from "gatsby"

type Props = {
  site: {
    siteMetadata: {
      siteTitle: string
      primaryNavigation: {
        name: string
        link: string
      }[]
      footerNavigation: {
        heading: {
          name: string
          link: string | null
        }
        items: {
          name: string
          link: string
        }[]
      }[]
    }
  }
}

const useSiteMetadata = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          primaryNavigation {
            name
            link
          }
          footerNavigation {
            heading {
              name
              link
            }
            items {
              name
              link
            }
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export default useSiteMetadata
