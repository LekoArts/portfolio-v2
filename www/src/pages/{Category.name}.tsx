import * as React from "react"
import { PageProps, graphql, HeadFC } from "gatsby"
import { CategoryHero } from "../components/writing/category-hero"
import { CategoryView } from "../components/writing/category-view"
import { SEO } from "../components/seo"

type DataProps = {
  posts: {
    nodes: Array<{
      title: string
      date: string
      slug: string
      subtitle: string
      description: string
    }>
    totalCount: number
  }
  category: {
    name: string
    description: string
    gradient: string
    slug: string
  }
}

const ReactCategory: React.FC<PageProps<DataProps>> = ({ data: { posts, category } }) => (
  <CategoryView posts={posts}>
    <CategoryHero bgGradient={category.gradient} title={category.name} description={category.description} />
  </CategoryView>
)

export default ReactCategory

export const Head: HeadFC<DataProps> = ({ data: { category } }) => (
  <SEO
    title={category.name}
    pathname={category.slug}
    description={category.description}
    breadcrumbListItems={[{ name: category.name, url: category.slug }]}
  />
)

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
