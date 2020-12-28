import * as React from "react"
import { PageProps } from "gatsby"
import { Heading, useColorMode, Button, Container, useBreakpointValue } from "@chakra-ui/react"
import Prose from "../components/typography/prose"
import Layout from "../components/blocks/layout"
import { SkipNavContent } from "../components/a11y/skip-nav"
// @ts-ignore
import MarkdownSample from "../MarkdownSample.mdx"
import FullWidthContainer from "../components/blocks/full-width-container"

function Toggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
      <Button onClick={toggleColorMode}>Toggle {colorMode === `light` ? `Dark` : `Light`}</Button>
    </header>
  )
}

const Index: React.FC<PageProps> = () => {
  const variant = useBreakpointValue([`sm`, `default`, `default`, `lg`, `xl`])

  return (
    <Layout>
      <FullWidthContainer variant="light">test123</FullWidthContainer>
      <Container>
        <Toggle />
        <Heading as="h1" variant="h1">
          Test
        </Heading>
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
