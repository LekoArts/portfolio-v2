import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { Container, VStack, Text, Badge } from "@chakra-ui/react"
import Layout from "../components/blocks/layout"
import FullWidthContainer from "../components/blocks/full-width-container"
import { SkipNavContent } from "../components/a11y/skip-nav"
import Heading from "../components/heading"

type DataProps = {
  posts: {
    nodes: {
      title: string
      description: string
      slug: string
    }[]
  }
}

const Index: React.FC<PageProps<DataProps>> = ({ data }) => {
  const [firstPost, ...rest] = data.posts.nodes
  const otherPosts = [...rest]

  return (
    <Layout>
      <SkipNavContent>
        <Container>
          <VStack spacing="5" py={[20, 24, null, 28, 32]}>
            <Text variant="heading" textStyle="h1">
              Hi, I’m Lennart!
            </Text>
            <Text variant="prominent" maxWidth="45ch" textAlign="center">
              <strong>Software Engineer</strong> from Darmstadt, Germany. <br />
              I’m passionate about working on open source products & building thriving communities around them.
            </Text>
            <Text variant="prominent" maxWidth="40ch" textAlign="center">
              I’m currently working remotely at <a href="https://www.gatsbyjs.com">Gatsby</a> on the open source
              project.
            </Text>
          </VStack>
        </Container>
        <FullWidthContainer variant="light">
          <VStack alignItems="flex-start">
            <VStack alignItems="flex-start">
              <Badge variant="light">Latest Post</Badge>
              <Heading as="h2">{firstPost.title}</Heading>
              <Text>{firstPost.description}</Text>
              <div>{firstPost.slug}</div>
            </VStack>
            <div>test123</div>
          </VStack>
        </FullWidthContainer>
      </SkipNavContent>
    </Layout>
  )
}

export default Index

export const query = graphql`
  {
    posts: allPost(sort: { fields: date, order: ASC }, limit: 4) {
      nodes {
        title
        description
        slug
      }
    }
  }
`
