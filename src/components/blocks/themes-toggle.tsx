import * as React from "react"
import { TogglePrimitive, useTheme } from "../../themes-utils"
import { Button, SVGIcon } from "../primitives"
import { toggleIconStyle } from "./themes-toggle.css"
import { DEFAULT_THEME, THEMES } from "../../constants/themes"
import { capitalize } from "../../utils/capitalize.mjs"

const SystemIcon = () => <SVGIcon id="computer" height="1.25em" width="1.25em" />

const THEMES_STATES = [DEFAULT_THEME, ...THEMES]
const THEMES_ICONS_MAP = {
  [DEFAULT_THEME]: <SystemIcon />,
  light: <SVGIcon id="sun" height="1.25em" width="1.25em" />,
  dark: <SVGIcon id="moon" height="1.25em" width="1.25em" />,
}

export const Toggle = () => {
  const { setTheme, theme } = useTheme()

  const nextTheme = THEMES_STATES[(THEMES_STATES.indexOf(theme) + 1) % THEMES_STATES.length]

  const switchTheme = React.useCallback(() => {
    setTheme(nextTheme)
  }, [setTheme, nextTheme])

  const label = `Switch to "${capitalize(nextTheme)}" theme`

  return (
    <TogglePrimitive fallback={<SystemIcon />}>
      <Button
        aria-label={label}
        title={label}
        onClick={switchTheme}
        variant="ghost"
        size="sm"
        className={toggleIconStyle}
      >
        {THEMES_ICONS_MAP[theme]}
      </Button>
    </TogglePrimitive>
  )
}
