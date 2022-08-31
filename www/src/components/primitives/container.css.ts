import { style, StyleRule, styleVariants } from "@vanilla-extract/css"
import { vars } from "../../styles/themes/contract.css"
import { minMediaQuery } from "../../styles/tokens/breakpoints"
import { colorPalette } from "../../styles/tokens/colors"

const containerBaseStyle = style({
  width: vars.space.full,
  marginLeft: vars.space.auto,
  marginRight: vars.space.auto,
  maxWidth: `1024px`,
  paddingLeft: vars.space[4],
  paddingRight: vars.space[4],
  "@media": {
    [minMediaQuery(`sm`)]: {
      paddingLeft: vars.space[6],
      paddingRight: vars.space[6],
    },
  },
})

export type ContainerVariants = "default" | "hero" | "light" | "dark" | "navigation" | "fullBleed" | "proseRoot"

const containers: Record<ContainerVariants, StyleRule> = {
  default: {},
  hero: {},
  light: {},
  dark: {
    color: colorPalette.blueGray[300],
  },
  navigation: {},
  fullBleed: {},
  proseRoot: {
    paddingTop: vars.space[16],
    paddingBottom: vars.space[20],
    "@media": {
      [minMediaQuery(`lg`)]: {
        paddingBottom: vars.space[24],
      },
    },
  },
}

export const containerVariants = styleVariants(containers, (container) => [containerBaseStyle, container])
