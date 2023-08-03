import * as React from "react"
import { PageProps, graphql, HeadFC } from "gatsby"
import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image"
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
    image: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
}

const ReactCategory: React.FC<PageProps<DataProps>> = ({ data: { posts, category } }) => (
  <CategoryView posts={posts}>
    <CategoryHero
      bgGradient={category.gradient}
      title={category.name}
      description={category.description}
      image={<GatsbyImage alt="" image={category.image.childImageSharp.gatsbyImageData} />}
    />
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
      image {
        childImageSharp {
          gatsbyImageData(
            width: 350
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            quality: 100
          )
        }
      }
    }
    posts: allPost(filter: { published: { eq: true }, category: { name: { eq: $name } } }, sort: { date: DESC }) {
      nodes {
        ...CardPostInformation
      }
      totalCount
    }
  }
`
