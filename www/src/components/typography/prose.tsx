import * as React from "react"
import { useStyleConfig, Box } from "@chakra-ui/react"

interface IProseProps {
  variant?: "default" | "sm" | "lg" | "xl"
}

/**
 * Implementation of https://github.com/tailwindlabs/tailwindcss-typography.
 * Use the variant to choose from the different options (sm, default, lg, xl)
 */
const Prose = ({ variant = `default`, ...rest }: IProseProps) => {
  const styles = useStyleConfig(`Prose`, { variant })

  return <Box sx={styles} {...rest} />
}

export default Prose
