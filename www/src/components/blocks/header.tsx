import * as React from "react"
import useSiteMetadata from "../../hooks/use-site-metadata"
import Link from "../link"

const Logo = () => {
  const { siteTitle } = useSiteMetadata()

  return (
    <Link to="/" textStyle="logo">
      {siteTitle}
    </Link>
  )
}

const Header = () => (
  <header>
    <Logo />
  </header>
)

export default Header
