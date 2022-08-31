import { Container } from "@chakra-ui/react"
import type { HeadFC } from "gatsby"
import * as React from "react"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Layout } from "../components/blocks/layout"
import { SEO } from "../components/seo"

// This is a file to try out things in my site
const Playground = () => (
  <Layout>
    <SkipNavContent>
      <Container variant="proseRoot" sx={{ fontSize: `1.25rem` }}>
        Test
      </Container>
    </SkipNavContent>
  </Layout>
)

export default Playground

export const Head: HeadFC = () => <SEO title="Playground" />
