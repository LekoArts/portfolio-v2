import * as React from "react"
import { PageProps, graphql } from "gatsby"
import CategoryHero from "../components/writing/category-hero"
import CategoryView from "../components/writing/category-view"

type CommunityProps = {
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

const Community: React.FC<PageProps<CommunityProps>> = ({ data: { posts } }) => (
  <CategoryView posts={posts}>
    <CategoryHero
      bgGradient="linear(to-b, red.900, orange.800, yellow.700, green.600, blue.500, purple.400)"
      title="Community"
      description="Building an engaging & inclusive community is hard and takes work. From the perspective of an open source maintainer I want to help you achieve this goal."
      image={<div style={{ height: `250px`, width: `250px`, backgroundColor: `white` }} />}
    />
  </CategoryView>
)

export default Community

export const query = graphql`
  {
    posts: allPost(
      filter: { published: { eq: true }, category: { name: { eq: "Community" } } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...CardPostInformation
      }
      totalCount
    }
  }
`
