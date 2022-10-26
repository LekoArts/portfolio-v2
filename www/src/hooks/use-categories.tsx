import { graphql, useStaticQuery } from "gatsby"

type CategoryQueryResult = {
  allCategory: {
    nodes: Array<{
      name: string
      slug: string
    }>
  }
}

export const useCategories = () => {
  const data = useStaticQuery<CategoryQueryResult>(graphql`
    {
      allCategory(sort: { name: ASC }) {
        nodes {
          name
          slug
        }
      }
    }
  `)

  return data.allCategory.nodes
}
