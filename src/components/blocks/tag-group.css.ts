import { style } from "@vanilla-extract/css"
import { themesSelectors } from "../../styles/atoms.css"
import { pseudoSelectors } from "../../styles/selectors"
import { vars } from "../../styles/themes/contract.css"
import { darkThemeClass } from "../../styles/themes/dark.css"
import { minMediaQuery } from "../../styles/tokens/breakpoints"
import { colorPalette } from "../../styles/tokens/colors"

export const tagGroupStyle = style({
  display: `flex`,
  flexWrap: `wrap`,
})

export const tagStyle = style({
  background: colorPalette.blueGray[100],
  color: colorPalette.blueGray[800],
  minHeight: vars.space[8],
  minWidth: vars.space[8],
  fontSize: vars.fontSize.sm,
  paddingLeft: vars.space[3],
  paddingRight: vars.space[3],
  fontWeight: vars.fontWeight.medium,
  outline: 0,
  borderRadius: vars.borderRadius.md,
  marginRight: vars.space[2],
  marginBottom: vars.space[2],
  display: `inline-flex`,
  verticalAlign: `top`,
  alignItems: `center`,
  maxWidth: `100%`,
  lineHeight: vars.lineHeight.shorter,
  "@media": {
    [minMediaQuery(`lg`)]: {
      fontSize: vars.fontSize.md,
    },
  },
  selectors: {
    [pseudoSelectors.hover]: {
      cursor: `pointer`,
    },
    [pseudoSelectors.focus]: {
      boxShadow: vars.shadow.outline,
      outline: `none`,
    },
    [`&.active`]: {
      background: colorPalette.blue[100],
      color: colorPalette.blue[800],
    },
    [themesSelectors.dark]: {
      background: colorPalette.blueGray[800],
      color: colorPalette.blueGray[100],
    },
    [`html${darkThemeClass} &.active`]: {
      background: colorPalette.blue[800],
      color: colorPalette.blue[100],
    },
  },
})

export const tagCloseIconStyle = style({
  fontSize: vars.fontSize.lg,
  width: vars.space[5],
  height: vars.space[5],
  marginLeft: vars.space[2],
  opacity: 0.5,
  selectors: {
    [pseudoSelectors.hover]: {
      opacity: 0.8,
    },
    [`&.active`]: {
      opacity: 1,
    },
  },
})
