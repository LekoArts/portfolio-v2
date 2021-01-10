import * as React from "react"
import { IconButton, useColorMode, HStack } from "@chakra-ui/react"
import { FaMoon as Moon } from "react-icons/fa"
import { MdWbSunny as Sun } from "react-icons/md"
import Link from "./link"
import useSiteMetadata from "../hooks/use-site-metadata"

const Toggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isLight = colorMode === `light`
  return (
    <IconButton
      aria-label={isLight ? `Activate Dark Mode` : `Activate Light Mode`}
      variant="ghost"
      color={isLight ? `brand.textMuted` : `brand.dark.textMuted`}
      _hover={{ color: isLight ? `black` : `white` }}
      icon={isLight ? <Moon /> : <Sun fontSize="1.25rem" />}
      onClick={toggleColorMode}
    />
  )
}

const Navigation: React.FC = () => {
  const { primaryNavigation } = useSiteMetadata()

  return (
    <HStack spacing="4">
      <nav aria-label="Primary navigation">
        <HStack as="ul" listStyleType="none" spacing="4">
          {primaryNavigation.map((item) => (
            <li key={item.link}>
              <Link to={item.link} fontSize={[`md`, null, null, `lg`]} p="2">
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
