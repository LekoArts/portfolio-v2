import { style } from "@vanilla-extract/css"
import { vars } from "../../styles/themes/contract.css"

export const wrapperStyle = style({
  overflowX: `auto`,
  overflowY: `hidden`,
})

export const innerWrapperStyle = style({
  listStyleType: `none`,
  marginLeft: `calc(${vars.space[2]} * -1)`,
})

export const activeLinkStyle = style({
  selectors: {
    "&.active": {
      fontWeight: vars.fontWeight.semibold,
    },
  },
})
