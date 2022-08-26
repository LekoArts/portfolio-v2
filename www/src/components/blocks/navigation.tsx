import * as React from "react"
import { IconButton, useColorMode } from "@chakra-ui/react"
import { FaMoon as Moon } from "react-icons/fa"
import { MdWbSunny as Sun } from "react-icons/md"
import { Box } from "../primitives/box"
import { Link } from "../primitives/link"
import { usePrimaryNavigation } from "../../hooks/use-primary-navigation"
import { Spacer } from "../primitives/spacer"
import { navItemsWrapperStyle } from "./navigation.css"

const Toggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isLight = colorMode === `light`
  return (
    <IconButton
      aria-label={isLight ? `Activate Dark Mode` : `Activate Light Mode`}
      variant="ghost"
      color="textMuted"
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
    <Box display="flex" alignItems="center" flexDirection="row">
      <nav aria-label="Primary navigation">
        <Box display="flex" alignItems="center" flexDirection="row" as="ul" className={navItemsWrapperStyle}>
          {primaryNavigation.map((item, index) => (
            <React.Fragment key={item.link}>
              <li>
                <Link to={item.link} fontSize={[`md`, null, null, `lg`]} p="2" activeClassName="active">
                  {item.name}
                </Link>
              </li>
              {index !== primaryNavigation.length - 1 && <Spacer axis="horizontal" size={[`2`, `4`]} />}
            </React.Fragment>
          ))}
        </Box>
      </nav>
      <Spacer axis="horizontal" size={[`2`, `4`]} />
      <Toggle />
    </Box>
  )
}
