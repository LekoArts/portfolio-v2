import * as React from "react"
import { PageProps, graphql } from "gatsby"
import CategoryHero from "../components/writing/category-hero"
import CategoryView from "../components/writing/category-view"

type GatsbyProps = {
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

const Gatsby: React.FC<PageProps<GatsbyProps>> = ({ data: { posts } }) => (
  <CategoryView posts={posts}>
    <CategoryHero
      bgGradient="linear(to-t, violet.500, violet.900)"
      title="Gatsby"
      description="description for this category goes here"
      image={<div style={{ height: `250px`, width: `250px`, backgroundColor: `white` }} />}
    />
  </CategoryView>
)

export default Gatsby

export const query = graphql`
  {
    posts: allPost(
      filter: { published: { eq: true }, category: { name: { eq: "Gatsby" } } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...CardPostInformation
      }
      totalCount
    }
  }
`
