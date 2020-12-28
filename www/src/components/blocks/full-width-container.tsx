import * as React from "react"
import { useMultiStyleConfig, Box, Container } from "@chakra-ui/react"

const FullWidthContainer = ({ variant = undefined, bg = undefined, children, ...rest }) => {
  const styles = useMultiStyleConfig(`FullWidthContainer`, { variant })

  return (
    <Box sx={{ bg, ...styles.outer }} {...rest}>
      <Container sx={{ bg, ...styles.inner }}>{children}</Container>
    </Box>
  )
}

export default FullWidthContainer
