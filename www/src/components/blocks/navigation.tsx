import * as React from "react"
import { useColorMode } from "@chakra-ui/react"
import { FaMoon as Moon } from "react-icons/fa"
import { MdWbSunny as Sun } from "react-icons/md"
import { useTheme, TogglePrimitive } from "themes-utils"
import { Box } from "../primitives/box"
import { Button } from "../primitives/buttons"
import { Link } from "../primitives/link"
import { Spacer } from "../primitives/spacer"
import { usePrimaryNavigation } from "../../hooks/use-primary-navigation"
import { navItemsWrapperStyle, toggleIconStyle } from "./navigation.css"

const Toggle = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const isLight = resolvedTheme === `light`

  // TODO: Remove
  const { toggleColorMode: toggleChakra } = useColorMode()

  const toggleColorMode = React.useCallback(() => {
    setTheme(isLight ? `dark` : `light`)
  }, [isLight, setTheme])

  return (
    <TogglePrimitive>
      <Button
        aria-label={isLight ? `Activate Dark Mode` : `Activate Light Mode`}
        onClick={() => {
          toggleColorMode()
          toggleChakra()
        }}
        variant="ghost"
        size="sm"
        className={toggleIconStyle}
      >
        {isLight ? <Moon /> : <Sun fontSize="1.25rem" />}
      </Button>
    </TogglePrimitive>
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
