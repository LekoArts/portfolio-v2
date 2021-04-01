import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { Container, useBreakpointValue } from "@chakra-ui/react"
import { Layout } from "../components/blocks/layout"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Prose } from "../components/typography/prose"
import { SEO } from "../components/seo"

type DataProps = {
  garden: {
    title: string
    slug: string
    icon: string
    lastUpdated: string
    date: string
    tags: string[]
    timeToRead: number
    excerpt: string
  }
}

const Garden: React.FC<PageProps<DataProps>> = ({ data: { garden } }) => {
  const variant = useBreakpointValue([`sm`, `default`, `default`, `lg`, `xl`]) as "sm" | "default" | "lg" | "xl"

  return (
    <Layout>
      <SEO title={garden.title} description={garden.excerpt}>
        <meta name="twitter:label1" value="Time To Read" />
        <meta name="twitter:data1" value={`${garden.timeToRead} Minutes`} />
        <meta name="twitter:label2" value="Category" />
        <meta name="twitter:data2" value={garden.icon} />
        <meta name="article:published_time" content={garden.date} />
        <meta name="article:modified_time" content={garden.lastUpdated} />
      </SEO>
      <Container variant="proseRoot">
        <SkipNavContent>
          <Prose variant={variant}>
            <pre>{JSON.stringify(garden, null, 2)}</pre>
          </Prose>
        </SkipNavContent>
      </Container>
    </Layout>
  )
}

export default Garden

export const query = graphql`
  query GardenTemplate($slug: String!) {
    garden(slug: { eq: $slug }) {
      title
      slug
      icon
      lastUpdated
      date
      tags
      timeToRead
      excerpt
    }
  }
`
