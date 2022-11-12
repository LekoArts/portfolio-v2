import * as React from "react"
import { graphql, PageProps } from "gatsby"
import { Layout } from "../components/blocks/layout"
import { Link, ToggleButton, Box, Spacer, SVGIconNames, SVGIcon, Container } from "../components/primitives"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Heading, Text } from "../components/typography"
import { SEO } from "../components/seo"
import { useQueryStringReducer } from "../hooks/use-query-string-reducer"
import { queryStringIso } from "../utils/query-string-iso"
import {
  gardenItemStyle,
  gardenItemWrapperStyle,
  iconWrapperStyle,
  tagCloseIconStyle,
  tagStyle,
  wrapListStyle,
} from "./garden.css"
import { composeClassNames } from "../utils/box"
import { paddingResponsiveArrays } from "../styles/tokens/space"

type DataProps = {
  garden: {
    group: Array<{
      title: string
    }>
    nodes: Array<{
      title: string
      slug: string
      icon: SVGIconNames
      lastUpdated: string
      tags: Array<string>
    }>
  }
}

interface IState {
  tags: Array<string>
}

type Action = { type: `ADD_TAG`; payload: string } | { type: `REMOVE_TAG`; payload: string }

const initialState: IState = {
  tags: [],
}

const reducer = (state: IState, action: Action) => {
  switch (action.type) {
    case `ADD_TAG`:
      return { ...state, tags: state.tags.concat(action.payload) }
    case `REMOVE_TAG`:
      return { ...state, tags: state.tags.filter((tag) => tag !== action.payload) }
    default:
      throw new Error(`Unknown action passed to filter reducer`)
  }
}

const Garden: React.FC<PageProps<DataProps>> = ({ data: { garden }, location }) => {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])
  const [state, dispatch] = useQueryStringReducer<IState, Action>({
    initialState,
    location,
    reducer,
    // @ts-ignore - Somehow doesn't work
    iso: queryStringIso,
  })

  return (
    <Layout>
      <SkipNavContent>
        <Container py={paddingResponsiveArrays.paddingSmall}>
          <Heading as="h1">Digital Garden</Heading>
          <Text variant="prominent">
            <Link to="/garden/what-is-a-digital-garden" color="heading">
              What is a Digital Garden?
            </Link>
            {` `}
            Select tags to filter posts:
          </Text>
          <Spacer size="6" axis="vertical" />
          <div className={wrapListStyle}>
            {garden.group.map((tag) => {
              const isActive = state.tags.includes(tag.title) && isMounted

              return (
                <ToggleButton
                  key={tag.title}
                  isSelected={isActive}
                  onChange={() => {
                    if (state.tags.includes(tag.title)) {
                      dispatch({ type: `REMOVE_TAG`, payload: tag.title })
                    } else {
                      dispatch({ type: `ADD_TAG`, payload: tag.title })
                    }
                  }}
                  className={composeClassNames(tagStyle, isActive ? `active` : ``)}
                >
                  <>
                    {tag.title}
                    {isActive && (
                      <span className={tagCloseIconStyle} aria-hidden>
                        <SVGIcon id="close" width="100%" height="100%" />
                      </span>
                    )}
                  </>
                </ToggleButton>
              )
            })}
          </div>
          <Spacer size="20" axis="vertical" />
          <div className={gardenItemWrapperStyle}>
            {garden.nodes
              .filter(({ tags = [] }) => {
                if (!isMounted) return true
                if (state.tags.length === 0) {
                  return true
                }
                return state.tags.some((tag) => tags.includes(tag))
              })
              .map((post, index) => (
                <React.Fragment key={post.slug}>
                  <Link to={post.slug} p={[`2`, null, null, `6`]} className={gardenItemStyle}>
                    <div className={iconWrapperStyle}>
                      <SVGIcon id={post.icon} width="100%" height="100%" />
                    </div>
                    <div>
                      <Box as="h2" fontSize={[`md`, null, null, `lg`, `lgx`]} fontWeight="medium" color="heading">
                        {post.title}
                      </Box>
                      <Text fontSize={[`sm`, null, null, `md`]}>{post.lastUpdated}</Text>
                    </div>
                    <span>
                      <SVGIcon id="arrow-right" height="1.25em" width="1.25em" />
                    </span>
                  </Link>
                  {index !== garden.nodes.length - 1 && (
                    <Spacer axis="horizontal" size="full" bg="divider" border="none" />
                  )}
                </React.Fragment>
              ))}
          </div>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default Garden

export const Head = () => (
  <SEO
    title="Digital Garden"
    pathname="/garden"
    description="I understand my Digital Garden as a collection of free form, interconnected & evolving ideas that grow over time. Like plants grow in a real-world garden."
    image="/social/digital-garden.png"
    breadcrumbListItems={[{ name: `Digital Garden`, url: `/garden` }]}
  />
)

export const query = graphql`
  {
    garden: allGarden(sort: { lastUpdated: DESC }) {
      group(field: { tags: SELECT }) {
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
