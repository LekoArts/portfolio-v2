import { globalStyle, style } from "@vanilla-extract/css"
import { vars } from "./themes/contract.css"
import { minMediaQuery } from "./tokens/breakpoints"

export const prominent = style({
  fontSize: vars.fontSize.md,
  "@media": {
    [minMediaQuery(`lg`)]: {
      fontSize: vars.fontSize.lg,
    },
    [minMediaQuery(`xl`)]: {
      fontSize: vars.fontSize.lgx,
    },
  },
})

globalStyle(`${prominent} strong`, {
  fontWeight: vars.fontWeight.medium,
})

globalStyle(`${prominent} a`, {
  fontWeight: vars.fontWeight.medium,
})

/*
const headingBaseStyles = {
  h1: {
    fontWeight: 700,
    fontSize: [`2xl`, `3xl`, null, `4xl`, `5xl`],
    letterSpacing: `wide`,
    fontFamily: `heading`,
    lineHeight: `4xl`,
    marginTop: 0,
    marginBottom: 4,
  },
  h2: {
    fontWeight: 700,
    fontSize: [`xl`, `2xl`, null, `3xl`, `4xl`],
    fontFamily: `heading`,
    lineHeight: `3xl`,
    marginBottom: 6,
  },
  h3: {
    fontWeight: 600,
    fontSize: [`lg`, `xl`, null, `2xl`, `3xl`],
    fontFamily: `heading`,
    lineHeight: `2xl`,
    marginBottom: 3,
  },
  h4: {
    fontWeight: 600,
    fontSize: [`lg`, null, null, `xl`, `2xl`],
    fontFamily: `heading`,
    lineHeight: `xl`,
    marginBottom: 2,
  },
}
*/
