import * as React from "react"
import { PageProps, graphql, Link } from "gatsby"
import { Container, VStack, Stack, Text, Badge, Box, Flex, Grid } from "@chakra-ui/react"
import { shuffle } from "utils"
import Layout from "../components/blocks/layout"
import MotionBox from "../components/blocks/motion-box"
import FullWidthContainer from "../components/blocks/full-width-container"
import { SkipNavContent } from "../components/a11y/skip-nav"
import Heading from "../components/heading"
import { PrimaryButton, SubtleButton } from "../components/buttons"

type DataProps = {
  posts: {
    nodes: {
      title: string
      description: string
      slug: string
    }[]
  }
  site: {
    buildTime: string
  }
}

const cardGradients = [
  `linear(to-tr, violet.800, violet.300)`,
  `linear(to-tr, indigo.800, indigo.300)`,
  `linear(to-tr, blue.800, blue.300)`,
  `linear(to-tr, teal.800, teal.300)`,
  `linear(to-tr, lime.800, lime.300)`,
  `linear(to-tr, amber.800, amber.300)`,
  `linear(to-tr, coolGray.700, coolGray.300)`,
  `linear(to-tr, purple.800, violet.300)`,
  `linear(to-tr, indigo.800, lightBlue.300)`,
  `linear(to-tr, teal.800, green.300)`,
  `linear(to-tr, amber.800, red.300)`,
]

const Index: React.FC<PageProps<DataProps>> = ({ data }) => {
  const [firstPost, ...rest] = data.posts.nodes
  const otherPosts = [...rest]
  const buildUnix = parseInt(data.site.buildTime, 10)
  const gradients = shuffle(cardGradients, buildUnix, 3)

  return (
    <Layout>
      <SkipNavContent>
        <Container>
          <VStack spacing="5" py={[20, 24, null, 32, 36]}>
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
          <VStack alignItems="flex-start" spacing={24} py={[20, 24, null, 32, 36]}>
            <VStack alignItems="flex-start" spacing={[6, 8]}>
              <Badge variant="light">Latest Post</Badge>
              <Box>
                <Heading as="h2">{firstPost.title}</Heading>
                <Text variant="lightContainer" mt={6}>
                  {firstPost.description}
                </Text>
              </Box>
              <PrimaryButton to={firstPost.slug}>Continue Reading</PrimaryButton>
            </VStack>
            <Stack direction="column" width="100%" spacing={6}>
              <Flex justifyContent="space-between" alignItems="center">
                <Badge variant="light">More Posts</Badge>
                <SubtleButton to="/writing">Read all</SubtleButton>
              </Flex>
              <Grid templateColumns={[`repeat(1, 1fr)`, null, `repeat(3, 1fr)`]} gap={[4, null, 8]}>
                {otherPosts.map((item, index) => (
                  <Link to={item.slug} key={item.slug}>
                    <MotionBox
                      bgGradient={gradients[index]}
                      p={4}
                      borderRadius="lg"
                      height={[`150px`, null, null, `200px`, `250px`]}
                      boxShadow="lg"
                      whileHover={{
                        scale: 1.025,
                        boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`,
                      }}
                      whileTap={{ scale: 0.975 }}
                      display="flex"
                      alignItems="flex-end"
                      color="white"
                      fontSize={[`lg`, null, `md`, `18px`, `21px`]}
                      sx={{ textShadow: `0 1px 2px rgba(0, 0, 0, 0.25)` }}
                    >
                      {item.title}
                    </MotionBox>
                  </Link>
                ))}
              </Grid>
            </Stack>
          </VStack>
        </FullWidthContainer>
        <Container>
          <p style={{ padding: `6rem 0` }}>other stuff goes here</p>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default Index

export const query = graphql`
  {
    posts: allPost(sort: { fields: date, order: DESC }, limit: 4) {
      nodes {
        title
        description
        slug
      }
    }
    site {
      buildTime(formatString: "X")
    }
  }
`
