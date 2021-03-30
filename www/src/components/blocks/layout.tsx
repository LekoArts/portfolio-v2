import * as React from "react"
import { SkipNavLink } from "../a11y/skip-nav"
import { Footer } from "./footer"
import { Header } from "./header"

export const Layout: React.FC<{ subnavigation?: React.ReactNode }> = ({ children, subnavigation = undefined }) => (
  <>
    <SkipNavLink />
    <Header subnavigation={subnavigation} />
    {children}
    <Footer />
  </>
)
