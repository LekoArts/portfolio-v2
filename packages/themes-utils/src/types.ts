import type React from "react"

export interface IUseTheme {
  themes: Array<string>
  setTheme: (theme: string) => void
  theme: string
  resolvedTheme?: string
  systemTheme?: "light" | "dark"
}

export interface IThemeProviderProps {
  themes?: ReadonlyArray<string>
  storageKey?: string
  defaultTheme?: string
  disableTransitionOnChange?: boolean
  children?: React.ReactNode
  value?: Record<string, string>
}

export interface IThemeScriptProps {
  storageKey?: string
  defaultTheme?: string
  value?: Record<string, string>
  attrs: ReadonlyArray<string>
}
