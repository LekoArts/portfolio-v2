import * as React from "react"
import { graphql, PageProps } from "gatsby"
import { Container, Tag, TagLabel, TagCloseButton, Wrap, WrapItem, Grid, Box } from "@chakra-ui/react"
import { Layout } from "../components/blocks/layout"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { space } from "../constants/space"
import { Heading } from "../components/typography/heading"

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

  return (
    <Layout>
      <SkipNavContent>
        <Container py={space.paddingSmall}>
          <Heading as="h1">Digital Garden</Heading>
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
          <Grid pt={16} gridTemplateColumns="1fr 1fr 1fr" gap={8}>
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
                <Box key={post.slug} display="flex" flexDirection="column">
                  <Heading as="h2">{post.title}</Heading>
                  <p>{post.lastUpdated}</p>
                </Box>
              ))}
          </Grid>
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
