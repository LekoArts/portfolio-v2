import * as React from "react"
import { Heading as ChakraHeading, HeadingProps as ChakraHeadingProps } from "@chakra-ui/react"

interface HeadingProps extends ChakraHeadingProps {
  as: "h1" | "h2" | "h3" | "h4"
}

/**
 * Heading component accepting heading levels
 * Wraps the Heading component from Chakra
 */
export const Heading: React.FC<HeadingProps> = ({ as, children, ...rest }) => (
  <ChakraHeading as={as} variant={as} {...rest}>
    {children}
  </ChakraHeading>
)
