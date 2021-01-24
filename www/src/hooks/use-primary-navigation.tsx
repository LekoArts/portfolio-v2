import { graphql, useStaticQuery } from "gatsby"

type Props = {
  allPrimaryNavigationYaml: {
    nodes: {
      name: string
      link: string
    }[]
  }
}

const usePrimaryNavigation = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      allPrimaryNavigationYaml {
        nodes {
          name
          link
        }
      }
    }
  `)

  return data.allPrimaryNavigationYaml.nodes
}

export default usePrimaryNavigation
