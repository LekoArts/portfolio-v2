import * as React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Layout } from "../blocks/layout"
import { SkipNavContent } from "../a11y/skip-nav"
import { Spacer, Box, ExternalLink, ShareAnywhereButton, TwitterButton, Container } from "../primitives"
import { Prose, Text } from "../typography"
import { components } from "../mdx"
import { site } from "../../constants/meta"
import { TocItem, WithSidebarWrapper } from "./toc"

export type WritingViewDataProps = {
  post: {
    slug: string
    title: string
    date: string
    description: string
    excerpt: string
    lastUpdated: string
    seoDate: string
    yearDate: string
    seoLastUpdated: string
    subtitle: string
    timeToRead: string
    tableOfContents?: {
      items?: Array<TocItem>
    }
    image?: string
    category: {
      name: string
      slug: string
    }
    parent: {
      parent: {
        relativePath: string
      }
    }
  }
  pathname: string
  type: "prose" | "tutorial"
  mdxContent: string
}

export const WritingView: React.FC<React.PropsWithChildren<WritingViewDataProps>> = ({
  post,
  pathname,
  children,
  type,
  mdxContent,
}) => {
  const [hasShareApi, setHasShareApi] = React.useState(false)

  React.useEffect(() => {
    setHasShareApi(!!window.navigator.share)
  }, [])

  return (
    <Layout>
      <Container variant="proseRoot">
        <SkipNavContent>
          {children}
          {type === `tutorial` && post.tableOfContents?.items ? (
            <WithSidebarWrapper items={post.tableOfContents.items}>
              <Prose as="article" style={{ flex: `1 1 100%`, minWidth: `100%` }}>
                <MDXProvider components={components}>{mdxContent}</MDXProvider>
              </Prose>
            </WithSidebarWrapper>
          ) : (
            <Prose as="article">
              <MDXProvider components={components}>{mdxContent}</MDXProvider>
            </Prose>
          )}
          <Spacer size="12" axis="vertical" />
          <Box as="hr" height="px" width="full" bg="text" opacity={0.1} border="none" />
          <Spacer size="6" axis="vertical" />
          <Box
            display="flex"
            flexDirection={[`column`, `row`]}
            gap="5"
            justifyContent={[`flex-start`, `space-between`]}
            alignItems={[`flex-start`, `center`]}
          >
            <div>
              <ExternalLink
                fontSize={[`md`, null, null, `lg`]}
                fontWeight="medium"
                href={`https://github.com/LekoArts/portfolio-v2/edit/main/www/content/writing/${post.parent.parent.relativePath}`}
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
            </div>
            {hasShareApi ? (
              <Box display="flex" flexDirection={[`column`, `row`]}>
                <ShareAnywhereButton link={`${site.url}${post.slug}`} message={post.title} />
                <TwitterButton link={`${site.url}${post.slug}`} message={post.title} variant="outline" />
              </Box>
            ) : (
              <TwitterButton link={`${site.url}${post.slug}`} message={post.title} />
            )}
          </Box>
          {type === `prose` && (
            <Text marginTop="6" fontSize={[`md`, null, null, `lg`]}>
              Last updated: {post.lastUpdated}
            </Text>
          )}
        </SkipNavContent>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  fragment WritingView on Post {
    slug
    title
    description
    excerpt
    seoLastUpdated: lastUpdated
    lastUpdated(formatString: "MMM DD, YYYY")
    seoDate: date
    yearDate: date(formatString: "YYYY")
    date(formatString: "MMM DD, YYYY")
    subtitle
    timeToRead
    image
    category {
      name
      slug
    }
    ... on MdxPost {
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
`
