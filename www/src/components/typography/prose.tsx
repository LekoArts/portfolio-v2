import * as React from "react"
import { composeClassNames } from "../../utils/box"
import { IBoxProps, Box } from "../primitives"
import { ProseVariants } from "./prose.css"

interface IProseProps extends IBoxProps {
  variant?: ProseVariants
}

/**
 * Implementation of https://github.com/tailwindlabs/tailwindcss-typography.
 * Use the variant to choose from the different options (default, sm, md, lg, xl)
 * "default" is [`sm`, `md`, `md`, `lg`, `xl`] as responsive array of those variants
 */
export const Prose: React.FC<React.PropsWithChildren<IProseProps>> = ({
  variant = `default`,
  children,
  className,
  ...rest
}) => {
  const styles = `todo`

  return (
    <Box className={composeClassNames(`todo`, className)} {...rest}>
      {children}
    </Box>
  )
}
