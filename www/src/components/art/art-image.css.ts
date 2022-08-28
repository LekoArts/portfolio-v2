import { style } from "@vanilla-extract/css"
import { vars } from "../../styles/themes/contract.css"

export const artImageStyle = style({
  boxShadow: vars.shadow.lg,
  marginLeft: `auto`,
  marginRight: `auto`,
})
