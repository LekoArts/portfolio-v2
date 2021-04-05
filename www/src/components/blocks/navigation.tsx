import * as React from "react"
import { IconButton, useColorMode, HStack } from "@chakra-ui/react"
import { FaMoon as Moon } from "react-icons/fa"
import { MdWbSunny as Sun } from "react-icons/md"
import { usePrimaryNavigation } from "../../hooks/use-primary-navigation"
import { Link } from "../link"

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

/**
 * Navigation component containing the primary links + Darkmode toggle
 */
export const Navigation: React.FC = () => {
  const primaryNavigation = usePrimaryNavigation()

  return (
    <HStack spacing={[`2`, `4`]}>
      <nav aria-label="Primary navigation">
        <HStack as="ul" listStyleType="none" spacing={[`2`, `4`]}>
          {primaryNavigation.map((item) => (
            <li key={item.link}>
              <Link to={item.link} fontSize={[`md`, null, null, `lg`]} p="2" activeClassName="active">
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
