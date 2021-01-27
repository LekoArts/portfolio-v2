import { graphql, useStaticQuery } from "gatsby"

type CategoryQueryResult = {
  allCategory: {
    nodes: {
      name: string
      slug: string
    }[]
  }
}

const useCategories = () => {
  const data = useStaticQuery<CategoryQueryResult>(graphql`
    {
      allCategory(sort: { fields: name, order: ASC }) {
        nodes {
          name
          slug
        }
      }
    }
  `)

  return data.allCategory.nodes
}

export default useCategories
