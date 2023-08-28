import * as React from "react"
import type { IUseTheme } from "./types"

export const ThemeContext = React.createContext<IUseTheme | undefined>(undefined)
ThemeContext.displayName = `ThemeContext`
const defaultContext: IUseTheme = { setTheme: (_) => {}, themes: [], theme: `system` }

export const useTheme = () => React.useContext(ThemeContext) ?? defaultContext
