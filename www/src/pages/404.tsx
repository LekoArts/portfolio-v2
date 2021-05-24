import * as React from "react"
import { PageProps } from "gatsby"
import { Container, Text } from "@chakra-ui/react"
import { Layout } from "../components/blocks/layout"
import { SEO } from "../components/seo"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { space } from "../constants/space"
import { Heading } from "../components/typography/heading"
import { Link } from "../components/link"

const NotFound: React.FC<PageProps> = () => {
  React.useEffect(() => {
    window.plausible(`404`, { props: { path: document.location.pathname } })
  }, [])

  return (
    <Layout>
      <SEO title="404 - Not Found" description="Sorry, there is nothing at this URL." />
      <SkipNavContent>
        <Container py={space.paddingSmall}>
          <Heading as="h1">Not Found</Heading>
          <Text textStyle="prominent">Sorry, there is nothing at this URL.</Text>
          <Link textStyle="prominent" textDecoration="underline" to="/">
            Go back home.
          </Link>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default NotFound
