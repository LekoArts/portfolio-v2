import * as React from "react"
import { PageProps, graphql, HeadFC } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Layout } from "../components/blocks/layout"
import { ExternalLink, Link, Spacer, Box, ShareAnywhereButton, SVGIcon, Tag, Container } from "../components/primitives"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { SEO } from "../components/seo"
import { Heading, Text, Prose } from "../components/typography"
import { components } from "../components/mdx"
import { article } from "../constants/json-ld"
import { site } from "../constants/meta"
import { gardenCtaStyle, metaStyle, plantIconStyle } from "./garden.css"
import { getGardenEditLink, getMastodonShareLink, getTwitterShareLink } from "../utils/sharing"

type DataProps = {
  garden: {
    title: string
    slug: string
    description: string
    icon: string
    seoLastUpdated: string
    lastUpdated: string
    seoDate: string
    yearDate: string
    date: string
    tags: Array<string>
    timeToRead: number
    excerpt: string
    image: string
    parent: {
      parent: {
        relativePath: string
      }
    }
  }
}

const GardenTemplate: React.FC<PageProps<DataProps>> = ({ data: { garden }, location: { pathname }, children }) => {
  const [hasShareApi, setHasShareApi] = React.useState(false)

  React.useEffect(() => {
    setHasShareApi(!!window.navigator.share)
  }, [])
  return (
    <Layout>
      <Container variant="proseRoot">
        <SkipNavContent>
          <Heading as="h1">{garden.title}</Heading>
          <Spacer size="6" axis="vertical" />
          <Box as="hr" height="px" width="full" bg="text" opacity={0.1} border="none" />
          <Spacer size="4" axis="vertical" />
          <Box className={metaStyle} fontSize={[`sm`, `md`, null, null, `lg`]}>
            <Text>
              Created {garden.date} – Last Updated {garden.lastUpdated}
            </Text>
            <Box display="flex" flexWrap="wrap" justifyContent={[`flex-start`, null, `flex-end`]}>
              {garden.tags.map((tag, index) => (
                <React.Fragment key={tag}>
                  <Box as="span">{tag}</Box>
                  {index !== garden.tags.length - 1 && <Spacer axis="horizontal" size="2" />}
                </React.Fragment>
              ))}
            </Box>
            <Tag colorScheme="green" style={{ justifySelf: `flex-start` }}>
              <Link to="/garden">Digital Garden</Link>
            </Tag>
          </Box>
          <Spacer size="12" axis="vertical" />
          <Prose>
            <MDXProvider components={components}>{children}</MDXProvider>
          </Prose>
          <Spacer size="12" axis="vertical" />
          <Box as="hr" height="px" width="full" bg="text" opacity={0.1} border="none" />
          <Spacer size="6" axis="vertical" />
          <Box
            flexDirection={[`column`, `row`]}
            display="flex"
            justifyContent={[`flex-start`, `space-between`]}
            alignItems={[`flex-start`, `center`]}
            gap="5"
          >
            <Box fontSize={[`md`, null, null, `lg`]} fontWeight="medium">
              <ExternalLink href={getGardenEditLink(garden.parent.parent.relativePath)}>Edit on GitHub</ExternalLink>
              {` `}-{` `}
              Share on{` `}
              <ExternalLink href={getTwitterShareLink(`${site.url}${garden.slug}`, garden.title)}>Twitter</ExternalLink>
              {` `}/{` `}
              <ExternalLink href={getMastodonShareLink(`${site.url}${garden.slug}`, garden.title)}>
                Mastodon
              </ExternalLink>
            </Box>
            {hasShareApi && <ShareAnywhereButton link={`${site.url}${garden.slug}`} message={garden.title} />}
          </Box>
          <Spacer size={[`12`, null, `16`]} axis="vertical" />
          <Box
            borderRadius="xl"
            p="6"
            display="flex"
            flexDirection="row"
            alignItems="center"
            className={gardenCtaStyle}
          >
            <Box
              as={SVGIcon}
              height={[`8`, null, `12`]}
              width={[`8`, null, `12`]}
              marginRight="6"
              id="lightbulb"
              className={plantIconStyle}
            />
            <Box>
              Want to learn more?{` `}
              <Link to="/garden" __color="white">
                Browse my Digital Garden
              </Link>
            </Box>
          </Box>
        </SkipNavContent>
      </Container>
    </Layout>
  )
}

export default GardenTemplate

export const Head: HeadFC<DataProps> = ({ data: { garden } }) => (
  <SEO
    title={garden.title}
    pathname={garden.slug}
    description={garden.description ? garden.description : garden.excerpt}
    image={garden.image}
  >
    <meta name="twitter:label1" value="Time To Read" />
    <meta name="twitter:data1" value={`${garden.timeToRead} Minutes`} />
    <meta name="twitter:label2" value="Tags" />
    <meta name="twitter:data2" value={garden.tags.join(`, `)} />
    <meta name="article:published_time" content={garden.seoDate} />
    <meta name="article:modified_time" content={garden.seoLastUpdated} />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          article({
            isGarden: true,
            post: {
              title: garden.title,
              description: garden.description ? garden.description : garden.excerpt,
              slug: garden.slug,
              image: garden.image,
              date: garden.seoDate,
              lastUpdated: garden.seoLastUpdated,
              year: garden.yearDate,
            },
            category: {
              name: `Digital Garden`,
              slug: `/garden`,
            },
          })
        ),
      }}
    />
  </SEO>
)

export const query = graphql`
  query ($id: String!) {
    garden(id: { eq: $id }) {
      title
      slug
      description
      icon
      seoLastUpdated: lastUpdated
      lastUpdated(formatString: "MMM DD, YYYY")
      seoDate: date
      date(formatString: "MMM DD, YYYY")
      yearDate: date(formatString: "YYYY")
      tags
      timeToRead
      image
      excerpt
      ... on MdxGarden {
        parent {
          ... on Mdx {
            parent {
              ... on File {
                relativePath
              }
            }
          }
        }
      }
    }
  }
`
