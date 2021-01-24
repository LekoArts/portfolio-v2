import { graphql, useStaticQuery } from "gatsby"

type Props = {
  allFooterNavigationYaml: {
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

const useFooterNavigation = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      allFooterNavigationYaml {
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

  return data.allFooterNavigationYaml.nodes
}

export default useFooterNavigation
