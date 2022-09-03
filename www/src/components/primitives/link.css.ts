import { style } from "@vanilla-extract/css"
import { pseudoSelectors } from "../../styles/selectors"
import { vars } from "../../styles/themes/contract.css"

export const linkStyle = style({
  transition: `all .3s ease-in-out`,
  cursor: `pointer`,
  textDecoration: `none`,
  outline: `2px solid transparent`,
  outlineOffset: `2px`,
  color: `inherit`,
  selectors: {
    [pseudoSelectors.hover]: {
      textDecoration: `underline`,
    },
    [pseudoSelectors.focus]: {
      boxShadow: vars.shadow.outline,
    },
  },
})
