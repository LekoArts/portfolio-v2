import { createThemeContract } from "@vanilla-extract/css"
import { nullColors } from "../tokens/colors"
import { BASE } from "./base"

export const vars = createThemeContract({
  color: nullColors,
  ...BASE,
})
