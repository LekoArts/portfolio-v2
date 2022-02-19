import * as React from "react"
import { SkipNavLink } from "../a11y/skip-nav"
import { SEO } from "../seo"
import { Fonts } from "./fonts"
import { Footer } from "./footer"
import { Header } from "./header"

export const Layout: React.FC<{ subnavigation?: React.ReactNode }> = ({ children, subnavigation = undefined }) => (
  <>
    <Fonts />
    <SkipNavLink />
    <SEO />
    <Header subnavigation={subnavigation} />
    {children}
    <Footer />
  </>
)
