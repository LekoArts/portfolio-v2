import * as React from "react"
import { Heading as ChakraHeading } from "@chakra-ui/react"

const Heading: React.FC<{ as: "h1" | "h2" | "h3" | "h4" }> = ({ as, children }) => (
  <ChakraHeading as={as} variant={as}>
    {children}
  </ChakraHeading>
)

export default Heading
