import * as React from "react"
import { useLocation } from "@gatsbyjs/reach-router"
import { Box, Link, Spacer, SVGIcon } from "../primitives"
import { FullWidthContainer } from "./full-width-container"
import { Navigation } from "./navigation"
import { innerHeaderStyle, logoStyle } from "./header.css"
import { useDistinctCategories } from "../../hooks/use-distinct-categories"

const Logo: React.FC = () => (
  <Link to="/" aria-label="lekoarts.de, Back to homepage" className={logoStyle}>
    <SVGIcon id="logo" width="35" height="35" viewBox="0 0 150 150" aria-hidden="true" focusable="false" />
  </Link>
)

type HeaderProps = {
  subnavigation?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ subnavigation = undefined }) => {
  const categorySlugs = useDistinctCategories()
  const location = useLocation()
  const isCategoryPage = categorySlugs.includes(location.pathname)
  const variant = subnavigation ? `navigationWithSub` : `navigation`
  const height = subnavigation ? `navigationWithSubHeight` : `navigationHeight`

  return (
    <>
      <FullWidthContainer variant={isCategoryPage ? `fullBleed` : variant} height={height}>
        <Box display="flex" as="header" alignItems="center" justifyContent="space-between" className={innerHeaderStyle}>
          <Logo />
          <Navigation />
        </Box>
        {subnavigation}
      </FullWidthContainer>
      {!isCategoryPage && <Spacer size={height} axis="vertical" />}
    </>
  )
}
