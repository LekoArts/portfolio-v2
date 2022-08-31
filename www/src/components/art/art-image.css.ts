import { style } from "@vanilla-extract/css"
import { vars } from "../../styles/themes/contract.css"

export const artImageStyle = style({
  boxShadow: vars.shadow.lg,
  marginLeft: vars.space.auto,
  marginRight: vars.space.auto,
})
