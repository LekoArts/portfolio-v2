import * as React from "react"
import { PageProps } from "gatsby"
import { Container } from "@chakra-ui/react"
import { Prose } from "../typography/prose"
import { Layout } from "./layout"
import { SkipNavContent } from "../a11y/skip-nav"

export const MDXLayout: React.FC<PageProps> = ({ children }) => (
  <Layout>
    <Container variant="proseRoot">
      <SkipNavContent>
        <Prose>{children}</Prose>
      </SkipNavContent>
    </Container>
  </Layout>
)
