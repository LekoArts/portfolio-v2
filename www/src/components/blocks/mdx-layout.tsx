import * as React from "react"
import { PageProps } from "gatsby"
import { Container } from "@chakra-ui/react"
import { SkipNavContent } from "../a11y/skip-nav"
import { Prose } from "../typography/prose"
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
