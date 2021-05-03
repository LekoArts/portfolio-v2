import * as React from "react"
import { Box, BoxProps, usePrefersReducedMotion } from "@chakra-ui/react"
import { transforms } from "../../constants/motion"

export const MotionBox: React.FC<BoxProps> = ({ children, ...rest }) => {
  const shouldReduceMotion = usePrefersReducedMotion()

  return (
    <Box
      transition={transforms.beforeHover.transition}
      transform={transforms.beforeHover.transform}
      _hover={
        shouldReduceMotion ? {} : { transform: transforms.onHover.transform, boxShadow: transforms.onHover.boxShadow }
      }
      {...rest}
    >
      {children}
    </Box>
  )
}
