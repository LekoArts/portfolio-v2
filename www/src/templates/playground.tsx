import type { HeadFC } from "gatsby"
import * as React from "react"
import { Layout } from "../components/blocks/layout"
import { SEO } from "../components/seo"

// This is a file to try out things in my site
const Playground = () => <Layout>TODO</Layout>

export default Playground

export const Head: HeadFC = () => <SEO title="Playground" />
