import * as React from "react"
import { MDXProvider } from "@mdx-js/react"
import { SEO } from "../components/seo"
import { Layout } from "../components/blocks/layout"
import { Heading, Prose, Text } from "../components/typography"
import { VisuallyHidden } from "../components/a11y/visually-hidden"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Container, Spacer, Box, Button, SVGIcon, ExternalLink } from "../components/primitives"
import { paddingResponsiveArrays } from "../styles/tokens/space"
import { imgStyle, summaryWrapperStyle } from "./resume.css"
import { components } from "../components/mdx"

// @ts-ignore
import ResumeBodyMdx from "../data/resume-body.mdx"

const Resume = () => (
  <Layout>
    <SkipNavContent>
      <Container py={paddingResponsiveArrays.paddingSmall}>
        <VisuallyHidden>
          <Heading as="h1">Resume</Heading>
        </VisuallyHidden>
        <Box className={summaryWrapperStyle}>
          <Box>
            <Heading as="h2">Hi, I'm Lennart Jörgens.</Heading>
            <Text variant="prominent">
              A product-focused full stack engineer with five years of experience in leading large-scale open source
              projects and shipping high-quality work to millions of users. Adept at building delightful, inclusive, and
              well-documented solutions to customers' needs.
            </Text>
            <Spacer axis="vertical" size="8" />
            <Text>
              <ExternalLink href="mailto:hello@lekoarts.de">hello@lekoarts.de</ExternalLink> —{` `}
              <ExternalLink href="https://github.com/LekoArts">GitHub</ExternalLink> —{` `}
              <ExternalLink href="https://www.linkedin.com/in/lennart-joergens/">LinkedIn</ExternalLink>
            </Text>
            <Spacer axis="vertical" size="4" />
            <Button
              kind="external"
              target="_blank"
              to="resume.pdf"
              size="md"
              variant="primary"
              rightIcon={<SVGIcon id="download" height="1em" width="1em" />}
            >
              Download Resume
            </Button>
          </Box>
          <Box>
            <img
              src="/social/head.jpg"
              className={imgStyle}
              alt="Me in a blue t-shirt in front of the beautiful alpes in austria"
            />
          </Box>
        </Box>
        <Spacer size="12" axis="vertical" />
        <Box as="hr" height="px" width="full" bg="text" opacity={0.1} border="none" />
        <Prose>
          <MDXProvider components={components}>
            <ResumeBodyMdx />
          </MDXProvider>
        </Prose>
        <Spacer size="12" axis="vertical" />
        <Box as="hr" height="px" width="full" bg="text" opacity={0.1} border="none" />
        <Spacer size="8" axis="vertical" />
        <Text fontSize={[`md`, null, null, `lg`]}>Last updated: July 27, 2023</Text>
      </Container>
    </SkipNavContent>
  </Layout>
)

export default Resume

export const Head = () => (
  <SEO
    title="Resume"
    description="Lennart Jörgens' resume"
    pathname="/resume"
    breadcrumbListItems={[{ name: `Resume`, url: `/resume` }]}
    noIndex
  />
)
