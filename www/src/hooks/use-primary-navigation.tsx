import { graphql, useStaticQuery } from "gatsby"

type Props = {
  allPrimaryNavigation: {
    nodes: {
      name: string
      link: string
    }[]
  }
}

const usePrimaryNavigation = () => {
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

export default usePrimaryNavigation
