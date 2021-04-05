import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Container, Text, Divider, Flex, Tag, TagLabel, Grid, Box, Link as ExternalLink } from "@chakra-ui/react"
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
    parent: {
      parent: {
        relativePath: string
      }
    }
  }
}

const getTwitterShareLink = (path: string): string =>
  `https://www.twitter.com/search?q=${encodeURIComponent(`https://www.lekoarts.de${path}`)}`

const getGitHubEditLink = (path: string): string =>
  `https://github.com/LekoArts/portfolio-v2/edit/master/www/content/garden/${path}`

const Garden: React.FC<PageProps<DataProps>> = ({ data: { garden }, location: { pathname } }) => (
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
        {garden.slug}
        <Grid gridGap={2} gridTemplateColumns={[`1fr`, null, `1fr auto`]}>
          <Text>
            Created {garden.date} – Last Updated {garden.lastUpdated}
          </Text>
          <Flex flexWrap="wrap" justifyContent={[`flex-start`, null, `flex-end`]}>
            {garden.tags.map((tag) => (
              <Box as="span" ml={2} _first={{ ml: 0 }} key={tag}>
                {tag}
              </Box>
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
        <div>
          <ExternalLink href={getGitHubEditLink(garden.parent.parent.relativePath)}>Edit on GitHub</ExternalLink> -{` `}
          <ExternalLink href={getTwitterShareLink(pathname)}>Discuss on Twitter</ExternalLink>
        </div>
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
      ... on MdxGarden {
        parent {
          ... on Mdx {
            parent {
              ... on File {
                relativePath
              }
            }
          }
        }
      }
    }
  }
`
