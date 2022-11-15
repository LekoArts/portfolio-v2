import { globalStyle } from "@vanilla-extract/css"
import { darkThemeClass } from "../themes/dark.css"
import { lightThemeClass } from "../themes/light.css"
import { nightOwl } from "./nightOwl"
import { nightOwlLight } from "./nightOwlLight"
import { themeWithCssVariables } from "./prism-utils"

const { variables: lightTheme } = themeWithCssVariables(nightOwlLight)
const { variables: darkTheme } = themeWithCssVariables(nightOwl)

globalStyle(lightThemeClass, {
  vars: lightTheme,
})

globalStyle(darkThemeClass, {
  vars: darkTheme,
})
