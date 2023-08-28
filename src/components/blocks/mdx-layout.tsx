import * as React from "react"
import { PageProps } from "gatsby"
import { SkipNavContent } from "../a11y/skip-nav"
import { Container } from "../primitives"
import { Prose } from "../typography"
import { Layout } from "./layout"

export const MDXLayout: React.FC<React.PropsWithChildren<PageProps>> = ({ children }) => (
  <Layout>
    <Container variant="proseRoot">
      <SkipNavContent>
        <Prose>{children}</Prose>
      </SkipNavContent>
    </Container>
  </Layout>
)
