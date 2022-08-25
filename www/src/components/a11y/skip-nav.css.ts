import { style } from "@vanilla-extract/css"
import { pseudoSelectors } from "../../styles/selectors"
import { zIndices } from "../../styles/tokens/z-indices"

export const skipNavLinkStyle = style({
  border: 0,
  height: `1px`,
  width: `1px`,
  margin: `-1px`,
  padding: 0,
  overflow: `hidden`,
  position: `absolute`,
  clip: `rect(0 0 0 0)`,
  selectors: {
    [pseudoSelectors.focus]: {
      padding: `1rem`,
      position: `fixed`,
      top: `10px`,
      left: `10px`,
      background: `bg`,
      zIndex: zIndices.skipLink,
      width: `auto`,
      height: `auto`,
      clip: `auto`,
    },
  },
})
