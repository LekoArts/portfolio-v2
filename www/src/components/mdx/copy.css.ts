import { style } from "@vanilla-extract/css"
import { pseudoSelectors } from "../../styles/selectors"

export const copyButtonStyle = style({
  transition: `all 0.3s ease-in-out`,
  border: `1px solid transparent`,
  selectors: {
    [pseudoSelectors.hover]: {
      border: `1px solid currentColor`,
    },
    [pseudoSelectors.disabled]: {
      opacity: 0.5,
      cursor: `not-allowed`,
    },
  },
})
