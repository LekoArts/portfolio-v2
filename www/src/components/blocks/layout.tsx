import * as React from "react"
import { SkipNavLink } from "../a11y/skip-nav"
import { Fonts } from "./fonts"
import { Footer } from "./footer"
import { Header } from "./header"

export const Layout: React.FC<React.PropsWithChildren<{ subnavigation?: React.ReactNode }>> = ({
  children,
  subnavigation = undefined,
}) => (
  <>
    <Fonts />
    <SkipNavLink />
    <Header subnavigation={subnavigation} />
    {children}
    <Footer />
  </>
)
