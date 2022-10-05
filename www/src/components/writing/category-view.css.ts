import { style } from "@vanilla-extract/css"
import { vars } from "../../styles/themes/contract.css"
import { minMediaQuery } from "../../styles/tokens/breakpoints"

export const contentGridStyle = style({
  display: `grid`,
  gap: vars.space[8],
  gridTemplateColumns: `1fr`,
  marginLeft: vars.space[0],
  marginRight: vars.space[0],
  "@media": {
    [minMediaQuery(`md`)]: {
      gridTemplateColumns: `repeat(2, 1fr)`,
    },
    [minMediaQuery(`lg`)]: {
      marginLeft: `calc(${vars.space[6]} * -1)`,
      marginRight: `calc(${vars.space[6]} * -1)`,
    },
  },
})
