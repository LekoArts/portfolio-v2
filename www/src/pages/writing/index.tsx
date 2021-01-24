import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { Container, VStack, Text, Grid, Box, useColorModeValue } from "@chakra-ui/react"
import Layout from "../../components/blocks/layout"
import { SkipNavContent } from "../../components/a11y/skip-nav"
import WritingSubNavigation from "../../components/writing/subnavigation"
import Heading from "../../components/heading"
import Link from "../../components/link"
import Spacer from "../../components/blocks/spacer"

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

const Index: React.FC<PageProps<WritingProps>> = ({ data: { posts } }) => {
  const cardBg = useColorModeValue(`white`, `blueGray.800`)

  return (
    <Layout subnavigation={<WritingSubNavigation />}>
      <SkipNavContent>
        <Container>
          <VStack spacing="3" py={[16, 20, null, 24, 28]}>
            <Heading as="h1">Writing</Heading>
            <Text variant="prominent" maxWidth="45ch" textAlign="center">
              So far I’ve written {posts.totalCount} longform tutorials & articles. For more compact content visit my
              {` `}
              <Link to="/garden">Digital Garden</Link>.
            </Text>
          </VStack>
          <Grid gridTemplateColumns="repeat(2, 1fr)" gap={8} mx={[`0`, null, null, `-6`]}>
            {posts.nodes.map((post) => (
              <Box p={6} borderRadius="lg" boxShadow="lg" bg={cardBg} key={post.slug}>
                <Link to={post.slug}>
                  <h2>{post.title}</h2>
                  {post.subtitle && <h3>{post.subtitle}</h3>}
                  <Text>{post.description}</Text>
                </Link>
              </Box>
            ))}
          </Grid>
        </Container>
      </SkipNavContent>
      <Spacer size={[24, null, null, 36, 40]} axis="vertical" />
    </Layout>
  )
}

export default Index

export const query = graphql`
  {
    posts: allPost(sort: { fields: date, order: DESC }) {
      nodes {
        title
        date
        slug
        subtitle
        description
      }
      totalCount
    }
  }
`
