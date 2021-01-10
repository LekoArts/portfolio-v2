import * as React from "react"
import { Box, Stack, Flex, Link as ExternalLink } from "@chakra-ui/react"
import FullWidthContainer from "./full-width-container"
import Link from "../link"
import useSiteMetadata from "../../hooks/use-site-metadata"

const Footer: React.FC = () => {
  const { footerNavigation, siteTitle } = useSiteMetadata()

  return (
    <FullWidthContainer variant="dark">
      <Box as="footer" py={16} role="contentinfo">
        <Stack direction="column" spacing={16}>
          <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-between">
            {footerNavigation.map((section, index) => {
              const { heading } = section

              return (
                <Flex
                  key={heading.name}
                  flexDirection="column"
                  alignItems={[`center`, `flex-start`]}
                  flexBasis={[`50%`, `initial`]}
                  mb={[index > 1 ? 0 : 8, 0]}
                >
                  {heading.link ? (
                    <Link to={heading.link} color="white" fontSize={[`18px`, null, `21px`]} mb={3}>
                      {heading.name}
                    </Link>
                  ) : (
                    <Box color="white" fontSize={[`18px`, null, `21px`]} mb={3}>
                      {heading.name}
                    </Box>
                  )}
                  <Flex flexDirection="column" alignItems={[`center`, `flex-start`]}>
                    {section.items.map((item) => (
                      <React.Fragment key={item.link}>
                        {item.isExternal ? (
                          <ExternalLink href={item.link}>{item.name}</ExternalLink>
                        ) : (
                          <Link to={item.link}>{item.name}</Link>
                        )}
                      </React.Fragment>
                    ))}
                  </Flex>
                </Flex>
              )
            })}
          </Flex>
          <Flex flexDirection={[`column`, `row`]} textAlign="center" alignItems="center" justifyContent="space-between">
            <div>
              &copy; {new Date().getFullYear()} by {siteTitle}. All rights reserved.
            </div>
            <div>
              <Link to="/privacy-policy">Privacy</Link>. <Link to="/imprint">Imprint</Link>.
            </div>
          </Flex>
        </Stack>
      </Box>
    </FullWidthContainer>
  )
}

export default Footer
