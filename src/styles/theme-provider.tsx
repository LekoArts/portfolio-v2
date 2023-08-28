import * as React from "react"
import { ThemeProvider as ThemeUtilsProvider } from "../themes-utils"
import { DEFAULT_THEME, STORAGE_KEY, THEMES } from "../constants/themes"
import { darkThemeClass } from "./themes/dark.css"
import { lightThemeClass } from "./themes/light.css"

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ThemeUtilsProvider
    defaultTheme={DEFAULT_THEME}
    storageKey={STORAGE_KEY}
    themes={THEMES}
    key="theme-utils-provider"
    disableTransitionOnChange
    value={{
      light: lightThemeClass,
      dark: darkThemeClass,
    }}
  >
    {children}
  </ThemeUtilsProvider>
)
