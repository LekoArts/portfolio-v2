import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles"
import { breakpoints, breakpointNames } from "./tokens/breakpoints"
import { responsiveProperties, unresponsiveProperties } from "./atomic-properties"
import { lightThemeClass } from "./themes/light.css"
import { darkThemeClass } from "./themes/dark.css"
import { vars } from "./themes/contract.css"

const unresponsiveAtomicProperties = defineProperties({
  properties: unresponsiveProperties,
})

const themesSelectors = {
  light: `html${lightThemeClass} &`,
  dark: `html${darkThemeClass} &`,
}

const colorAtomicProperties = defineProperties({
  conditions: {
    light: { selector: themesSelectors.light },
    dark: { selector: themesSelectors.dark },
    hover: { selector: `&:hover` },
    focus: { selector: `&:focus` },
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
      "@media": `screen and (min-width: ${breakpoints.sm}px)`,
    },
    md: {
      "@media": `screen and (min-width: ${breakpoints.md}px)`,
    },
    lg: {
      "@media": `screen and (min-width: ${breakpoints.lg}px)`,
    },
    xl: {
      "@media": `screen and (min-width: ${breakpoints.xl}px)`,
    },
    "2xl": {
      "@media": `screen and (min-width: ${breakpoints[`2xl`]}px)`,
    },
  },
  responsiveArray: breakpointNames,
  properties: responsiveProperties,
  shorthands: {
    p: [`paddingBottom`, `paddingTop`, `paddingLeft`, `paddingRight`],
    py: [`paddingTop`, `paddingBottom`],
    px: [`paddingLeft`, `paddingRight`],
    pt: [`paddingTop`],
    pb: [`paddingBottom`],
    pl: [`paddingLeft`],
    pr: [`paddingRight`],
    m: [`marginBottom`, `marginTop`, `marginLeft`, `marginRight`],
    mt: [`marginTop`],
    mr: [`marginRight`],
    mb: [`marginBottom`],
    ml: [`marginLeft`],
    my: [`marginTop`, `marginBottom`],
    mx: [`marginLeft`, `marginRight`],
  },
})

export const atoms = createSprinkles(unresponsiveAtomicProperties, colorAtomicProperties, responsiveAtomicProperties)

export type Atoms = Parameters<typeof atoms>[0]
