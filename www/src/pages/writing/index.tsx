import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { Container, VStack, Text, Grid, Box, useColorModeValue } from "@chakra-ui/react"
import Layout from "../../components/blocks/layout"
import { SkipNavContent } from "../../components/a11y/skip-nav"
import WritingSubNavigation from "../../components/writing/subnavigation"
import Heading from "../../components/heading"
import Link from "../../components/link"
import Spacer from "../../components/blocks/spacer"
import space from "../../styles/space"
import MotionBox from "../../components/blocks/motion-box"
import { cardVariants } from "../../styles/motion"

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
  const headingColor = useColorModeValue(`black`, `white`)
  const headingHoverColor = useColorModeValue(`brand.primary`, `brand.dark.primary`)
  const subheadingColor = useColorModeValue(`blueGray.900`, `blueGray.400`)

  return (
    <Layout subnavigation={<WritingSubNavigation />}>
      <SkipNavContent>
        <Container>
          <VStack spacing="3" py={space.paddingMedium}>
            <Heading as="h1">Writing</Heading>
            <Text variant="prominent" maxWidth="45ch" textAlign="center">
              So far I’ve written {posts.totalCount} longform tutorials & articles. For more compact content visit my
              {` `}
              <Link to="/garden">Digital Garden</Link>.
            </Text>
          </VStack>
          <Grid gridTemplateColumns={[`1fr`, null, `repeat(2, 1fr)`]} gap={8} mx={[`0`, null, null, `-6`]}>
            {posts.nodes.map((post) => (
              <MotionBox
                variants={cardVariants}
                initial="beforeHover"
                whileHover="onHover"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
                bg={cardBg}
                key={post.slug}
              >
                <Link to={post.slug} _hover={{ textDecoration: `none`, h2: { color: headingHoverColor } }}>
                  <Text
                    as="h2"
                    fontSize="21px"
                    fontWeight="bold"
                    color={headingColor}
                    transition="color 0.3s ease-in-out"
                  >
                    {post.title}
                  </Text>
                  {post.subtitle && (
                    <Text as="h3" fontSize="18px" fontWeight="medium" color={subheadingColor}>
                      {post.subtitle}
                    </Text>
                  )}
                  <Text mt={6}>{post.description}</Text>
                </Link>
              </MotionBox>
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
