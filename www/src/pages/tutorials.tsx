import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { CategoryHero } from "../components/writing/category-hero"
import { CategoryView } from "../components/writing/category-view"
import { SEO } from "../components/seo"

type TutorialsProps = {
  posts: {
    nodes: {
      title: string
      date: string
      slug: string
      subtitle: string
      description: string
    }[]
  }
}

const Tutorials: React.FC<PageProps<TutorialsProps>> = ({ data: { posts } }) => {
  const tutorialsTitle = `Tutorials`
  const tutorialsDescription = `Tutorials across different categories in a longform format & with interactive elements`

  return (
    <CategoryView posts={posts}>
      <SEO
        title={tutorialsTitle}
        description={tutorialsDescription}
        breadcrumbListItems={[{ name: `Tutorials`, url: `/tutorials` }]}
      />
      <CategoryHero
        bgGradient="linear(to-t, blueGray.600, blueGray.900)"
        title={tutorialsTitle}
        description={tutorialsDescription}
      />
    </CategoryView>
  )
}

export default Tutorials

export const query = graphql`
  {
    posts: allPost(filter: { published: { eq: true }, type: { eq: tutorial } }, sort: { fields: date, order: DESC }) {
      nodes {
        ...CardPostInformation
      }
    }
  }
`
