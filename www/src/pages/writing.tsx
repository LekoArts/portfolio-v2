import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { Container, Stack, Text, Grid, Link as ChakraLink } from "@chakra-ui/react"
import { Layout } from "../components/blocks/layout"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { WritingSubNavigation } from "../components/writing/subnavigation"
import { Heading } from "../components/typography/heading"
import { Link } from "../components/link"
import { space } from "../constants/space"
import { Card } from "../components/writing/card"
import { SEO } from "../components/seo"

type WritingProps = {
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

const Writing: React.FC<PageProps<WritingProps>> = ({ data: { posts } }) => (
  <Layout subnavigation={<WritingSubNavigation />}>
    <SEO title="Writing" breadcrumbListItems={[{ name: `Writing`, url: `/writing` }]} />
    <SkipNavContent>
      <Container py={space.paddingMedium}>
        <Stack spacing="20" align="center">
          <Stack spacing="3" align="center">
            <Heading as="h1">Writing</Heading>
            <Text variant="prominent" maxWidth="45ch" textAlign="center">
              So far I’ve written {posts.totalCount} longform tutorials & articles. For more compact content visit my
              {` `}
              <Link to="/garden">Digital Garden</Link>. <ChakraLink href="/rss.xml">RSS</ChakraLink>.
            </Text>
          </Stack>
          <Grid
            gridTemplateColumns={[`1fr`, null, `repeat(2, 1fr)`]}
            gap={8}
            width={[`100%`, null, null, `calc(100% + 3rem)`]}
          >
            {posts.nodes.map((post) => (
              <Card
                key={post.slug}
                slug={post.slug}
                title={post.title}
                subtitle={post.subtitle}
                description={post.description}
              />
            ))}
          </Grid>
        </Stack>
      </Container>
    </SkipNavContent>
  </Layout>
)

export default Writing

export const query = graphql`
  {
    posts: allPost(filter: { published: { eq: true } }, sort: { fields: date, order: DESC }) {
      nodes {
        ...CardPostInformation
      }
      totalCount
    }
  }
`
