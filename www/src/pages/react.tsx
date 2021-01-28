/* eslint react/jsx-wrap-multilines: 0 */

import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { Link } from "@chakra-ui/react"
import CategoryHero from "../components/writing/category-hero"
import CategoryView from "../components/writing/category-view"

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
}

const ReactCategory: React.FC<PageProps<ReactProps>> = ({ data: { posts } }) => (
  <CategoryView posts={posts}>
    <CategoryHero
      bgGradient="linear(to-t, cyan.400, cyan.900)"
      title="React"
      description={
        <React.Fragment>
          <Link href="https://reactjs.org/">React</Link> is a JavaScript library for building user interfaces. I write
          about the ecosystem and its tools, about code patterns, and React in general.
        </React.Fragment>
      }
      image={<div style={{ height: `250px`, width: `250px`, backgroundColor: `white` }} />}
    />
  </CategoryView>
)

export default ReactCategory

export const query = graphql`
  {
    posts: allPost(
      filter: { published: { eq: true }, category: { name: { eq: "React" } } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...CardPostInformation
      }
      totalCount
    }
  }
`
