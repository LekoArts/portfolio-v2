import { graphql, useStaticQuery } from "gatsby"

type Props = {
  allPrimaryNavigation: {
    nodes: {
      name: string
      link: string
    }[]
  }
}

export const usePrimaryNavigation = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      allPrimaryNavigation {
        nodes {
          name
          link
        }
      }
    }
  `)

  return data.allPrimaryNavigation.nodes
}
