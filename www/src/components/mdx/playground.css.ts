import { style } from "@vanilla-extract/css"
import { nightOwl } from "../../styles/prism/nightOwl"
import { vars } from "../../styles/themes/contract.css"
import { minMediaQuery } from "../../styles/tokens/breakpoints"

export const spWrapper = style({})

export const spEditor = style({})

export const spTabs = style({})

export const spTabButton = style({})

export const spCodeEditor = style({})

export const spPreview = style({
  backgroundColor: `red`,
})

export const spPreviewContainer = style({
  borderRadius: vars.borderRadius.md,
})

export const spPreviewIframe = style({})

export const rootWrapper = style({
  overflow: `hidden`,
})

export const header = style({
  color: `rgb(214, 222, 235)`,
  background: `linear-gradient(to bottom, rgb(14 61 100) 0%, rgb(6 41 69) 100%)`,
  borderBottom: `1px solid rgba(214, 222, 235, 0.15)`,
  boxShadow: `inset 0 1px 0px 0px rgba(255, 255, 255, 0.05), inset 0 -1px 0px 0px rgba(0, 0, 0, 0.05)`,
  fontSize: vars.fontSize.sm,
  paddingLeft: vars.space[4],
  paddingRight: vars.space[4],
  paddingTop: vars.space[2],
  paddingBottom: vars.space[2],
})

export const middleWrapper = style({
  borderTop: `1px solid rgba(214, 222, 235, 0.15)`,
  paddingLeft: vars.space[4],
  paddingRight: vars.space[4],
  paddingTop: vars.space[2],
  paddingBottom: vars.space[2],
  backgroundColor: nightOwl.plain.backgroundColor,
})

export const previewWrapper = style({
  borderTop: `1px solid rgba(214, 222, 235, 0.15)`,
  overflow: `hidden`,
  height: `100%`,
  padding: vars.space[4],
  backgroundColor: nightOwl.plain.backgroundColor,
})

/*
export const header = style([
  gatsbyHighlightHeaderStyle,
  {
    color: `rgb(214, 222, 235)`,
    background: `linear-gradient(to bottom, rgb(14 61 100) 0%, rgb(6 41 69) 100%)`,
    selectors: {
      [themesSelectors.dark]: {},
    },
    "@media": {
      [minMediaQuery(`sm`)]: {
        fontSize: em(14, 16),
        marginTop: em(24, 14),
        paddingLeft: em(16, 14),
        paddingRight: em(16, 14),
      },
      [minMediaQuery(`lg`)]: {
        marginLeft: 0,
        marginRight: 0,
      },
      [minMediaQuery(`xl`)]: {
        marginLeft: 0,
        marginRight: 0,
      },
    },
  },
])
*/
