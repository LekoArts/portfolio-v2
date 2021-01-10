import * as React from "react"
import { Flex, useColorModeValue } from "@chakra-ui/react"
import useSiteMetadata from "../../hooks/use-site-metadata"
import Link from "../link"
import Navigation from "../navigation"
import FullWidthContainer from "./full-width-container"

const Logo: React.FC = () => {
  const { siteTitle } = useSiteMetadata()

  return (
    <Link to="/" textStyle="logo">
      {siteTitle}
    </Link>
  )
}

const Header: React.FC = () => {
  const color = useColorModeValue(`black`, `white`)

  return (
    <FullWidthContainer variant="navigation">
      <Flex as="header" alignItems="center" justifyContent="space-between" color={color}>
        <Logo />
        <Navigation />
      </Flex>
    </FullWidthContainer>
  )
}

export default Header
