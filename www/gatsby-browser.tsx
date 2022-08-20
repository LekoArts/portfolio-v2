import * as React from "react"
import type { GatsbyBrowser } from "gatsby"
import { ThemeProvider } from "themes-utils"
import { DEFAULT_THEME, STORAGE_KEY, THEMES } from "./src/constants/themes"
import "./src/styles/fonts.css"
import "./src/styles/global.css"

export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = () => {
  if (process.env.NODE_ENV === `production` && typeof window.plausible !== `undefined`) {
    window.plausible(`pageview`)
  }
}

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => (
  <ThemeProvider
    defaultTheme={DEFAULT_THEME}
    storageKey={STORAGE_KEY}
    themes={THEMES}
    key="theme-utils-provider"
    disableTransitionOnChange
  >
    {element}
  </ThemeProvider>
)
