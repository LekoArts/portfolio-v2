import { graphql, useStaticQuery } from "gatsby"

type Props = {
  allFooterNavigation: {
    nodes: Array<{
      heading: {
        link?: string
        name: string
      }
      items: Array<{
        isExternal?: boolean
        link: string
        name: string
      }>
    }>
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
