import { style } from "@vanilla-extract/css"
import { vars } from "../../styles/themes/contract.css"
import { colorPalette } from "../../styles/tokens/colors"
import { minMediaQuery } from "../../styles/tokens/breakpoints"

export const contentWrapperStyle = style({
  display: `grid`,
  gridTemplateColumns: `1fr`,
  gap: vars.space[12],
  "@media": {
    [minMediaQuery(`sm`)]: {
      gridTemplateColumns: `3fr 1fr`,
    },
    [minMediaQuery(`md`)]: {
      gridTemplateColumns: `2.5fr 1fr`,
    },
    [minMediaQuery(`lg`)]: {
      gridTemplateColumns: `2fr 1fr`,
    },
    [minMediaQuery(`xl`)]: {
      gridTemplateColumns: `1.75fr 1fr`,
    },
  },
})

export const imageWrapperStyle = style({
  display: `none`,
  "@media": {
    [minMediaQuery(`sm`)]: {
      display: `block`,
    },
  },
})

export const descriptionStyle = style({
  color: colorPalette.gray[100],
  maxWidth: `65ch`,
})
