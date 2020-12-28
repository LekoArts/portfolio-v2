import * as React from "react"
import { useStyleConfig, Box } from "@chakra-ui/react"

/**
 * Implementation of https://github.com/tailwindlabs/tailwindcss-typography.
 * Use the variant to choose from the different options (sm, lg, xl, 2xl)
 */
const Prose = (props) => {
  const { size, variant, ...rest } = props
  const styles = useStyleConfig(`Prose`, { size, variant })

  return <Box sx={styles} {...rest} />
}

export default Prose
