import * as React from "react"
import { useStyleConfig, Box, BoxProps } from "@chakra-ui/react"

interface IProseProps extends BoxProps {
  variant?: "default" | "sm" | "lg" | "xl"
}

/**
 * Implementation of https://github.com/tailwindlabs/tailwindcss-typography.
 * Use the variant to choose from the different options (sm, default, lg, xl)
 */
const Prose: React.FC<IProseProps> = ({ variant = `default`, children, ...rest }) => {
  const styles = useStyleConfig(`Prose`, { variant })

  return (
    <Box sx={styles} {...rest}>
      {children}
    </Box>
  )
}

export default Prose
