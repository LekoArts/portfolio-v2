import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { SEO } from "../../components/seo"
import { Layout } from "../../components/blocks/layout"
import { Heading, Prose, Text } from "../../components/typography"
import { SkipNavContent } from "../../components/a11y/skip-nav"
import { Container, Button, SVGIcon, Spacer, Box } from "../../components/primitives"
import { ArtImage, IArtImageItem } from "../../components/art/art-image"
import {
  explanationLayoutWrapperStyle,
  gridImagesVariants,
  imageWrapperVariants,
  layoutIconStyle,
} from "./photography.css"
import { composeClassNames } from "../../utils/box"
import { ITagState, TagAction, TagGroup, TagGroupItem, initialState, reducer } from "../../components/blocks/tag-group"
import { useQueryStringReducer } from "../../hooks/use-query-string-reducer"
import { queryStringIso } from "../../utils/query-string-iso"

// @ts-ignore
import PhotographyBodyMdx from "../../data/photography-body.mdx"
import { useLocalStorage } from "../../hooks/use-local-storage"

const Images = ({ content, layout }) => (
  <>
    {content.map((img) => (
      <ArtImage
        key={img.photoId}
        alt={img.description}
        photoId={img.photoId}
        images={img.images}
        className={gridImagesVariants[layout]}
      />
    ))}
  </>
)

interface IDataProps {
  photography: {
    nodes: Array<{
      title
      content: Array<IArtImageItem>
    }>
    group: Array<{
      title: string
    }>
  }
}

const layoutTypes = [`grid`, `masonry`, `list`] as const
const excludeAlbums = [`3D`, `Design`]

const Photography: React.FC<PageProps<IDataProps>> = ({ data: { photography }, location }) => {
  // Exlude certain albums from list of album titles and sort alphabetically
  const albumTitles = photography.group
    .map(({ title }) => title)
    .filter((title) => !excludeAlbums.includes(title))
    .sort((a, b) => a.localeCompare(b))

  const [layout, setLayout] = useLocalStorage(`lekoarts-photography-layout`, `grid`)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])
  const [state, dispatch] = useQueryStringReducer<ITagState, TagAction>({
    initialState,
    location,
    reducer,
    iso: queryStringIso,
  })

  return (
    <Layout>
      <SkipNavContent>
        <Container paddingTop="16">
          <Prose>
            <PhotographyBodyMdx />
          </Prose>
          <Spacer axis="vertical" size="6" />
          <div className={explanationLayoutWrapperStyle}>
            <Text variant="prominent">Select individual albums to filter photos:</Text>
            <Box display="flex" flexDirection="row" alignItems="center" gap="4">
              <Text variant="prominent">Layout:</Text>
              <Box display="flex" flexDirection="row" gap="1">
                {layoutTypes.map((layoutType) => {
                  const title = `Switch to "${layoutType}" layout`

                  return (
                    <Button
                      key={layoutType}
                      onClick={() => setLayout(layoutType)}
                      title={title}
                      aria-label={title}
                      variant="ghost"
                      size="sm"
                      className={composeClassNames(layoutIconStyle, layout === layoutType ? `active` : ``)}
                    >
                      <SVGIcon height="1.25em" width="1.25em" id={layoutType} />
                    </Button>
                  )
                })}
              </Box>
            </Box>
          </div>
          <Spacer axis="vertical" size="6" />
          <TagGroup>
            {albumTitles.map((album) => (
              <TagGroupItem key={album} name={album} state={state} dispatch={dispatch} />
            ))}
          </TagGroup>
        </Container>
        <Spacer size="20" axis="vertical" />
        <div className={imageWrapperVariants[layout]}>
          {photography.nodes
            .filter(({ title }) => {
              if (!isMounted) return true
              if (state.tags.length === 0) {
                return true
              }
              return state.tags.some((tag) => title.includes(tag))
            })
            .map(({ content, title }, index) => {
              if (layout === `list`) {
                return (
                  <React.Fragment key={title}>
                    {index !== 0 && <Spacer axis="vertical" size="10" />}
                    <Heading as="h2">{title}</Heading>
                    <Images content={content} layout={layout} />
                  </React.Fragment>
                )
              }

              return <Images key={title} content={content} layout={layout} />
            })}
        </div>
        <Spacer axis="vertical" size={[`20`, null, null, `24`]} />
      </SkipNavContent>
    </Layout>
  )
}

export default Photography

export const Head = () => (
  <SEO
    title="Photography"
    description="With my FujiFilm cameras and lenses I primarily shoot landscape photography. I love Fuji's color science and enjoy editing my photos with Capture One."
    breadcrumbListItems={[
      { name: `Art`, url: `/art` },
      { name: `Photography`, url: `/art/photography` },
    ]}
  />
)

export const query = graphql`
  {
    photography: allFlickrPhotosetsList(
      # Exclude photosets: 3D, Design
      filter: { _id: { nin: ["72177720300732809", "72177720300725772"] } }
      sort: { date_create: DESC }
    ) {
      group(field: { title: SELECT }) {
        title: fieldValue
      }
      nodes {
        title
        content {
          ...ArtImage
        }
      }
    }
  }
`
