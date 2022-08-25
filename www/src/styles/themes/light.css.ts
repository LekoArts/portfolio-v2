import { createTheme } from "@vanilla-extract/css"
import { vars } from "./contract.css"
import { lightThemeColors } from "../tokens/colors"
import { BASE } from "./base"

export const lightThemeClass = createTheme(vars, {
  color: lightThemeColors,
  ...BASE,
})
