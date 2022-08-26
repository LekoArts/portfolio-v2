import { style } from "@vanilla-extract/css"
import { vars } from "../../styles/themes/contract.css"

export const contentWrapperStyle = style({
  display: `grid`,
  gridTemplateColumns: `auto`,
  gap: vars.space[12],
})
