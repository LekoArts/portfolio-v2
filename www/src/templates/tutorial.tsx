import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { Divider, Text, Flex, Tag, TagLabel } from "@chakra-ui/react"
import WritingView, { WritingViewDataProps } from "../components/writing/writing-view"
import { Heading } from "../components/typography/heading"
import { Spacer } from "../components/blocks/spacer"

const tagColorSwitch = (name) => {
  switch (name) {
    case `Community`:
      return `green`
    case `Design`:
      return `blue`
    case `Gatsby`:
      return `purple`
    case `JavaScript`:
      return `yellow`
    case `React`:
      return `teal`
    default:
      return `gray`
  }
}

const TutorialTemplate: React.FC<PageProps<WritingViewDataProps>> = ({ data: { post }, location: { pathname } }) => (
  <WritingView post={post} pathname={pathname} type="tutorial">
    <Heading as="h1">{post.title}</Heading>
    <Spacer size={6} axis="vertical" />
    <Divider />
    <Spacer size={4} axis="vertical" />
    <Flex justifyContent="space-between" flexDirection={[`column`, null, null, `row`]}>
      <Text mb={2}>
        Created {post.date} – Last Updated {post.lastUpdated}
      </Text>
      <Tag alignSelf="flex-start" mb={2} colorScheme={tagColorSwitch(post.category.name)}>
        <TagLabel>{post.category.name}</TagLabel>
      </Tag>
    </Flex>
    <Spacer size={10} axis="vertical" />
  </WritingView>
)

export default TutorialTemplate

export const query = graphql`
  query TutorialTemplate($slug: String!) {
    post(slug: { eq: $slug }) {
      ...WritingView
    }
  }
`
