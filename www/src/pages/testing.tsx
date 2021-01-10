import * as React from "react"
import { PageProps } from "gatsby"
import { Container, useBreakpointValue } from "@chakra-ui/react"
import Prose from "../components/typography/prose"
import Layout from "../components/blocks/layout"
import { SkipNavContent } from "../components/a11y/skip-nav"
// @ts-ignore
import MarkdownSample from "../MarkdownSample.mdx"

const Index: React.FC<PageProps> = () => {
  const variant = useBreakpointValue([`sm`, `default`, `default`, `lg`, `xl`])

  return (
    <Layout>
      <Container>
        <SkipNavContent>
          <Prose variant={variant}>
            <MarkdownSample />
          </Prose>
        </SkipNavContent>
      </Container>
    </Layout>
  )
}

export default Index
