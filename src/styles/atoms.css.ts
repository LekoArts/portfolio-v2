import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles"
import { breakpointNames, minMediaQuery } from "./tokens/breakpoints"
import { responsiveProperties, unresponsiveProperties } from "./atomic-properties"
import { lightThemeClass } from "./themes/light.css"
import { darkThemeClass } from "./themes/dark.css"
import { vars } from "./themes/contract.css"

const unresponsiveAtomicProperties = defineProperties({
  properties: unresponsiveProperties,
})

export const themesSelectors = {
  light: `html${lightThemeClass} &`,
  dark: `html${darkThemeClass} &`,
}

const colorAtomicProperties = defineProperties({
  conditions: {
    light: { selector: themesSelectors.light },
    dark: { selector: themesSelectors.dark },
  },
  defaultCondition: [`light`, `dark`],
  properties: {
    color: vars.color,
    background: vars.color,
  },
  shorthands: {
    bg: [`background`],
  },
})

const responsiveAtomicProperties = defineProperties({
  defaultCondition: `mobile`,
  conditions: {
    mobile: {},
    sm: {
      "@media": minMediaQuery(`sm`),
    },
    md: {
      "@media": minMediaQuery(`md`),
    },
    lg: {
      "@media": minMediaQuery(`lg`),
    },
    xl: {
      "@media": minMediaQuery(`xl`),
    },
    "2xl": {
      "@media": minMediaQuery(`2xl`),
    },
  },
  responsiveArray: breakpointNames,
  properties: responsiveProperties,
  shorthands: {
    m: [`marginBottom`, `marginTop`, `marginLeft`, `marginRight`],
    mx: [`marginLeft`, `marginRight`],
    my: [`marginTop`, `marginBottom`],
    p: [`paddingBottom`, `paddingTop`, `paddingLeft`, `paddingRight`],
    px: [`paddingLeft`, `paddingRight`],
    py: [`paddingTop`, `paddingBottom`],
  },
})

export const atoms = createSprinkles(unresponsiveAtomicProperties, colorAtomicProperties, responsiveAtomicProperties)

export type Atoms = Parameters<typeof atoms>[0]
