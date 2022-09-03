import { globalStyle, style } from "@vanilla-extract/css"
import { bodyFontFamilyClass } from "../../styles/fonts.css"
import { pseudoSelectors } from "../../styles/selectors"
import { vars } from "../../styles/themes/contract.css"

export const introductionStyle = style({
  marginTop: `0 !important`,
  marginBottom: `0 !important`,
})

export const headingStyle = style({})

globalStyle(`${headingStyle}:hover a`, {
  visibility: `visible`,
})

export const anchorStyle = style([
  bodyFontFamilyClass,
  {
    left: `calc(${vars.space[10]} * -1)`,
    transition: `all 0.3s ease-in-out`,
    visibility: `hidden`,
    textDecoration: `none !important`,
    opacity: 0.3,
    selectors: {
      [pseudoSelectors.hover]: {
        opacity: 1,
      },
    },
  },
])
