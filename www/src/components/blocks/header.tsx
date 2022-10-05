import * as React from "react"
import { useLocation } from "@gatsbyjs/reach-router"
import { Box, Link, Spacer, SVGIcon } from "../primitives"
import { FullWidthContainer } from "./full-width-container"
import { Navigation } from "./navigation"
import { innerHeaderStyle, logoStyle } from "./header.css"
import { useDistinctCategories } from "../../hooks/use-distinct-categories"

const Logo: React.FC = () => (
  <Link to="/" aria-label="lekoarts.de, Back to homepage" className={logoStyle}>
    <SVGIcon id="logo" width="35" height="35" viewBox="0 0 150 150" />
  </Link>
)

type HeaderProps = {
  subnavigation?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ subnavigation = undefined }) => {
  const categorySlugs = useDistinctCategories()
  const location = useLocation()
  const isCategoryPage = categorySlugs.includes(location.pathname)
  const height = subnavigation ? `navigationWithSubHeight` : `navigationHeight`
  const variant = isCategoryPage ? `fullBleed` : `navigation`

  return (
    <>
      <FullWidthContainer variant={variant} height={height} data-variant-name={variant}>
        <Box
          display="flex"
          as="header"
          color={variant === `navigation` ? `heading` : undefined}
          alignItems="center"
          justifyContent="space-between"
          __color={variant === `fullBleed` ? `white` : undefined}
          className={innerHeaderStyle}
        >
          <Logo />
          <Navigation />
        </Box>
        {subnavigation}
      </FullWidthContainer>
      {!isCategoryPage && <Spacer size={height} axis="vertical" />}
    </>
  )
}
