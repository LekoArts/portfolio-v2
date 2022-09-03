import * as React from "react"
import { Box, Link, Spacer } from "../primitives"
import { usePrimaryNavigation } from "../../hooks/use-primary-navigation"
import { navItemsWrapperStyle } from "./navigation.css"
import { Toggle } from "./themes-toggle"

/**
 * Navigation component containing the primary links + Darkmode toggle
 */
export const Navigation: React.FC = () => {
  const primaryNavigation = usePrimaryNavigation()

  return (
    <Box display="flex" alignItems="center" flexDirection="row">
      <nav aria-label="Primary navigation">
        <Box display="flex" alignItems="center" flexDirection="row" as="ul" className={navItemsWrapperStyle}>
          {primaryNavigation.map((item, index) => {
            const notLastItem = index !== primaryNavigation.length - 1

            return (
              <li key={item.link}>
                <Link
                  to={item.link}
                  fontSize={[`md`, null, null, `lg`]}
                  mr={notLastItem ? [`2`, `4`] : undefined}
                  p="2"
                  activeClassName="active"
                >
                  {item.name}
                </Link>
              </li>
            )
          })}
        </Box>
      </nav>
      <Spacer axis="horizontal" size={[`2`, `4`]} />
      <Toggle />
    </Box>
  )
}
