import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { Container } from "@chakra-ui/react"
import { Layout } from "../components/blocks/layout"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Prose } from "../components/typography/prose"
import { SEO } from "../components/seo"

type DataProps = {
  post: {
    slug: string
    title: string
    date: string
    description: string
    excerpt: string
    lastUpdated: string
    subtitle: string
    timeToRead: string
    category: {
      name: string
      slug: string
    }
  }
}

const Garden: React.FC<PageProps<DataProps>> = ({ data: { post } }) => (
  <Layout>
    <SEO title={post.title} description={post.description ? post.description : post.excerpt}>
      <meta name="twitter:label1" value="Time To Read" />
      <meta name="twitter:data1" value={`${post.timeToRead} Minutes`} />
      <meta name="twitter:label2" value="Category" />
      <meta name="twitter:data2" value={post.category.name} />
      <meta name="article:published_time" content={post.date} />
      <meta name="article:modified_time" content={post.lastUpdated} />
    </SEO>
    <Container variant="proseRoot">
      <SkipNavContent>
        <Prose>
          <h1>Tutorial Template</h1>
          <pre>{JSON.stringify(post, null, 2)}</pre>
        </Prose>
      </SkipNavContent>
    </Container>
  </Layout>
)

export default Garden

export const query = graphql`
  query TutorialTemplate($slug: String!) {
    post(slug: { eq: $slug }) {
      slug
      title
      date
      description
      excerpt
      lastUpdated
      subtitle
      timeToRead
      category {
        name
        slug
      }
    }
  }
`
