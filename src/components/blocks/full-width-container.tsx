import * as React from "react"
import { IBoxProps, Box, Container } from "../primitives"
import { fullWidthContainerVariants, FullWidthContainerVariants } from "./full-width-container.css"

interface IFullWidthContainerProps extends IBoxProps {
  variant?: FullWidthContainerVariants
}

export const FullWidthContainer: React.FC<React.PropsWithChildren<IFullWidthContainerProps>> = ({
  variant = `default`,
  children,
  ...rest
}) => (
  <Box className={fullWidthContainerVariants[variant]} {...rest}>
    <Container variant={variant}>{children}</Container>
  </Box>
)
