import * as React from "react"
import { Box, Link, Spacer } from "../primitives"
import { activeLinkStyle, innerWrapperStyle, wrapperStyle } from "./subnavigation.css"
import { useCategories } from "../../hooks/use-categories"

export const WritingSubNavigation: React.FC = () => {
  const categories = useCategories()

  return (
    <Box display="flex" alignItems="center" py="2" data-name="subnavigation" className={wrapperStyle}>
      <Box display="flex" alignItems="center" flexDirection="row" as="ul" className={innerWrapperStyle}>
        <li>
          <Link to="/writing" fontSize="md" p="2" activeClassName="active" className={activeLinkStyle}>
            Latest
          </Link>
        </li>
        <Spacer axis="horizontal" size="2" />
        <li>
          <Link to="/tutorials" fontSize="md" p="2" activeClassName="active" className={activeLinkStyle}>
            Tutorials
          </Link>
        </li>
        <Spacer axis="horizontal" size="2" />
        {categories.map((item, index) => (
          <React.Fragment key={item.slug}>
            <li>
              <Link to={item.slug} fontSize="md" p="2" activeClassName="active" className={activeLinkStyle}>
                {item.name}
              </Link>
            </li>
            {index !== categories.length - 1 && <Spacer axis="horizontal" size="2" />}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  )
}
