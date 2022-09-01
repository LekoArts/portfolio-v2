import * as React from "react"
import { composeClassNames } from "../../utils/box"
import { IBoxProps, Box } from "../primitives"
import { proseRootStyle } from "./prose.css"

/**
 * Implementation of https://github.com/tailwindlabs/tailwindcss-typography.
 * Default variant choosing with [`sm`, `md`, null, `lg`, `xl`] as responsive array of those variants
 */
export const Prose: React.FC<React.PropsWithChildren<IBoxProps>> = ({ children, className, ...rest }) => (
  <Box className={composeClassNames(proseRootStyle, className)} {...rest}>
    {children}
  </Box>
)
