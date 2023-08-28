import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { Layout } from "../components/blocks/layout"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { WritingSubNavigation } from "../components/writing/subnavigation"
import { Heading, Text } from "../components/typography"
import { ExternalLink, Link, Box, Container } from "../components/primitives"
import { Card } from "../components/writing/card"
import { SEO } from "../components/seo"
import { paddingResponsiveArrays } from "../styles/tokens/space"
import { cardGridStyle } from "./writing.css"

type WritingProps = {
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
}

const Writing: React.FC<PageProps<WritingProps>> = ({ data: { posts } }) => (
  <Layout subnavigation={<WritingSubNavigation />}>
    <SkipNavContent>
      <Container py={paddingResponsiveArrays.paddingMedium}>
        <Box display="flex" flexDirection="column" gap="20" alignItems="center">
          <Box display="flex" flexDirection="column" gap="3" alignItems="center">
            <Heading as="h1">Writing</Heading>
            <Text variant="prominent" textAlign="center" style={{ maxWidth: `45ch` }}>
              So far I’ve written {posts.totalCount} longform tutorials & articles. For more compact content visit my
              {` `}
              <Link to="/garden">Digital Garden</Link>. <ExternalLink href="/rss.xml">RSS</ExternalLink>.
            </Text>
          </Box>
          <Box gap="8" className={cardGridStyle}>
            {posts.nodes.map((post) => (
              <Card
                key={post.slug}
                slug={post.slug}
                title={post.title}
                subtitle={post.subtitle}
                description={post.description}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </SkipNavContent>
  </Layout>
)

export default Writing

export const Head = () => (
  <SEO title="Writing" pathname="/writing/" breadcrumbListItems={[{ name: `Writing`, url: `/writing/` }]} />
)

export const query = graphql`
  {
    posts: allPost(filter: { published: { eq: true } }, sort: { date: DESC }) {
      nodes {
        ...CardPostInformation
      }
      totalCount
    }
  }
`
