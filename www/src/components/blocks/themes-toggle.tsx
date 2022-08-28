import * as React from "react"
import { TogglePrimitive, useTheme } from "themes-utils"
import { FaMoon as Moon } from "react-icons/fa"
import { MdWbSunny as Sun } from "react-icons/md"
import { capitalize } from "utils"
import { Button } from "../primitives/buttons"
import { toggleIconStyle } from "./themes-toggle.css"
import { DEFAULT_THEME, THEMES } from "../../constants/themes"

const SunMoon = () => <span>S</span>

const THEMES_STATES = [DEFAULT_THEME, ...THEMES]
const THEMES_ICONS_MAP = {
  [DEFAULT_THEME]: <SunMoon />,
  light: <Sun fontSize="1.25rem" />,
  dark: <Moon />,
}

export const Toggle = () => {
  const { setTheme, theme } = useTheme()

  const nextTheme = THEMES_STATES[(THEMES_STATES.indexOf(theme) + 1) % THEMES_STATES.length]

  const switchTheme = React.useCallback(() => {
    setTheme(nextTheme)
  }, [setTheme, nextTheme])

  return (
    <TogglePrimitive fallback={<SunMoon />}>
      <Button
        aria-label={`Switch to theme ${capitalize(nextTheme)}`}
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
