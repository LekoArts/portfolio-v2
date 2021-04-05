import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Container, Text, Divider, Flex, Tag, TagLabel, Grid } from "@chakra-ui/react"
import { Layout } from "../components/blocks/layout"
import { Link } from "../components/link"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Prose } from "../components/typography/prose"
import { SEO } from "../components/seo"
import { Heading } from "../components/typography/heading"
import { Spacer } from "../components/blocks/spacer"

type DataProps = {
  garden: {
    title: string
    slug: string
    body: string
    icon: string
    seoLastUpdated: string
    lastUpdated: string
    seoDate: string
    date: string
    tags: string[]
    timeToRead: number
    excerpt: string
  }
}

const Garden: React.FC<PageProps<DataProps>> = ({ data: { garden } }) => (
  <Layout>
    <SEO title={garden.title} description={garden.excerpt} image="/social/digital-garden.png">
      <meta name="twitter:label1" value="Time To Read" />
      <meta name="twitter:data1" value={`${garden.timeToRead} Minutes`} />
      <meta name="twitter:label2" value="Category" />
      <meta name="twitter:data2" value={garden.icon} />
      <meta name="article:published_time" content={garden.seoDate} />
      <meta name="article:modified_time" content={garden.seoLastUpdated} />
    </SEO>
    <Container variant="proseRoot">
      <SkipNavContent>
        <Heading as="h1">{garden.title}</Heading>
        <Spacer size={6} axis="vertical" />
        <Divider />
        <Spacer size={4} axis="vertical" />
        <Grid gridGap={2} gridTemplateColumns="1fr 200px">
          <Text>
            Created {garden.date} – Last Updated {garden.lastUpdated}
          </Text>
          <Flex>
            {garden.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </Flex>
          <Tag colorScheme="green" justifySelf="flex-start">
            <TagLabel>
              <Link to="/garden">Digital Garden</Link>
            </TagLabel>
          </Tag>
        </Grid>
        <Spacer size={12} axis="vertical" />
        <Prose>
          <MDXRenderer>{garden.body}</MDXRenderer>
        </Prose>
      </SkipNavContent>
    </Container>
  </Layout>
)

export default Garden

export const query = graphql`
  query GardenTemplate($slug: String!) {
    garden(slug: { eq: $slug }) {
      title
      body
      slug
      icon
      seoLastUpdated: lastUpdated
      lastUpdated(formatString: "MMM DD, YYYY")
      seoDate: date
      date(formatString: "MMM DD, YYYY")
      tags
      timeToRead
      excerpt
    }
  }
`
