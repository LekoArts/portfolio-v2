import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Container, Text } from "@chakra-ui/react"
import {
  ExternalLink,
  Link,
  MotionBox,
  Spacer,
  PrimaryButton,
  SubtleButton,
  Box,
  Badge,
  Tag,
} from "../components/primitives"
import { Layout } from "../components/blocks/layout"
import { FullWidthContainer } from "../components/blocks/full-width-container"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Heading } from "../components/typography/heading"
import { SEO } from "../components/seo"
import { homepage } from "../constants/json-ld"
import { paddingResponsiveArrays } from "../styles/tokens/space"
import {
  gardenBoxStyle,
  postBoxStyle,
  cardLinkStyle,
  cardsGridStyle,
  artGridStyle,
  staticImageOverride,
  repositoriesGridStyle,
} from "./index.css"

type RepositoryInfo = {
  stargazerCount: number
  description: string
  name: string
  url: string
}

type DataProps = {
  posts: {
    nodes: Array<{
      title: string
      description: string
      slug: string
    }>
  }
  garden: {
    nodes: Array<{
      title: string
      slug: string
    }>
  }
  primaryRepo?: {
    repository?: RepositoryInfo
  }
  secondaryRepo?: {
    repository?: RepositoryInfo
  }
}

const cardGradients = [
  `linear-gradient(to right top, #A774F2, #F25D76, #FF964F)`,
  `linear-gradient(to right top, #9B7BFE, #54B5F0, #88F2A9)`,
  `linear-gradient(to right top, #933890, #E08896, #CC98DD, #D1CEE2)`,
  `linear-gradient(to right top, #6666DE, #5778C9, #94D1C9, #A1D8FF)`,
  `linear-gradient(to right top, #3e206d, #af3942, #d66a38, #eacc15)`,
  `linear-gradient(to right top, #511a2a, #cb598d, #b24ecb, #ebb8eb)`,
]

const openSourceRepos = [
  {
    name: `gatsby-source-tmdb`,
    url: `https://github.com/LekoArts/gatsby-source-tmdb`,
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
    name: `portfolio-v2`,
    url: `https://github.com/LekoArts/portfolio-v2`,
  },
]

