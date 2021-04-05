import * as React from "react"
import { graphql } from "gatsby"
import { Container, Divider, Link as ExternalLink } from "@chakra-ui/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Layout } from "../blocks/layout"
import { SEO } from "../seo"
import { SkipNavContent } from "../a11y/skip-nav"
import { Spacer } from "../blocks/spacer"
import { Prose } from "../typography/prose"

export type WritingViewDataProps = {
  post: {
    slug: string
    title: string
    date: string
    description: string
    body: string
    excerpt: string
    lastUpdated: string
    seoDate: string
    seoLastUpdated: string
    subtitle: string
    timeToRead: string
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
}

const WritingView: React.FC<WritingViewDataProps> = ({ post, pathname, children }) => (
  <Layout>
    <SEO title={post.title} description={post.description ? post.description : post.excerpt}>
      <meta name="twitter:label1" value="Time To Read" />
      <meta name="twitter:data1" value={`${post.timeToRead} Minutes`} />
      <meta name="twitter:label2" value="Category" />
      <meta name="twitter:data2" value={post.category.name} />
      <meta name="article:published_time" content={post.seoDate} />
      <meta name="article:modified_time" content={post.seoLastUpdated} />
    </SEO>
    <Container variant="proseRoot">
      <SkipNavContent>
        {children}
        <Prose>
          <MDXRenderer>{post.body}</MDXRenderer>
        </Prose>
        <Spacer size={12} axis="vertical" />
        <Divider />
        <Spacer size={6} axis="vertical" />
        <ExternalLink
          fontSize={[`md`, null, null, `18px`]}
          fontWeight="medium"
          href={`https://github.com/LekoArts/portfolio-v2/edit/master/www/content/writing/${post.parent.parent.relativePath}`}
        >
          Edit on GitHub
        </ExternalLink>
        {` `}-{` `}
        <ExternalLink
          fontSize={[`md`, null, null, `18px`]}
          fontWeight="medium"
          href={`https://www.twitter.com/search?q=${encodeURIComponent(`https://www.lekoarts.de${pathname}`)}`}
        >
          Discuss on Twitter
        </ExternalLink>
      </SkipNavContent>
    </Container>
  </Layout>
)

export default WritingView

export const query = graphql`
  fragment WritingView on Post {
    slug
    title
    description
    excerpt
    body
    seoLastUpdated: lastUpdated
    lastUpdated(formatString: "MMM DD, YYYY")
    seoDate: date
    date(formatString: "MMM DD, YYYY")
    subtitle
    timeToRead
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
