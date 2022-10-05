import { globalStyle, style } from "@vanilla-extract/css"
import { themesSelectors } from "../../styles/atoms.css"
import { vars } from "../../styles/themes/contract.css"
import { colorPalette } from "../../styles/tokens/colors"

export const wrapperStyle = style({
  overflowX: `auto`,
  overflowY: `hidden`,
})

export const innerWrapperStyle = style({
  listStyleType: `none`,
  marginLeft: `calc(${vars.space[2]} * -1)`,
})

export const linkStyle = style({
  color: vars.color.text,
  selectors: {
    "&.active": {
      fontWeight: vars.fontWeight.semibold,
    },
    [themesSelectors.dark]: {
      color: colorPalette.gray[100],
    },
  },
})

globalStyle(`div[data-variant-name="fullBleed"] div[data-subnavigation="true"] .${linkStyle}`, {
  color: colorPalette.gray[100],
})
