import { style } from "@vanilla-extract/css"
import { pseudoSelectors } from "../../styles/selectors"
import { vars } from "../../styles/themes/contract.css"

export const toggleIconStyle = style({
  color: vars.color.textMuted,
  transition: `all 0.3s ease-in-out`,
  borderRadius: vars.borderRadius.full,
  padding: 0,
  fontSize: vars.fontSize.md,
  selectors: {
    [pseudoSelectors.hover]: {
      color: vars.color.heading,
    },
  },
})
