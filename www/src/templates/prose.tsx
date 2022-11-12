import * as React from "react"
import { PageProps, graphql, HeadFC } from "gatsby"
import { WritingViewDataProps, WritingView } from "../components/writing/writing-view"
import { Heading, Text } from "../components/typography"
import { Spacer } from "../components/primitives"
import { SEO } from "../components/seo"
import { article } from "../constants/json-ld"

const ProseTemplate: React.FC<PageProps<WritingViewDataProps>> = ({
  data: { post },
  location: { pathname },
  children: mdxContent,
}) => (
  <WritingView post={post} mdxContent={mdxContent as unknown as string} pathname={pathname} type="prose">
    <Text color="textEmphasized" fontWeight="medium" textAlign="center" fontSize={[`md`, null, null, `lg`, `lgx`]}>
      {post.category.name}
    </Text>
    <Spacer size="6" axis="vertical" />
    <Heading as="h1" textAlign="center">
      {post.title}
    </Heading>
    <Spacer size="16" axis="vertical" />
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
  query ($id: String!) {
    post(id: { eq: $id }) {
      ...WritingView
    }
  }
`
