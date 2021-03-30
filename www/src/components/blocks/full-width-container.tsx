import * as React from "react"
import { useMultiStyleConfig, Box, Container, BoxProps } from "@chakra-ui/react"

interface IFullWidthContainerProps extends BoxProps {
  variant?: "default" | "hero" | "light" | "dark" | "navigation" | "navigationWithSub" | "fullBleed" | undefined
}

export const FullWidthContainer: React.FC<IFullWidthContainerProps> = ({ variant = undefined, children, ...rest }) => {
  const styles = useMultiStyleConfig(`FullWidthContainer`, { variant })

  return (
    <Box data-name="full-width-container-outer" sx={{ ...styles.outer }} {...rest}>
      <Container data-name="full-width-container-inner" sx={{ ...styles.inner }}>
        {children}
      </Container>
    </Box>
  )
}
