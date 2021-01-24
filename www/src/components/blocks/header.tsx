import * as React from "react"
import { Flex, useColorModeValue } from "@chakra-ui/react"
import useSiteMetadata from "../../hooks/use-site-metadata"
import Link from "../link"
import Navigation from "../navigation"
import FullWidthContainer from "./full-width-container"
import Spacer from "./spacer"

const Logo: React.FC = () => {
  const { siteTitle } = useSiteMetadata()

  return (
    <Link to="/" textStyle="logo">
      {siteTitle}
    </Link>
  )
}

const Header: React.FC<{ subnavigation?: React.ReactNode }> = ({ subnavigation = undefined }) => {
  const color = useColorModeValue(`black`, `white`)
  const variant = subnavigation ? `navigationWithSub` : `navigation`
  const height = subnavigation ? `navigationWithSubHeight` : `navigationHeight`

  return (
    <>
      <FullWidthContainer variant={variant}>
        <Flex as="header" alignItems="center" justifyContent="space-between" color={color} py="14px">
          <Logo />
          <Navigation />
        </Flex>
        {subnavigation}
      </FullWidthContainer>
      <Spacer size={height} axis="vertical" />
    </>
  )
}

export default Header
