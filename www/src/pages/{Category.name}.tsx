import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { CategoryHero } from "../components/writing/category-hero"
import { CategoryView } from "../components/writing/category-view"
import { SEO } from "../components/seo"

type ReactProps = {
  posts: {
    nodes: {
      title: string
      date: string
      slug: string
      subtitle: string
      description: string
    }[]
    totalCount: number
  }
  category: {
    name: string
    description: string
    gradient: string
    slug: string
  }
}

const ReactCategory: React.FC<PageProps<ReactProps>> = ({ data: { posts, category } }) => (
  <CategoryView posts={posts}>
    <SEO
      title={category.name}
      description={category.description}
      breadcrumbListItems={[{ name: category.name, url: category.slug }]}
    />
    <CategoryHero bgGradient={category.gradient} title={category.name} description={category.description} />
  </CategoryView>
)

export default ReactCategory

export const query = graphql`
  query ($name: String!) {
    category(name: { eq: $name }) {
      name
      description
      gradient
      slug
    }
    posts: allPost(
      filter: { published: { eq: true }, category: { name: { eq: $name } } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...CardPostInformation
      }
      totalCount
    }
  }
`
