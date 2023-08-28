import { style } from "@vanilla-extract/css"
import { pseudoSelectors } from "../../styles/selectors"

export const logoStyle = style({
  transform: `scale(1)`,
  selectors: {
    [pseudoSelectors.hover]: {
      transform: `scale(1.1)`,
    },
  },
})

export const innerHeaderStyle = style({
  paddingTop: `13px`,
  paddingBottom: `13px`,
})
