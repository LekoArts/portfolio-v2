import * as React from "react"
import { useMultiStyleConfig, Box, Container, BoxProps } from "@chakra-ui/react"
import { BackgroundProps } from "@chakra-ui/system"

interface IFullWidthContainerProps extends BoxProps {
  variant?: "default" | "hero" | "light" | "dark" | "navigation" | "navigationWithSub" | undefined
  bg?: BackgroundProps["bg"]
  [key: string]: unknown
}

const FullWidthContainer: React.FC<IFullWidthContainerProps> = ({
  variant = undefined,
  bg = undefined,
  children,
  ...rest
}) => {
  const styles = useMultiStyleConfig(`FullWidthContainer`, { variant })

  return (
    <Box sx={{ bg, ...styles.outer }} {...rest}>
      <Container sx={{ bg, ...styles.inner }}>{children}</Container>
    </Box>
  )
}

export default FullWidthContainer
