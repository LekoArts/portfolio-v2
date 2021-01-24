import * as React from "react"
import { SkipNavLink } from "../a11y/skip-nav"
import Header from "./header"
import Footer from "../footer"

const Layout: React.FC<{ subnavigation?: React.ReactNode }> = ({ children, subnavigation = undefined }) => (
  <>
    <SkipNavLink />
    <Header subnavigation={subnavigation} />
    {children}
    <Footer />
  </>
)

export default Layout
