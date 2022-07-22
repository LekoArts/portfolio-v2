import * as React from "react"
import { PageProps, graphql, HeadFC } from "gatsby"
import { Text } from "@chakra-ui/react"
import { WritingViewDataProps, WritingView } from "../components/writing/writing-view"
import { Heading } from "../components/typography/heading"
import { Spacer } from "../components/blocks/spacer"
import { SEO } from "../components/seo"
import { article } from "../constants/json-ld"

const ProseTemplate: React.FC<PageProps<WritingViewDataProps>> = ({ data: { post }, location: { pathname } }) => (
  <WritingView post={post} pathname={pathname} type="prose">
    <Text
      color="textEmphasized"
      fontWeight={500}
      textAlign="center"
      fontSize={[`md`, null, null, `1.125rem`, `1.3125rem`]}
    >
      {post.category.name}
    </Text>
    <Spacer size={6} axis="vertical" />
    <Heading as="h1" textAlign="center">
      {post.title}
    </Heading>
    <Spacer size={[16, null, null, 20]} axis="vertical" />
  </WritingView>
)

export default ProseTemplate

export const Head: HeadFC<WritingViewDataProps> = ({ data: { post } }) => (
  <SEO
    title={post.title}
    pathname={post.slug}
    description={post.description ? post.description : post.excerpt}
    image={post.image}
  >
    <meta name="twitter:label1" value="Time To Read" />
    <meta name="twitter:data1" value={`${post.timeToRead} Minutes`} />
    <meta name="twitter:label2" value="Category" />
    <meta name="twitter:data2" value={post.category.name} />
    <meta name="article:published_time" content={post.seoDate} />
    <meta name="article:modified_time" content={post.seoLastUpdated} />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          article({
            isGarden: false,
            post: {
              title: post.title,
              description: post.description ? post.description : post.excerpt,
              date: post.seoDate,
              lastUpdated: post.seoLastUpdated,
              year: post.yearDate,
              image: post.image,
              slug: post.slug,
            },
            category: {
              name: post.category.name,
              slug: post.category.slug,
            },
          })
        ),
      }}
    />
  </SEO>
)

export const query = graphql`
  query ProseTemplate($id: String!) {
    post(id: { eq: $id }) {
      ...WritingView
    }
  }
`
