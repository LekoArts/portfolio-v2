import { style } from "@vanilla-extract/css"
import { pseudoSelectors } from "../../styles/selectors"
import { vars } from "../../styles/themes/contract.css"

export const copyButtonStyle = style({
  transition: `all 0.3s ease-in-out`,
  background: `transparent`,
  selectors: {
    [pseudoSelectors.hover]: {
      background: vars.color.copyButtonBg,
      boxShadow: `inset 0 1px 0px 0px rgba(255, 255, 255, 0.1), inset 0 -1px 0px 0px rgba(0, 0, 0, 0.1)`,
    },
    [pseudoSelectors.disabled]: {
      opacity: 0.5,
      cursor: `not-allowed`,
    },
  },
})
