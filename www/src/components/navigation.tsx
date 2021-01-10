import * as React from "react"
import { IconButton, useColorMode, HStack } from "@chakra-ui/react"
import { FaMoon } from "react-icons/fa"
import { FiSun } from "react-icons/fi"
import Link from "./link"
import useSiteMetadata from "../hooks/use-site-metadata"

const Toggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isLight = colorMode === `light`
  return (
    <IconButton
      aria-label={isLight ? `Activate Dark Mode` : `Activate Light Mode`}
      variant="ghost"
      icon={isLight ? <FaMoon /> : <FiSun />}
      onClick={toggleColorMode}
    />
  )
}

const Navigation: React.FC = () => {
  const { primaryNavigation } = useSiteMetadata()

  return (
    <HStack spacing="6">
      <nav aria-label="Primary navigation">
        <HStack as="ul" listStyleType="none" spacing="4">
          {primaryNavigation.map((item) => (
            <li key={item.link}>
              <Link to={item.link} fontSize={[`md`, null, null, `lg`]} p="2" _hover={{ textDecoration: `none` }}>
                {item.name}
              </Link>
            </li>
          ))}
        </HStack>
      </nav>
      <Toggle />
    </HStack>
  )
}

export default Navigation
