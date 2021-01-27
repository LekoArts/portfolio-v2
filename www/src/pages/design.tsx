import * as React from "react"
import { PageProps, graphql } from "gatsby"
import CategoryHero from "../components/writing/category-hero"
import CategoryView from "../components/writing/category-view"

type DesignProps = {
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
}

const Design: React.FC<PageProps<DesignProps>> = ({ data: { posts } }) => (
  <CategoryView posts={posts}>
    <CategoryHero
      bgGradient="linear(to-t, indigo.600, indigo.900)"
      title="Design"
      description="description for this category goes here"
      image={<div style={{ height: `250px`, width: `250px`, backgroundColor: `white` }} />}
    />
  </CategoryView>
)

export default Design

export const query = graphql`
  {
    posts: allPost(
      filter: { published: { eq: true }, category: { name: { eq: "Design" } } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...CardPostInformation
      }
      totalCount
    }
  }
`
