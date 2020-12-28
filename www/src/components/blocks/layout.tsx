import * as React from "react"
import { SkipNavLink } from "../a11y/skip-nav"
import Header from "./header"

const Layout: React.FC = ({ children }) => (
  <>
    <SkipNavLink />
    <Header />
    {children}
  </>
)

export default Layout
