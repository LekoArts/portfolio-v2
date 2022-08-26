import * as React from "react"
import { PageProps, graphql, HeadFC } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { RiPlantFill as PlantIcon } from "react-icons/ri"
import { Container, Text, Divider, Flex, Tag, TagLabel, Grid, Box, Icon, Stack } from "@chakra-ui/react"
import { Layout } from "../components/blocks/layout"
import { ExternalLink, Link } from "../components/primitives/link"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Prose } from "../components/typography/prose"
import { SEO } from "../components/seo"
import { Heading } from "../components/typography/heading"
import { Spacer } from "../components/primitives/spacer"
import { components } from "../components/mdx"
import { article } from "../constants/json-ld"
import { ShareAnywhereButton, TwitterButton } from "../components/primitives/buttons"
import { site } from "../constants/meta"

type DataProps = {
  garden: {
    title: string
    slug: string
    icon: string
    seoLastUpdated: string
    lastUpdated: string
    seoDate: string
    yearDate: string
    date: string
    tags: Array<string>
    timeToRead: number
    excerpt: string
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
          <Divider />
          <Spacer size="4" axis="vertical" />
          <Grid gridGap={2} gridTemplateColumns={[`1fr`, null, `1fr auto`]} fontSize={[`sm`, `md`, null, null, `lg`]}>
            <Text>
              Created {garden.date} – Last Updated {garden.lastUpdated}
            </Text>
            <Flex flexWrap="wrap" justifyContent={[`flex-start`, null, `flex-end`]}>
              {garden.tags.map((tag) => (
                <Box as="span" ml="2" _first={{ ml: 0 }} key={tag}>
                  {tag}
                </Box>
              ))}
            </Flex>
            <Tag colorScheme="green" justifySelf="flex-start">
              <TagLabel>
                <Link to="/garden">Digital Garden</Link>
              </TagLabel>
            </Tag>
          </Grid>
          <Spacer size="12" axis="vertical" />
          <Prose>
            <MDXProvider components={components}>{children}</MDXProvider>
          </Prose>
          <Spacer size="12" axis="vertical" />
          <Divider />
          <Spacer size="6" axis="vertical" />
          <Stack
            direction={[`column`, `row`]}
            display="flex"
            spacing="5"
            justifyContent={[`flex-start`, `space-between`]}
            alignItems={[`flex-start`, `center`]}
          >
            <Box>
              <ExternalLink
                fontSize={[`md`, null, null, `lg`]}
                fontWeight="medium"
                href={`https://github.com/LekoArts/portfolio-v2/edit/main/www/content/garden/${garden.parent.parent.relativePath}`}
              >
                Edit on GitHub
              </ExternalLink>
              {` `}-{` `}
              <ExternalLink
                fontSize={[`md`, null, null, `lg`]}
                fontWeight="medium"
                href={`https://www.twitter.com/search?q=${encodeURIComponent(`https://www.lekoarts.de${pathname}`)}`}
              >
                Discuss on Twitter
              </ExternalLink>
            </Box>
            {hasShareApi ? (
              <Stack direction={[`column`, `row`]}>
                <ShareAnywhereButton link={`${site.url}${garden.slug}`} message={garden.title} />
                <TwitterButton link={`${site.url}${garden.slug}`} message={garden.title} variant="outline" />
              </Stack>
            ) : (
              <TwitterButton link={`${site.url}${garden.slug}`} message={garden.title} />
            )}
          </Stack>
          <Spacer size="12" axis="vertical" />
          <Box
            textStyle="prominent"
            bgGradient="linear(to-tr, green.800, lime.600)"
            borderRadius="xl"
            p="6"
            display="flex"
            flexDirection="row"
            alignItems="center"
            color="green.100"
            boxShadow="xl"
            textShadow="0px 2px 0px rgba(0, 0, 0, 0.35)"
          >
            <Icon
              as={PlantIcon}
              height={[6, 8, 12]}
              width={[6, 8, 12]}
              mr="6"
              color="lime.300"
              sx={{ filter: `drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.25))` }}
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
  <SEO title={garden.title} pathname={garden.slug} description={garden.excerpt} image="/social/digital-garden.png">
    <meta name="twitter:label1" value="Time To Read" />
    <meta name="twitter:data1" value={`${garden.timeToRead} Minutes`} />
    <meta name="twitter:label2" value="Category" />
    <meta name="twitter:data2" value={garden.icon} />
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
              description: garden.excerpt,
              slug: garden.slug,
              image: `/social/digital-garden.png`,
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
      icon
      seoLastUpdated: lastUpdated
      lastUpdated(formatString: "MMM DD, YYYY")
      seoDate: date
      date(formatString: "MMM DD, YYYY")
      yearDate: date(formatString: "YYYY")
      tags
      timeToRead
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
