import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box } from "./box"
import { linkStyle } from "./link.css"
import { composeClassNames } from "../../utils/box"

export const Link = ({ className = undefined, ...rest }) => (
  <Box as={GatsbyLink} className={composeClassNames(linkStyle, className)} {...rest} />
)

export const ExternalLink = ({ className = undefined, ...rest }) => (
  <Box as="a" className={composeClassNames(linkStyle, className)} {...rest} />
)
