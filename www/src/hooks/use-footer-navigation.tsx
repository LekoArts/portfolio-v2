import { graphql, useStaticQuery } from "gatsby"

type Props = {
  allFooterNavigation: {
    nodes: {
      heading: {
        link?: string
        name: string
      }
      items: {
        isExternal?: boolean
        link: string
        name: string
      }[]
    }[]
  }
}

export const useFooterNavigation = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      allFooterNavigation {
        nodes {
          heading {
            link
            name
          }
          items {
            isExternal
            link
            name
          }
        }
      }
    }
  `)

  return data.allFooterNavigation.nodes
}
