import * as React from "react"
import { PageProps, graphql } from "gatsby"
import CategoryHero from "../components/writing/category-hero"
import CategoryView from "../components/writing/category-view"

type TutorialsProps = {
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

const Tutorials: React.FC<PageProps<TutorialsProps>> = ({ data: { posts } }) => (
  <CategoryView posts={posts}>
    <CategoryHero
      bgGradient="linear(to-t, blueGray.600, blueGray.900)"
      title="Tutorials"
      description="description for this category goes here"
      image={<div style={{ height: `250px`, width: `250px`, backgroundColor: `white` }} />}
    />
  </CategoryView>
)

export default Tutorials

export const query = graphql`
  {
    posts: allPost(filter: { published: { eq: true }, type: { eq: tutorial } }, sort: { fields: date, order: DESC }) {
      nodes {
        ...CardPostInformation
      }
      totalCount
    }
  }
`
