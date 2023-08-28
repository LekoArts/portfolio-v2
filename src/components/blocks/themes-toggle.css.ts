import { globalStyle, style } from "@vanilla-extract/css"
import { pseudoSelectors } from "../../styles/selectors"
import { vars } from "../../styles/themes/contract.css"
import { colorPalette } from "../../styles/tokens/colors"

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

globalStyle(`div[data-variant-name="fullBleed"] .${toggleIconStyle}`, {
  color: colorPalette.gray[100],
})

globalStyle(`div[data-variant-name="fullBleed"] .${toggleIconStyle}:hover`, {
  color: `white`,
})
