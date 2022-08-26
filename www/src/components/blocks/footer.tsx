import * as React from "react"
import { Box } from "../primitives/box"
import { Link, ExternalLink } from "../primitives/link"
import { FullWidthContainer } from "./full-width-container"
import { useFooterNavigation } from "../../hooks/use-footer-navigation"
import { Spacer } from "../primitives/spacer"

export const Footer: React.FC = () => {
  const footerNavigation = useFooterNavigation()

  return (
    <FullWidthContainer variant="dark">
      <Box as="footer" py="16" role="contentinfo">
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection={[`column`, `row`]} flexWrap="wrap" justifyContent="space-between">
            {footerNavigation.map((section) => {
              const { heading } = section

              return (
                <Box display="flex" key={heading.name} flexDirection="column" alignItems="flex-start" mb={[`8`, `0`]}>
                  {heading.link ? (
                    <Link
                      to={heading.link}
                      p="1"
                      color="textEmphasizedOnBg"
                      fontSize={[`lg`, null, `lgx`]}
                      mb={[`2`, `3`]}
                    >
                      {heading.name}
                    </Link>
                  ) : (
                    <Box color="textEmphasizedOnBg" p="1" fontSize={[`lg`, null, `lgx`]} mb={[`2`, `3`]}>
                      {heading.name}
                    </Box>
                  )}
                  <Box
                    display="flex"
                    flexDirection={[`row`, `column`]}
                    alignItems="flex-start"
                    flexWrap={[`wrap`, `nowrap`]}
                  >
                    {section.items.map((item) => (
                      <React.Fragment key={item.link}>
                        {item.isExternal ? (
                          <ExternalLink mr={[`2`, `0`]} p="1" href={item.link}>
                            {item.name}
                          </ExternalLink>
                        ) : (
                          <Link mr={[`2`, `0`]} p="1" to={item.link}>
                            {item.name}
                          </Link>
                        )}
                      </React.Fragment>
                    ))}
                  </Box>
                </Box>
              )
            })}
          </Box>
          <Spacer axis="vertical" size="16" />
          <Box
            display="flex"
            flexDirection={[`column`, `row`]}
            textAlign="center"
            alignItems="center"
            justifyContent="space-between"
          >
            <div>&copy; {new Date().getFullYear()} by lekoarts.de. All rights reserved.</div>
            <div>
              <Link to="/privacy-policy">Privacy Policy</Link>. <Link to="/legal-notice">Legal Notice</Link>.
            </div>
          </Box>
        </Box>
      </Box>
    </FullWidthContainer>
  )
}
