import { Container } from "@chakra-ui/react"
import type { HeadFC } from "gatsby"
import * as React from "react"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Layout } from "../components/blocks/layout"
import { Alert } from "../components/mdx/alert"
import { SEO } from "../components/seo"

// This is a file to try out things in my site
const Playground = () => (
  <Layout>
    <SkipNavContent>
      <Container variant="proseRoot" sx={{ fontSize: `1.25rem` }}>
        <Alert status="info" title="Note">
          If you want to try the instructions below you can fire up the Python REPL. If you have Python installed run
          <code>python</code> in your terminal. <a href="https://www.figma.com/downloads/">download</a>
          editor.
        </Alert>
        <Alert status="success" title="What you just learned">
          If you want to try the instructions below you can fire up the Python REPL. If you have Python installed run
          <code>python</code> in your terminal. <a href="https://www.figma.com/downloads/">download</a>
          editor.
        </Alert>
        <Alert status="warning" title="node-fetch">
          If you want to try the instructions below you can fire up the Python REPL. If you have Python installed run
          <code>python</code> in your terminal. <a href="https://www.figma.com/downloads/">download</a>
          editor.
        </Alert>
        <Alert status="error" title="node-fetch">
          If you want to try the instructions below you can fire up the Python REPL. If you have Python installed run
          <code>python</code> in your terminal. <a href="https://www.figma.com/downloads/">download</a>
          editor.
        </Alert>
      </Container>
    </SkipNavContent>
  </Layout>
)

export default Playground

export const Head: HeadFC = () => <SEO title="Playground" />
