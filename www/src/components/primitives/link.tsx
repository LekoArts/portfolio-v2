import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box } from "./box"
import { linkStyle } from "./link.css"

/**
 * ChakraLink with gatsby-link (no external links)
 */
export const Link = (props) => <Box as={GatsbyLink} className={linkStyle} {...props} />
