import * as React from "react"
import { graphql, PageProps } from "gatsby"
import { BsArrowRight } from "react-icons/bs"
import {
  Container,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  Heading as ChakraHeading,
  Stack,
  Text,
  Box,
  useColorModeValue,
  usePrefersReducedMotion,
} from "@chakra-ui/react"
import { Layout } from "../components/blocks/layout"
import { Link } from "../components/link"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { space } from "../constants/space"
import { Heading } from "../components/typography/heading"
import { Spacer } from "../components/blocks/spacer"
import { SEO } from "../components/seo"

type DataProps = {
  garden: {
    group: {
      title: string
    }[]
    nodes: {
      title: string
      slug: string
      icon: string
      lastUpdated: string
      tags: string[]
    }[]
  }
}

interface State {
  tags: string[]
}

type Action = { type: `ADD_TAG`; payload: string } | { type: `REMOVE_TAG`; payload: string }

const initialState: State = {
  tags: [],
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case `ADD_TAG`:
      return { ...state, tags: state.tags.concat(action.payload) }
    case `REMOVE_TAG`:
      return { ...state, tags: state.tags.filter((tag) => tag !== action.payload) }
    default:
      throw new Error(`Unknown action passed to filter reducer`)
  }
}

const Garden: React.FC<PageProps<DataProps>> = ({ data: { garden } }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const prefersReducedMotion = usePrefersReducedMotion()
  const dividerColor = useColorModeValue(`blueGray.100`, `blueGray.800`)
  const bgHoverColor = useColorModeValue(`blueGray.100`, `blueGray.800`)
  const prominentLink = useColorModeValue(`brand.heading`, `brand.dark.heading`)

  return (
    <Layout>
      <SEO
        title="Digital Garden"
        description="I understand my Digital Garden as a collection of free form, interconnected & evolving ideas that grow over time. Like plants grow in a real-world garden."
        image="/social/digital-garden.png"
        breadcrumbListItems={[{ name: `Digital Garden`, url: `/garden` }]}
      />
      <SkipNavContent>
        <Container py={space.paddingSmall}>
          <Heading as="h1">Digital Garden</Heading>
          <Text textStyle="prominent">
            <Link to="/garden/what-is-a-digital-garden" color={prominentLink}>
              What is a Digital Garden?
            </Link>
            {` `}
            Select tags to filter posts:
          </Text>
          <Spacer size={6} axis="vertical" />
          <Wrap>
            {garden.group.map((tag) => {
              const isActive = state.tags.includes(tag.title)

              return (
                <WrapItem
                  as="button"
                  onClick={() => {
                    if (state.tags.includes(tag.title)) {
                      dispatch({ type: `REMOVE_TAG`, payload: tag.title })
                    } else {
                      dispatch({ type: `ADD_TAG`, payload: tag.title })
                    }
                  }}
                  borderRadius="md"
                  _hover={{
                    cursor: `pointer`,
                  }}
                  _focus={{
                    boxShadow: `outline`,
                    outline: `none`,
                  }}
                  key={tag.title}
                >
                  <Tag colorScheme={isActive ? `blue` : `gray`} size="lg">
                    <TagLabel>{tag.title}</TagLabel>
                    {isActive && <TagCloseButton as="span" aria-hidden aria-label="" />}
                  </Tag>
                </WrapItem>
              )
            })}
          </Wrap>
          <Spacer size={20} axis="vertical" />
          <Stack
            spacing={0}
            divider={<Spacer axis="horizontal" size="100%" bg={dividerColor} border="none" />}
            mx={[`-2`, null, null, `-6`]}
          >
            {garden.nodes
              .filter(({ tags = [] }) => {
                if (state.tags.length === 0) {
                  return true
                }
                return state.tags.some((tag) => tags.includes(tag))
              })
              .sort((aPost, bPost) => {
                const a = new Date(aPost.lastUpdated)
                const b = new Date(bPost.lastUpdated)

                // eslint-disable-next-line no-nested-ternary
                return a > b ? -1 : a < b ? 1 : 0
              })
              .map((post) => (
                <Link
                  to={post.slug}
                  key={post.slug}
                  display="grid"
                  gridTemplateColumns={[`25px 1fr 20px`, `35px 1fr 20px`, null, `50px 1fr 24px`]}
                  alignItems="center"
                  gridGap={6}
                  px={[2, null, null, 6]}
                  py={[2, null, null, 6]}
                  borderRadius="lg"
                  _hover={{
                    textDecoration: `none`,
                    backgroundColor: bgHoverColor,
                  }}
                  sx={{
                    span: {
                      transform: `translate3d(0px, 0px, 0px)`,
                      transition: `transform .3s cubic-bezier(.73,.26,.42,1.24)`,
                    },
                    "&:hover": {
                      span: {
                        transform: prefersReducedMotion ? undefined : `translate3d(6px, 0px, 0px)`,
                      },
                    },
                    svg: {
                      height: [`1.25em`, null, null, `1.5em`],
                      width: [`1.25em`, null, null, `1.5em`],
                    },
                  }}
                >
                  <Box width={[25, 35, null, 50]} height={[25, 35, null, 50]}>
                    <img alt="" src={`/icons/${post.icon}.svg`} width="100%" height="100%" />
                  </Box>
                  <Box>
                    <ChakraHeading as="h2" variant="gardenItem">
                      {post.title}
                    </ChakraHeading>
                    <Text fontSize={[`14px`, null, null, `1rem`]}>{post.lastUpdated}</Text>
                  </Box>
                  <span>
                    <BsArrowRight />
                  </span>
                </Link>
              ))}
          </Stack>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default Garden

export const query = graphql`
  {
    garden: allGarden(sort: { fields: lastUpdated, order: DESC }) {
      group(field: tags) {
        title: fieldValue
      }
      nodes {
        title
        slug
        icon
        lastUpdated(formatString: "MMM DD, YYYY")
        tags
      }
    }
  }
`
