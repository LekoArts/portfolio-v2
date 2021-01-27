import * as React from "react"
import { PageProps, graphql } from "gatsby"
import CategoryHero from "../components/writing/category-hero"
import CategoryView from "../components/writing/category-view"

type JavaScriptProps = {
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

const JavaScript: React.FC<PageProps<JavaScriptProps>> = ({ data: { posts } }) => (
  <CategoryView posts={posts}>
    <CategoryHero
      bgGradient="linear(to-t, yellow.500, yellow.900)"
      title="JavaScript"
      description="description for this category goes here"
      image={<div style={{ height: `250px`, width: `250px`, backgroundColor: `white` }} />}
    />
  </CategoryView>
)

export default JavaScript

export const query = graphql`
  {
    posts: allPost(
      filter: { published: { eq: true }, category: { name: { eq: "JavaScript" } } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...CardPostInformation
      }
      totalCount
    }
  }
`
