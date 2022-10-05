import { style } from "@vanilla-extract/css"
import { vars } from "../../styles/themes/contract.css"
import { colorPalette } from "../../styles/tokens/colors"

export const contentWrapperStyle = style({
  display: `grid`,
  gridTemplateColumns: vars.space.auto,
  gap: vars.space[12],
})

export const descriptionStyle = style({
  color: colorPalette.gray[100],
  maxWidth: `65ch`,
})
