import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FaStar } from "react-icons/fa"
import {
  Container,
  Stack,
  Text,
  Badge,
  Box,
  Flex,
  Grid,
  useColorModeValue,
  Link as ChakraLink,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react"
import { useReducedMotion } from "framer-motion"
import { shuffle } from "utils"
import Link from "../components/link"
import Layout from "../components/blocks/layout"
import MotionBox from "../components/blocks/motion-box"
import FullWidthContainer from "../components/blocks/full-width-container"
import Spacer from "../components/blocks/spacer"
import { SkipNavContent } from "../components/a11y/skip-nav"
import Heading from "../components/heading"
import { PrimaryButton, SubtleButton } from "../components/buttons"
import space from "../styles/space"
import { cardVariants, prefersReducedMotion } from "../styles/motion"

type RepositoryInfo = {
  stargazerCount: number
  description: string
  name: string
  url: string
}

type DataProps = {
  posts: {
    nodes: {
      title: string
      description: string
      slug: string
    }[]
  }
  primaryRepo: {
    repository: RepositoryInfo
  }
  secondaryRepo: {
    repository: RepositoryInfo
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

const openSourceRepos = [
  {
    name: `bare-instagram`,
    url: `https://github.com/LekoArts/bare-instagram`,
  },
  {
    name: `thanks-contributors`,
    url: `https://github.com/LekoArts/thanks-contributors`,
  },
  {
    name: `lekoarts-stats`,
    url: `https://github.com/LekoArts/lekoarts-stats`,
  },
  {
    name: `portfolio`,
    url: `https://github.com/LekoArts/portfolio-v2`,
  },
]

const Index: React.FC<PageProps<DataProps>> = ({ data }) => {
  const primaryRepoBg = useColorModeValue(`brand.primaryBg`, `brand.dark.primaryBg`)
  const secondaryRepoBg = useColorModeValue(`blueGray.100`, `blueGray.800`)
  const shouldReduceMotion = useReducedMotion()
  const [firstPost, ...rest] = data.posts.nodes
  const otherPosts = [...rest]
  const buildUnix = parseInt(data.site.buildTime, 10)
  const gradients = shuffle(cardGradients, buildUnix, 3)

  const primRepo = data.primaryRepo.repository
  const secRepo = data.secondaryRepo.repository

  return (
    <Layout>
      <SkipNavContent>
        <FullWidthContainer variant="hero">
          <Stack align="center" spacing="5" py={space.paddingLarge}>
            <Heading as="h1">Hi, I’m Lennart!</Heading>
            <Text variant="prominent" maxWidth="45ch" textAlign="center">
              <strong>Software Engineer</strong> from Darmstadt, Germany. <br />
              I’m passionate about working on open source products & building thriving communities around them.
            </Text>
            <Text variant="prominent" maxWidth="40ch" textAlign="center">
              I’m currently working remotely at <ChakraLink href="https://www.gatsbyjs.com">Gatsby</ChakraLink> on the
              open source project.
            </Text>
          </Stack>
        </FullWidthContainer>
        <FullWidthContainer variant="light">
          <Stack alignItems="flex-start" spacing={24} py={space.paddingMedium}>
            <Stack alignItems="flex-start" spacing={[6, 8]}>
              <Badge variant="light">Latest Post</Badge>
              <Box>
                <Heading as="h2">{firstPost.title}</Heading>
                <Text variant="lightContainer">{firstPost.description}</Text>
              </Box>
              <PrimaryButton to={firstPost.slug}>Continue Reading</PrimaryButton>
            </Stack>
            <Stack direction="column" width="100%" spacing={6}>
              <Flex justifyContent="space-between" alignItems="center">
                <Badge variant="light">More Posts</Badge>
                <SubtleButton to="/writing/">Read all</SubtleButton>
              </Flex>
              <Grid templateColumns={[`repeat(1, 1fr)`, null, `repeat(3, 1fr)`]} gap={[4, null, 8]}>
                {otherPosts.map((item, index) => (
                  <Link
                    to={item.slug}
                    key={item.slug}
                    borderRadius="lg"
                    _hover={{ textDecoration: shouldReduceMotion ? `underline` : `none` }}
                  >
                    <MotionBox
                      variants={shouldReduceMotion ? prefersReducedMotion.cardVariants : cardVariants}
                      initial="beforeHover"
                      whileHover="onHover"
                      bgGradient={gradients[index]}
                      p={4}
                      borderRadius="lg"
                      height={[`150px`, null, null, `200px`, `250px`]}
                      boxShadow="lg"
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
            <Stack direction="column" width="100%" spacing={6}>
              <Flex justifyContent="space-between" alignItems="center">
                <Badge variant="light">Art</Badge>
                <SubtleButton to="/art/">See all art</SubtleButton>
              </Flex>
              <Grid gridTemplateColumns={[`repeat(1, 1fr)`, null, `repeat(2, 1fr)`]} gap={[4, null, 8]}>
                <Link
                  to="/art/photography/"
                  borderRadius="lg"
                  _hover={{ boxShadow: shouldReduceMotion ? `outline` : null }}
                >
                  <MotionBox
                    variants={shouldReduceMotion ? prefersReducedMotion.cardVariants : cardVariants}
                    initial="beforeHover"
                    whileHover="onHover"
                    sx={{
                      ".gatsby-image-wrapper": { borderRadius: `lg`, height: `100%`, width: `100%` },
                      boxShadow: `lg`,
                      height: `100%`,
                      width: `100%`,
                      borderRadius: `lg`,
                    }}
                  >
                    <StaticImage
                      src="../images/pages-index-photography-preview.jpg"
                      alt=""
                      layout="constrained"
                      quality={90}
                      formats={[`auto`, `webp`, `avif`]}
                      placeholder="blurred"
                      width={500}
                      aspectRatio={16 / 9}
                    />
                  </MotionBox>
                </Link>
                <Link to="/art/3d/" borderRadius="lg" _hover={{ boxShadow: shouldReduceMotion ? `outline` : null }}>
                  <MotionBox
                    variants={shouldReduceMotion ? prefersReducedMotion.cardVariants : cardVariants}
                    initial="beforeHover"
                    whileHover="onHover"
                    sx={{
                      ".gatsby-image-wrapper": { borderRadius: `lg`, height: `100%`, width: `100%` },
                      boxShadow: `lg`,
                      height: `100%`,
                      width: `100%`,
                      borderRadius: `lg`,
                    }}
                  >
                    <StaticImage
                      src="../images/pages-index-3d-preview.jpg"
                      alt=""
                      layout="constrained"
                      quality={90}
                      formats={[`auto`, `webp`, `avif`]}
                      placeholder="blurred"
                      width={500}
                      aspectRatio={16 / 9}
                    />
                  </MotionBox>
                </Link>
              </Grid>
            </Stack>
          </Stack>
        </FullWidthContainer>
        <Container>
          <Flex alignItems="center" flexDirection="column" py={space.paddingLarge}>
            <Heading as="h2">Open Source</Heading>
            <Text variant="prominent" maxWidth="40ch" textAlign="center">
              Working in the open, interacting with the community & building projects that are accessible to everyone
              fill me with joy.
            </Text>
            <Spacer axis="vertical" size={20} />
            <Stack direction="column" width="100%" spacing={6}>
              <Flex justifyContent="space-between" alignItems="center">
                <Badge variant="dark">Featured Projects</Badge>
                <SubtleButton isExternal to="https://www.github.com/LekoArts">
                  GitHub
                </SubtleButton>
              </Flex>
              <Grid gridTemplateColumns={[`1fr`, null, null, `2fr 1fr`]} gap={6}>
                <Box bg={primaryRepoBg} color="#e7f1ff" p={6} borderRadius="lg">
                  <Flex flexDirection="row" justifyContent="space-between" mb={6}>
                    <ChakraLink
                      fontSize={[`lg`, null, null, null, `21px`]}
                      color="white"
                      fontWeight="bold"
                      href={primRepo.url}
                    >
                      {primRepo.name}
                    </ChakraLink>
                    <Tag variant="subtle" colorScheme="blue">
                      <TagLeftIcon as={FaStar} />
                      <TagLabel>{primRepo.stargazerCount}</TagLabel>
                    </Tag>
                  </Flex>
                  <Text>{primRepo.description}</Text>
                </Box>
                <Box bg={secondaryRepoBg} p={6} borderRadius="lg">
                  <Flex flexDirection="row" justifyContent="space-between" mb={6}>
                    <ChakraLink fontSize={[`lg`, null, null, null, `21px`]} fontWeight="bold" href={secRepo.url}>
                      {secRepo.name}
                    </ChakraLink>
                    <Tag variant="subtle" colorScheme="gray">
                      <TagLeftIcon as={FaStar} />
                      <TagLabel>{secRepo.stargazerCount}</TagLabel>
                    </Tag>
                  </Flex>
                  <Text>{secRepo.description}</Text>
                </Box>
              </Grid>
              <Flex justifyContent="space-between" flexWrap="wrap">
                {openSourceRepos.map((repo) => (
                  <ChakraLink key={repo.url} href={repo.url}>
                    {repo.name}
                  </ChakraLink>
                ))}
              </Flex>
            </Stack>
          </Flex>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default Index

export const query = graphql`
  {
    posts: allPost(filter: { published: { eq: true } }, sort: { fields: date, order: DESC }, limit: 4) {
      nodes {
        title
        description
        slug
      }
    }
    primaryRepo: github {
      repository(name: "gatsby-themes", owner: "LekoArts") {
        stargazerCount
        description
        name
        url
      }
    }
    secondaryRepo: github {
      repository(name: "figma-theme-ui", owner: "LekoArts") {
        stargazerCount
        description
        name
        url
      }
    }
    site {
      buildTime(formatString: "X")
    }
  }
`
