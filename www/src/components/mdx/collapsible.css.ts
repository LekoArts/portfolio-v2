import { style } from "@vanilla-extract/css"
import { themesSelectors } from "../../styles/atoms.css"
import { colorPalette } from "../../styles/tokens/colors"
import { prominent } from "../../styles/typography.css"

export const detailsStyle = style({
  backgroundColor: colorPalette.blue[50],
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
