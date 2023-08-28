import * as React from "react"
import { Headings, headingVariants } from "../../styles/typography.css"
import { composeClassNames } from "../../utils/box"
import { Box, IBoxProps } from "../primitives"

interface IHeadingProps extends IBoxProps {
  as: Headings
}

/**
 * Heading component accepting heading levels from h1 to h4
 */
export const Heading: React.FC<React.PropsWithChildren<IHeadingProps>> = ({ as, children, className, ...rest }) => (
  <Box as={as} className={composeClassNames(headingVariants[as], className)} {...rest}>
    {children}
  </Box>
)
