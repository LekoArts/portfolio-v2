import * as React from "react"
import { Box, Stack, Flex, Link as ExternalLink } from "@chakra-ui/react"
import { useFooterNavigation } from "../../hooks/use-footer-navigation"
import { Link } from "../link"
import { FullWidthContainer } from "./full-width-container"

export const Footer: React.FC = () => {
  const footerNavigation = useFooterNavigation()

  return (
    <FullWidthContainer variant="dark">
      <Box as="footer" py={16} role="contentinfo">
        <Stack direction="column" spacing={16}>
          <Flex flexDirection={[`column`, `row`]} flexWrap="wrap" justifyContent="space-between">
            {footerNavigation.map((section) => {
              const { heading } = section

              return (
                <Flex key={heading.name} flexDirection="column" alignItems="flex-start" mb={[8, 0]}>
                  {heading.link ? (
                    <Link to={heading.link} p={1} color="white" fontSize={[`1.125rem`, null, `1.3125rem`]} mb={[2, 3]}>
                      {heading.name}
                    </Link>
                  ) : (
                    <Box color="white" p={1} fontSize={[`1.125rem`, null, `1.3125rem`]} mb={[2, 3]}>
                      {heading.name}
                    </Box>
                  )}
                  <Flex flexDirection={[`row`, `column`]} alignItems="flex-start" flexWrap={[`wrap`, `nowrap`]}>
                    {section.items.map((item) => (
                      <React.Fragment key={item.link}>
                        {item.isExternal ? (
                          <ExternalLink mr={[2, 0]} p={1} href={item.link}>
                            {item.name}
                          </ExternalLink>
                        ) : (
                          <Link mr={[2, 0]} p={1} to={item.link}>
                            {item.name}
                          </Link>
                        )}
                      </React.Fragment>
                    ))}
                  </Flex>
                </Flex>
              )
            })}
          </Flex>
          <Flex flexDirection={[`column`, `row`]} textAlign="center" alignItems="center" justifyContent="space-between">
            <div>&copy; {new Date().getFullYear()} by lekoarts.de. All rights reserved.</div>
            <div>
              <Link to="/privacy-policy">Privacy Policy</Link>. <Link to="/legal-notice">Legal Notice</Link>.
            </div>
          </Flex>
        </Stack>
      </Box>
    </FullWidthContainer>
  )
}
