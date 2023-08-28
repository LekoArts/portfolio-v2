import type { HeadFC } from "gatsby"
import * as React from "react"
import { MDXProvider } from "@mdx-js/react"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Layout } from "../components/blocks/layout"
import { Container } from "../components/primitives"
import { SEO } from "../components/seo"

import { components } from "../components/mdx"
import { Heading, Prose } from "../components/typography"
// @ts-ignore
import KitchenSinkMDX from "../data/kitchen-sink.mdx"

// This is a file to try out things in my site
const KitchenSink = () => (
  <Layout>
    <Container variant="proseRoot">
      <SkipNavContent>
        <Heading as="h1">Kitchen Sink</Heading>
        <Prose>
          <MDXProvider components={components}>
            <KitchenSinkMDX />
          </MDXProvider>
        </Prose>
      </SkipNavContent>
    </Container>
  </Layout>
)

export default KitchenSink

export const Head: HeadFC = () => <SEO title="Kitchen Sink" />
