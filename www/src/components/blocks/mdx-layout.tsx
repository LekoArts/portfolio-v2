import * as React from "react"
import { PageProps } from "gatsby"
import { Container, useBreakpointValue } from "@chakra-ui/react"
import { Prose } from "../typography/prose"
import { Layout } from "./layout"
import { SkipNavContent } from "../a11y/skip-nav"

export const MDXLayout: React.FC<PageProps> = ({ children }) => {
  const variant = useBreakpointValue([`sm`, `default`, `default`, `lg`, `xl`]) as "sm" | "default" | "lg" | "xl"

  return (
    <Layout>
      <Container py={8}>
        <SkipNavContent>
          <Prose variant={variant}>{children}</Prose>
        </SkipNavContent>
      </Container>
    </Layout>
  )
}
