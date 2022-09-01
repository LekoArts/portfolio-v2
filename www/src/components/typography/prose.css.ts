import { globalStyle, style } from "@vanilla-extract/css"
import { vars } from "../../styles/themes/contract.css"
import { darkThemeClass } from "../../styles/themes/dark.css"
import { minMediaQuery, breakpointNames } from "../../styles/tokens/breakpoints"
import { themeAwareStyles, responsiveStyles } from "../../utils/vanilla-extract"
import {
  proseRootLg,
  proseRootMd,
  proseRootMobile,
  proseRootXl,
  proseBaseStyle,
  proseSmVariant,
  proseMdVariant,
  proseLgVariant,
  proseXlVariant,
} from "./tailwind-typography.css"

// The ORDER of responsive array variants should be:
// [`sm`, `md`, null, `lg`, `xl`]

const proseRootBaseStyle = style({
  color: vars.color.textProse,
})

export const proseRootStyle = style([
  proseRootBaseStyle,
  proseRootMobile,
  {
    "@media": {
      [minMediaQuery(`sm`)]: proseRootMd,
      [minMediaQuery(`lg`)]: proseRootLg,
      [minMediaQuery(`xl`)]: proseRootXl,
    },
  },
])

globalStyle(`${proseRootStyle} .gatsby-resp-image-wrapper`, {
  boxShadow: vars.shadow.lg,
  borderRadius: vars.borderRadius.lg,
})

globalStyle(`${proseRootStyle} .gatsby-resp-image-background-image`, {
  borderRadius: vars.borderRadius.lg,
})

globalStyle(`${proseRootStyle} .img-left-wrap-text`, {
  display: `grid`,
  gridTemplateColumns: `1fr`,
  gridGap: vars.space[4],
  "@media": {
    [minMediaQuery(`sm`)]: {
      gridTemplateColumns: `1fr 2fr`,
      gridGap: vars.space[6],
    },
    [minMediaQuery(`md`)]: {
      gridTemplateColumns: `1fr 1.75fr`,
      gridGap: vars.space[12],
    },
  },
})

const preparedBaseStyles = themeAwareStyles({
  selectorMap: proseBaseStyle,
  defaultTheme: `light`,
  darkThemeClass,
  rootClass: proseRootStyle,
})

Object.entries(preparedBaseStyles).forEach(([selector, selectorStyle]) => {
  globalStyle(selector, selectorStyle)
})

// const proseResponsiveArray = [`sm`, `md`, null, `lg`, `xl`]
const proseResponsiveStyles = responsiveStyles([
  proseSmVariant,
  proseMdVariant,
  proseMdVariant,
  proseLgVariant,
  proseXlVariant,
])

const [_, ...bpn] = breakpointNames

Object.entries(proseResponsiveStyles).forEach(([selector, selectorResponsiveArray]) => {
  const [mobileStyle, ...rest] = selectorResponsiveArray
  const mediaQueries = {}

  rest.forEach((s, index) => {
    if (s) {
      mediaQueries[minMediaQuery(bpn[index])] = s
    }
  })
  globalStyle(`${proseRootStyle} ${selector}`, {
    ...mobileStyle,
    "@media": mediaQueries,
  })
})
