import * as React from "react"
import { Box } from "@chakra-ui/react"
import { SkipNavLink } from "../a11y/skip-nav"
import Header from "./header"
import Footer from "./footer"

const Layout: React.FC = ({ children }) => (
  <>
    <SkipNavLink />
    <Header />
    <Box data-description="Spacer for Navigation" height="navigationHeight" />
    {children}
    <Footer />
  </>
)

export default Layout
