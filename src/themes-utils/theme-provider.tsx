// Adapted from https://github.com/pacocoursey/next-themes
// MIT LICENSE - pacocoursey

/* eslint-disable react-hooks/exhaustive-deps */

import * as React from "react"
import type { IThemeProviderProps } from "./types"
import { disableAnimation, getSystemTheme, getThemeFromLocalstorage } from "./utils"
import { ThemeContext } from "./use-theme"
import { COLOR_SCHEMES, MEDIA } from "./constants"
import { ThemeScript } from "./script"

export const ThemeProvider: React.FC<React.PropsWithChildren<IThemeProviderProps>> = (props) => {
  const context = React.useContext(ThemeContext)
  const { children } = props

  // Ignore nested context providers, just passthrough children
  if (context) return <React.Fragment>{children}</React.Fragment>
  return <Theme {...props} />
}

const Theme: React.FC<IThemeProviderProps> = ({
  disableTransitionOnChange = false,
  storageKey = `lekoarts-themes`,
  themes = [`light`, `dark`],
  defaultTheme = `system`,
  value,
  children,
}) => {
  const [theme, setThemeState] = React.useState(() => getThemeFromLocalstorage(storageKey, defaultTheme))
  const [resolvedTheme, setResolvedTheme] = React.useState(() => getThemeFromLocalstorage(storageKey))
  const pendingThemeUpdate = React.useRef<string>()
  const attrs = !value ? themes : Object.values(value)

  const applyTheme = React.useCallback((t) => {
    let resolved = t
    if (!resolved) return

    // If theme is system, resolve it before setting theme
    if (t === `system`) {
      resolved = getSystemTheme()
    }

    const name = value ? value[resolved] : resolved
    const enable = disableTransitionOnChange ? disableAnimation() : null
    const d = document.documentElement

    d.classList.remove(...attrs)

    if (name) d.classList.add(name)

    const fallback = COLOR_SCHEMES.includes(defaultTheme) ? defaultTheme : null
    const colorScheme = COLOR_SCHEMES.includes(resolved) ? resolved : fallback
    d.style.colorScheme = colorScheme

    enable?.()
  }, [])

  const setTheme = React.useCallback((t) => {
    setThemeState(t)
    // Save to storage
    try {
      localStorage.setItem(storageKey, t)
    } catch (e) {
      // Unsupported
    }
  }, [])

  const handleMediaQuery = React.useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemTheme(e)
      setResolvedTheme(resolved)

      if (theme === `system`) {
        applyTheme(`system`)
      }
    },
    [theme]
  )

  // Always listen to System preference
  React.useEffect(() => {
    const media = window.matchMedia(MEDIA)

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handleMediaQuery)
    handleMediaQuery(media)

    return () => media.removeListener(handleMediaQuery)
  }, [handleMediaQuery])

  // localStorage event handling
  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) {
        return
      }

      // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
      const t = e.newValue || defaultTheme
      setTheme(t)
    }

    window.addEventListener(`storage`, handleStorage)
    return () => window.removeEventListener(`storage`, handleStorage)
  }, [setTheme])

  React.useEffect(() => {
    if (pendingThemeUpdate.current) {
      setTheme(pendingThemeUpdate.current) // Apply theme sent with storage-event
      applyTheme(pendingThemeUpdate.current) // Apply the theme
      pendingThemeUpdate.current = undefined
      return
    }

    applyTheme(theme)
  }, [theme])

  return (
    <ThemeContext.Provider
      // TODO: Investigate if necessary
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        theme,
        setTheme,
        resolvedTheme: theme === `system` ? resolvedTheme : theme,
        themes: [...themes, `system`],
        systemTheme: resolvedTheme,
      }}
    >
      <ThemeScript
        {...{
          storageKey,
          defaultTheme,
          value,
          attrs,
        }}
      />
      {children}
    </ThemeContext.Provider>
  )
}
