import type React from "react"

export interface IUseTheme {
  themes: Array<string>
  setTheme: (theme: string) => void
  theme?: string
  resolvedTheme?: string
  systemTheme?: "light" | "dark"
}

export interface IThemeProviderProps {
  themes?: Array<string>
  storageKey?: string
  defaultTheme?: string
  nonce?: string
  children?: React.ReactNode
}
