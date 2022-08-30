import { createVar, globalStyle, style } from "@vanilla-extract/css"
import { themesSelectors } from "../styles/atoms.css"
import { pseudoSelectors } from "../styles/selectors"
import { vars } from "../styles/themes/contract.css"
import { darkThemeClass } from "../styles/themes/dark.css"
import { minMediaQuery } from "../styles/tokens/breakpoints"
import { colorPalette } from "../styles/tokens/colors"

export const wrapListStyle = style({
  display: `flex`,
  flexWrap: `wrap`,
})

export const tagStyle = style({
  background: colorPalette.blueGray[100],
  color: colorPalette.blueGray[800],
  minHeight: vars.space[8],
  minWidth: vars.space[8],
  fontSize: vars.fontSize.md,
  paddingLeft: vars.space[3],
  paddingRight: vars.space[3],
  fontWeight: vars.fontWeight.medium,
  outline: 0,
  borderRadius: vars.borderRadius.md,
  marginRight: vars.space[2],
  marginBottom: vars.space[2],
  display: `inline-flex`,
  verticalAlign: `top`,
  alignItems: `center`,
  maxWidth: `100%`,
  lineHeight: vars.lineHeight.shorter,
  selectors: {
    [pseudoSelectors.hover]: {
      cursor: `pointer`,
    },
    [pseudoSelectors.focus]: {
      boxShadow: vars.shadow.outline,
      outline: `none`,
    },
    [`&.active`]: {
      background: colorPalette.blue[100],
      color: colorPalette.blue[800],
    },
    [themesSelectors.dark]: {
      background: colorPalette.blueGray[800],
      color: colorPalette.blueGray[100],
    },
    [`html${darkThemeClass} &.active`]: {
      background: colorPalette.blue[800],
      color: colorPalette.blue[100],
    },
  },
})

export const tagCloseIconStyle = style({
  fontSize: vars.fontSize.lg,
  width: vars.space[5],
  height: vars.space[5],
  marginLeft: vars.space[2],
  opacity: 0.5,
  selectors: {
    [pseudoSelectors.hover]: {
      opacity: 0.8,
    },
    [`&.active`]: {
      opacity: 1,
    },
  },
})

const mis = `25px`
const smis = `35px`
const lgis = `50px`

export const iconWrapperStyle = style({
  width: mis,
  height: mis,
  "@media": {
    [minMediaQuery(`sm`)]: {
      width: smis,
      height: smis,
    },
    [minMediaQuery(`lg`)]: {
      width: lgis,
      height: lgis,
    },
  },
})

const transformVar = createVar()

export const gardenItemStyle = style({
  vars: {
    [transformVar]: `translate3d(6px, 0px, 0px)`,
  },
  display: `grid`,
  gridTemplateColumns: `${mis} 1fr 20px`,
  alignItems: `center`,
  gridGap: vars.space[6],
  borderRadius: vars.borderRadius.lg,
  "@media": {
    [minMediaQuery(`sm`)]: {
      gridTemplateColumns: `${smis} 1fr 20px`,
    },
    [minMediaQuery(`lg`)]: {
      gridTemplateColumns: `${lgis} 1fr 24px`,
    },
    "(prefers-reduced-motion: reduce)": {
      vars: {
        [transformVar]: `translate3d(0px, 0px, 0px) !important`,
      },
    },
  },
  selectors: {
    [pseudoSelectors.hover]: {
      textDecoration: `none`,
      backgroundColor: vars.color.bgHover,
    },
  },
})

globalStyle(`${gardenItemStyle} > span`, {
  transform: `translate3d(0px, 0px, 0px)`,
  transition: `transform .3s cubic-bezier(.73,.26,.42,1.24)`,
})

globalStyle(`${gardenItemStyle}:hover > span`, {
  transform: transformVar,
  transition: `transform .3s cubic-bezier(.73,.26,.42,1.24)`,
})

export const gardenItemWrapperStyle = style({
  marginLeft: `calc(${vars.space[2]} * -1)`,
  marginRight: `calc(${vars.space[2]} * -1)`,
  "@media": {
    [minMediaQuery(`lg`)]: {
      marginLeft: `calc(${vars.space[6]} * -1)`,
      marginRight: `calc(${vars.space[6]} * -1)`,
    },
  },
})
