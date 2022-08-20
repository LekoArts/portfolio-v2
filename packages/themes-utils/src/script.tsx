// Adapted from https://github.com/pacocoursey/next-themes
// MIT LICENSE - pacocoursey

import * as React from "react"
import { COLOR_SCHEMES, MEDIA } from "./constants"
import type { IThemeScriptProps } from "./types"

export const ThemeScript = React.memo(
  ({ storageKey = `lekoarts-themes`, defaultTheme = `system`, themes = [`light`, `dark`] }: IThemeScriptProps) => {
    const defaultSystem = defaultTheme === `system`

    // Code-golfing the amount of characters in the script
    const optimization = (() => {
      const removeClasses = `c.remove(${themes.map((t: string) => `'${t}'`).join(`,`)})`
      return `var d=document.documentElement,c=d.classList;${removeClasses};`
    })()

    const fallbackColorScheme = (() => {
      const fallback = COLOR_SCHEMES.includes(defaultTheme) ? defaultTheme : null

      if (fallback) {
        return `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${defaultTheme}'`
      }
      return `if(e==='light'||e==='dark')d.style.colorScheme=e`
    })()

    const updateDOM = (name: string, literal: boolean = false, setColorScheme = true) => {
      const val = literal ? `${name}|| ''` : `'${name}'`
      let text = ``

      // MUCH faster to set colorScheme alongside HTML attribute/class
      // as it only incurs 1 style recalculation rather than 2
      // This can save over 250ms of work for pages with big DOM
      if (setColorScheme && !literal && COLOR_SCHEMES.includes(name)) {
        text += `d.style.colorScheme = '${name}';`
      }

      if (literal || name) {
        text += `c.add(${val})`
      } else {
        text += `null`
      }

      return text
    }

    const scriptSrc = (() =>
      `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if('system'===e||(!e&&${defaultSystem})){var t='${MEDIA}',m=window.matchMedia(t);if(m.media!==t||m.matches){${updateDOM(
        `dark`
      )}}else{${updateDOM(`light`)}}}else if(e){${updateDOM(`e`, true)}}${
        !defaultSystem ? `else{${updateDOM(defaultTheme, false, false)}}` : ``
      }${fallbackColorScheme}}catch(e){}}()`)()

    return <script dangerouslySetInnerHTML={{ __html: scriptSrc }} />
  },
  // Never re-render this component
  () => true
)
