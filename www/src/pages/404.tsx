import * as React from "react"
import { PageProps } from "gatsby"
import { Container, Text } from "@chakra-ui/react"
import { Layout } from "../components/blocks/layout"
import { SEO } from "../components/seo"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Heading } from "../components/typography/heading"
import { Link } from "../components/primitives"
import { paddingResponsiveArrays } from "../styles/tokens/space"

const NotFound: React.FC<PageProps> = () => {
  React.useEffect(() => {
    if (process.env.NODE_ENV === `production` && typeof window.plausible !== `undefined`) {
      window.plausible(`404`, { props: { path: document.location.pathname } })
    }
  }, [])

  return (
    <Layout>
      <SkipNavContent>
        <Container py={paddingResponsiveArrays.paddingSmall}>
          <Heading as="h1">Not Found</Heading>
          <Text textStyle="prominent">
            Sorry, there is nothing at this URL. <Link to="/">Go back home.</Link>
          </Text>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default NotFound

export const Head = () => <SEO title="404 - Not Found" description="Sorry, there is nothing at this URL." />
