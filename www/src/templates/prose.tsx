import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { Text } from "@chakra-ui/react"
import WritingView, { WritingViewDataProps } from "../components/writing/writing-view"
import { Heading } from "../components/typography/heading"
import { Spacer } from "../components/blocks/spacer"

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

export const query = graphql`
  query ProseTemplate($id: String!) {
    post(id: { eq: $id }) {
      ...WritingView
    }
  }
`
