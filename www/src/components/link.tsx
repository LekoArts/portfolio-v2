import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { chakra } from "@chakra-ui/react"

const ChakraLink = chakra(GatsbyLink)

const Link = (props) => <ChakraLink {...props} />

export default Link
