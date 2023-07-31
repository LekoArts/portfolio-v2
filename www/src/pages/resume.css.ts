import { style } from "@vanilla-extract/css"
import { vars } from "../styles/themes/contract.css"
import { minMediaQuery } from "../styles/tokens/breakpoints"

export const summaryWrapperStyle = style({
  display: `grid`,
  gridTemplateColumns: `1fr`,
  gridGap: vars.space[4],
  "@media": {
    [minMediaQuery(`sm`)]: {
      gridTemplateColumns: `2.5fr 1fr`,
      gridGap: vars.space[6],
    },
    [minMediaQuery(`md`)]: {
      gridTemplateColumns: `3fr 1fr`,
      gridGap: vars.space[12],
    },
  },
})

export const imgStyle = style({
  boxShadow: vars.shadow.lg,
  borderRadius: vars.borderRadius.lg,
})
