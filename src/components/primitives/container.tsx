import * as React from "react"
import { composeClassNames } from "../../utils/box"
import { Box, IBoxProps } from "./box"
import { containerVariants, ContainerVariants } from "./container.css"

interface IContainerProps extends IBoxProps {
  variant?: ContainerVariants
}

export const Container: React.FC<React.PropsWithChildren<IContainerProps>> = ({
  children,
  variant = `default`,
  className,
  ...rest
}) => (
  <Box className={composeClassNames(containerVariants[variant], className)} {...rest}>
    {children}
  </Box>
)
