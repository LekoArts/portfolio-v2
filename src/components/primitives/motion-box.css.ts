import { style, createVar } from "@vanilla-extract/css"
import { pseudoSelectors } from "../../styles/selectors"
import { transforms } from "../../styles/tokens/motion"

const boxShadowVar = createVar()
const transformVar = createVar()

export const motionBoxStyle = style({
  vars: {
    [boxShadowVar]: `inherit`,
    [transformVar]: transforms.beforeHover.transform,
  },
  selectors: {
    [pseudoSelectors.hover]: {
      vars: {
        [boxShadowVar]: transforms.onHover.boxShadow,
        [transformVar]: transforms.onHover.transform,
      },
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      vars: {
        [boxShadowVar]: `inherit !important`,
        [transformVar]: `${transforms.beforeHover.transform} !important`,
      },
    },
  },
  transition: transforms.beforeHover.transition,
  boxShadow: boxShadowVar,
  transform: transformVar,
})
