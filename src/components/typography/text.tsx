import * as React from "react"
import { prominent } from "../../styles/typography.css"
import { composeClassNames } from "../../utils/box"
import { Box, IBoxProps } from "../primitives"

interface ITextProps extends IBoxProps {
  variant?: "prominent"
}

export const Text: React.FC<React.PropsWithChildren<ITextProps>> = ({
  children,
  variant = undefined,
  className,
  ...rest
}) => (
  <Box as="p" className={variant === `prominent` ? composeClassNames(prominent, className) : className} {...rest}>
    {children}
  </Box>
)
