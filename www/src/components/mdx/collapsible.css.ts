import { style } from "@vanilla-extract/css"
import { themesSelectors } from "../../styles/atoms.css"
import { vars } from "../../styles/themes/contract.css"
import { minMediaQuery } from "../../styles/tokens/breakpoints"
import { colorPalette } from "../../styles/tokens/colors"
import { prominent } from "../../styles/typography.css"

export const detailsStyle = style({
  backgroundColor: colorPalette.blue[50],
  paddingLeft: vars.space[4],
  paddingRight: vars.space[4],
  "@media": {
    [minMediaQuery(`md`)]: {
      paddingLeft: vars.space[6],
      paddingRight: vars.space[6],
    },
  },
  selectors: {
    [themesSelectors.dark]: {
      backgroundColor: colorPalette.blueGray[800],
    },
  },
})

export const summaryStyle = style([
  prominent,
  {
    display: `list-item`,
    cursor: `pointer`,
  },
])
