import { createTheme } from "@vanilla-extract/css"
import { vars } from "./contract.css"
import { darkThemeColors } from "../tokens/colors"
import { BASE } from "./base"

export const darkThemeClass = createTheme(vars, {
  color: darkThemeColors,
  ...BASE,
})