const Index: React.FC<PageProps<DataProps>> = ({ data }) => {
  const [firstPost, ...rest] = data.posts.nodes
  const otherPosts = [...rest]

  const primRepo = data?.primaryRepo?.repository
  const secRepo = data?.secondaryRepo?.repository

  return (
    <Layout>
      <SkipNavContent>
        <FullWidthContainer variant="hero">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="5"
            py={paddingResponsiveArrays.paddingLarge}
          >
            <Heading as="h1">Hi, I’m Lennart!</Heading>
            <Text variant="prominent" maxWidth="45ch" textAlign="center">
              <strong>Software Engineer</strong> from Darmstadt, Germany. <br />
              I’m passionate about working on open source products & building thriving communities around them.
            </Text>
            <Text variant="prominent" maxWidth="40ch" textAlign="center">
              I’m currently working remotely at <ExternalLink href="https://www.gatsbyjs.com">Gatsby</ExternalLink> on
              the open source project.
            </Text>
          </Box>
        </FullWidthContainer>
        <FullWidthContainer variant="light">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap="24"
            py={paddingResponsiveArrays.paddingMedium}
          >
            <Box display="flex" flexDirection="column" alignItems="flex-start" gap="8">
              <Badge variant="light">Latest Post</Badge>
              <div>
                <Heading as="h2">{firstPost.title}</Heading>
                <Text variant="lightContainer">{firstPost.description}</Text>
              </div>
              <PrimaryButton to={firstPost.slug}>Continue Reading</PrimaryButton>
            </Box>
            <Box display="flex" flexDirection="column" width="full" gap="6">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Badge variant="light">More Posts</Badge>
                <SubtleButton to="/writing">Read all</SubtleButton>
              </Box>
              <Box className={cardsGridStyle}>
                {otherPosts.map((item, index) => (
                  <Link to={item.slug} key={item.slug} borderRadius="lg" className={cardLinkStyle}>
                    <MotionBox
                      p="4"
                      borderRadius="lg"
                      display="flex"
                      alignItems="flex-end"
                      fontSize={[`lg`, null, `md`, `lg`, `lgx`]}
                      className={postBoxStyle}
                      __background={cardGradients[index]}
                    >
                      {item.title}
                    </MotionBox>
                  </Link>
                ))}
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" width="full" gap="6">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Badge variant="light">Digital Garden</Badge>
                <SubtleButton to="/garden">Read all</SubtleButton>
              </Box>
              <Box className={cardsGridStyle}>
                {data.garden.nodes.map((item, index) => (
                  <Link to={item.slug} key={item.slug} borderRadius="lg" className={cardLinkStyle}>
                    <MotionBox
                      p="4"
                      borderRadius="lg"
                      display="flex"
                      alignItems="flex-end"
                      fontSize={[`lg`, null, `md`, `lg`, `lgx`]}
                      className={gardenBoxStyle}
                      __background={cardGradients[index + 3]}
                    >
                      {item.title}
                    </MotionBox>
                  </Link>
                ))}
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" width="full" gap="6">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Badge variant="light">Art</Badge>
                <SubtleButton to="/art">See all art</SubtleButton>
              </Box>
              <Box className={artGridStyle}>
                <Link
                  to="/art/photography"
                  aria-label="View my photography"
                  borderRadius="lg"
                  className={cardLinkStyle}
                >
                  <MotionBox className={staticImageOverride}>
                    <StaticImage
                      src="../assets/images/pages-index-photography-preview.jpg"
                      alt=""
                      layout="constrained"
                      quality={90}
                      formats={[`auto`, `webp`, `avif`]}
                      placeholder="blurred"
                      width={720}
                      aspectRatio={16 / 9}
                    />
                  </MotionBox>
                </Link>
                <Link to="/art/3d" aria-label="View my 3D art" borderRadius="lg" className={cardLinkStyle}>
                  <MotionBox className={staticImageOverride}>
                    <StaticImage
                      src="../assets/images/pages-index-3d-preview.jpg"
                      alt=""
                      layout="constrained"
                      quality={90}
                      formats={[`auto`, `webp`, `avif`]}
                      placeholder="blurred"
                      width={720}
                      aspectRatio={16 / 9}
                    />
                  </MotionBox>
                </Link>
              </Box>
            </Box>
          </Box>
        </FullWidthContainer>
        <Container>
          <Box display="flex" alignItems="center" flexDirection="column" py={paddingResponsiveArrays.paddingLarge}>
            <Heading as="h2">Open Source</Heading>
            <Text variant="prominent" maxWidth="40ch" textAlign="center">
              Working in the open, interacting with the community & building projects that are accessible to everyone
              fill me with joy.
            </Text>
            <Spacer axis="vertical" size="20" />
            <Box display="flex" flexDirection="column" width="full" gap="6">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Badge variant="dark">Featured Projects</Badge>
                <SubtleButton kind="external" to="https://www.github.com/LekoArts">
                  GitHub
                </SubtleButton>
              </Box>
              <Box gap="6" className={repositoriesGridStyle}>
                {primRepo && secRepo ? (
                  <>
                    <Box bg="primaryAsBg" p="6" borderRadius="lg" __color="#e7f1ff">
                      <Box display="flex" flexDirection="row" justifyContent="space-between" mb="6">
                        <ExternalLink
                          fontSize={[`lg`, null, null, null, `lgx`]}
                          fontWeight="bold"
                          href={primRepo.url}
                          __color="white"
                        >
                          {primRepo.name}
                        </ExternalLink>
                        <Tag colorScheme="blue" iconId="star">
                          {primRepo.stargazerCount}
                        </Tag>
                      </Box>
                      <Text>{primRepo.description}</Text>
                    </Box>
                    <Box bg="mutedAsBg" p="6" borderRadius="lg">
                      <Box display="flex" flexDirection="row" justifyContent="space-between" mb="6">
                        <ExternalLink fontSize={[`lg`, null, null, null, `lgx`]} fontWeight="bold" href={secRepo.url}>
                          {secRepo.name}
                        </ExternalLink>
                        <Tag colorScheme="gray" iconId="star">
                          {secRepo.stargazerCount}
                        </Tag>
                      </Box>
                      <Text>{secRepo.description}</Text>
                    </Box>
                  </>
                ) : (
                  <Box p="2" borderRadius="lg">
                    <strong>GITHUB_TOKEN</strong> for gatsby-source-graphql necessary.
                  </Box>
                )}
              </Box>
              <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                {openSourceRepos.map((repo) => (
                  <ExternalLink key={repo.url} href={repo.url} p="2">
                    {repo.name}
                  </ExternalLink>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default Index

export const Head = () => (
  <SEO>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepage) }} />
  </SEO>
)

export const query = graphql`
  {
    posts: allPost(filter: { published: { eq: true } }, sort: { fields: date, order: DESC }, limit: 4) {
      nodes {
        title
        description
        slug
      }
    }
    garden: allGarden(
      limit: 3
      sort: { fields: lastUpdated, order: DESC }
      filter: { slug: { ne: "/garden/what-is-a-digital-garden" } }
    ) {
      nodes {
        title
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
  }
`
