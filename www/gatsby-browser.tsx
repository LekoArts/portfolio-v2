import * as React from "react"
import type { GatsbyBrowser } from "gatsby"
import { ThemeProvider } from "./src/styles/theme-provider"
import "./src/styles/global.css"
import "./src/styles/fonts.css"

export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = () => {
  if (process.env.NODE_ENV === `production` && typeof window.plausible !== `undefined`) {
    window.plausible(`pageview`)
  }
}

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)
