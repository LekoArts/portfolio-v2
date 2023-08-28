import { style, StyleRule, styleVariants } from "@vanilla-extract/css"
import { themesSelectors } from "../../styles/atoms.css"
import { vars } from "../../styles/themes/contract.css"
import { colorPalette } from "../../styles/tokens/colors"

export type Badges = "light" | "dark"

const badgeBaseStyle = style({
  letterSpacing: vars.letterSpacing.widest,
  whiteSpace: `nowrap`,
  verticalAlign: `middle`,
  textTransform: `uppercase`,
})

const lightDarkBaseStyle = style({
  paddingLeft: vars.space[4],
  paddingRight: vars.space[4],
  paddingTop: `calc(${vars.space.px} * 4)`,
  paddingBottom: `calc(${vars.space.px} * 4)`,
  borderRadius: vars.borderRadius.xl,
})

const badges: Record<Badges, StyleRule> = {
  light: {
    background: vars.color.bg,
    color: colorPalette.blueGray[500],
    selectors: {
      [themesSelectors.dark]: {
        color: colorPalette.blueGray[400],
      },
    },
  },
  dark: {
    background: colorPalette.blueGray[50],
    color: colorPalette.blueGray[600],
    selectors: {
      [themesSelectors.dark]: {
        background: colorPalette.blueGray[800],
        color: colorPalette.blueGray[400],
      },
    },
  },
}

export const badgeVariants = styleVariants(badges, (badge) => [badgeBaseStyle, lightDarkBaseStyle, badge])
