import * as React from "react"
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby"
import { composeClassNames } from "../../utils/box"
import { Box, IBoxProps } from "./box"
import { linkStyle } from "./link.css"

interface ILinkProps extends IBoxProps {
  to: GatsbyLinkProps<unknown>["to"]
  activeClassName?: GatsbyLinkProps<unknown>["activeClassName"]
}

export const Link = ({ className = undefined, ...rest }: ILinkProps) => (
  <Box as={GatsbyLink} className={composeClassNames(linkStyle, className)} {...rest} />
)

export const ExternalLink = ({ className = undefined, ...rest }: IBoxProps) => (
  <Box as="a" className={composeClassNames(linkStyle, className)} {...rest} />
)
