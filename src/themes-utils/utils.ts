// Adapted from https://github.com/pacocoursey/next-themes
// MIT LICENSE - pacocoursey

import { IS_SERVER, MEDIA } from "./constants"

export const getThemeFromLocalstorage = (key: string, fallback?: string) => {
  if (IS_SERVER) return undefined
  let theme

  try {
    theme = localStorage.getItem(key) || undefined
  } catch (e) {
    // Do nothing
  }

  return theme || fallback
}

export const disableAnimation = () => {
  const css = document.createElement(`style`)
  css.appendChild(
    document.createTextNode(
      `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
    )
  )
  document.head.appendChild(css)

  return () => {
    // Force restyle
    ;(() => window.getComputedStyle(document.body))()

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css)
    }, 1)
  }
}

export const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  // eslint-disable-next-line no-param-reassign
  if (!e) e = window.matchMedia(MEDIA)
  const isDark = e.matches
  const systemTheme = isDark ? `dark` : `light`
  return systemTheme
}
