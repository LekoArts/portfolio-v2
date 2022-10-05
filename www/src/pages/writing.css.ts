import { style } from "@vanilla-extract/css"
import { vars } from "../styles/themes/contract.css"
import { minMediaQuery } from "../styles/tokens/breakpoints"

export const cardGridStyle = style({
  display: `grid`,
  gridTemplateColumns: `1fr`,
  width: vars.space.full,
  "@media": {
    [minMediaQuery(`md`)]: {
      gridTemplateColumns: `repeat(2, 1fr)`,
    },
    [minMediaQuery(`lg`)]: {
      width: `calc(${vars.space.full} + ${vars.space[12]})`,
    },
  },
})
