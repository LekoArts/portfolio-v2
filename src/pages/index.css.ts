import { globalStyle, style } from "@vanilla-extract/css"
import { pseudoSelectors } from "../styles/selectors"
import { vars } from "../styles/themes/contract.css"
import { minMediaQuery } from "../styles/tokens/breakpoints"

/*
  const secondaryRepoBg = useColorModeValue(`blueGray.100`, `blueGray.800`)
*/

export const cardsGridStyle = style({
  display: `grid`,
  gridTemplateColumns: `repeat(1, 1fr)`,
  gap: vars.space[4],
  "@media": {
    [minMediaQuery(`md`)]: {
      gridTemplateColumns: `repeat(3, 1fr)`,
      gap: vars.space[8],
    },
  },
})

export const artGridStyle = style([
  cardsGridStyle,
  {
    "@media": {
      [minMediaQuery(`md`)]: {
        gridTemplateColumns: `repeat(2, 1fr)`,
      },
    },
  },
])

export const cardLinkStyle = style({
  selectors: {
    [pseudoSelectors.hover]: {
      textDecoration: `none`,
      boxShadow: `none`,
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      selectors: {
        [pseudoSelectors.hover]: {
          boxShadow: vars.shadow.outline,
        },
      },
    },
  },
})

const colorfulCardStyle = style({
  color: `white`,
  textShadow: `0 1px 2px rgba(0, 0, 0, 0.5)`,
  boxShadow: vars.shadow.lg,
  // @ts-expect-error - This is a valid CSS property
  textWrap: `balance`,
})

export const postBoxStyle = style([
  colorfulCardStyle,
  {
    height: `150px`,
    "@media": {
      [minMediaQuery(`lg`)]: {
        height: `200px`,
      },
      [minMediaQuery(`xl`)]: {
        height: `250px`,
      },
    },
  },
])

export const gardenBoxStyle = style([
  colorfulCardStyle,
  {
    height: `125px`,
    "@media": {
      [minMediaQuery(`lg`)]: {
        height: `175px`,
      },
    },
  },
])

export const staticImageOverride = style({
  boxShadow: vars.shadow.lg,
  height: vars.space.full,
  width: vars.space.full,
  borderRadius: vars.borderRadius.lg,
})

globalStyle(`${staticImageOverride} img`, {
  borderRadius: vars.borderRadius.lg,
})

globalStyle(`${staticImageOverride} .gatsby-image-wrapper`, {
  borderRadius: vars.borderRadius.lg,
  verticalAlign: `top`,
})

export const repositoriesGridStyle = style({
  display: `grid`,
  gridTemplateColumns: `1fr`,
  "@media": {
    [minMediaQuery(`lg`)]: {
      gridTemplateColumns: `2fr 1fr`,
    },
  },
})
