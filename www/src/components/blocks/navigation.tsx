import * as React from "react"
import { Box } from "../primitives/box"
import { Link } from "../primitives/link"
import { Spacer } from "../primitives/spacer"
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
