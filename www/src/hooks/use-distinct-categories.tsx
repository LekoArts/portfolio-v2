import { graphql, useStaticQuery } from "gatsby"

type DistinctCategoryQueryResult = {
  allCategory: {
    distinct: string[]
  }
}

export const useDistinctCategories = () => {
  const data = useStaticQuery<DistinctCategoryQueryResult>(graphql`
    {
      allCategory {
        distinct(field: slug)
      }
    }
  `)

  const result = data.allCategory.distinct

  return [...result, `/tutorials`]
}
