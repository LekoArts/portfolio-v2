import { style, StyleRule, globalStyle, createVar, styleVariants } from "@vanilla-extract/css"
import { themesSelectors } from "../../styles/atoms.css"
import { pseudoSelectors } from "../../styles/selectors"
import { vars } from "../../styles/themes/contract.css"
import { minMediaQuery } from "../../styles/tokens/breakpoints"
import { colorPalette } from "../../styles/tokens/colors"
import { transition } from "../../styles/tokens/motion"

const buttonBaseStyle = style({
  display: `inline-flex`,
  appearance: `none`,
  alignItems: `center`,
  justifyContent: `center`,
  userSelect: `none`,
  position: `relative`,
  whiteSpace: `nowrap`,
  verticalAlign: `middle`,
  outline: `none`,
  lineHeight: vars.lineHeight.shorter,
  borderRadius: vars.borderRadius.md,
  fontWeight: vars.fontWeight.normal,
  transitionProperty: transition.property.common,
  transitionDuration: transition.duration.normal,
  selectors: {
    [pseudoSelectors.focusVisible]: {
      boxShadow: vars.shadow.outline,
    },
    [pseudoSelectors.disabled]: {
      opacity: 0.4,
      cursor: `not-allowed`,
      boxShadow: `none`,
    },
  },
})

export type VariantNames = "primary" | "link" | "outline" | "ghost"

const buttons: Record<VariantNames, StyleRule> = {
  primary: {
    background: vars.color.primary,
    color: `white`,
    selectors: {
      [pseudoSelectors.hover]: {
        background: vars.color.primaryHover,
      },
      [pseudoSelectors.active]: {
        background: vars.color.primaryHover,
      },
    },
  },
  link: {
    padding: `0 !important`,
    height: vars.space.auto,
    lineHeight: vars.lineHeight.base,
    verticalAlign: `baseline`,
    color: colorPalette.gray[500],
    selectors: {
      [pseudoSelectors.hover]: {
        textDecoration: `underline`,
      },
      [pseudoSelectors.active]: {
        color: colorPalette.gray[700],
      },
      [themesSelectors.dark]: {
        color: colorPalette.gray[200],
      },
    },
  },
  outline: {
    color: vars.color.heading,
    background: `transparent`,
    borderStyle: `solid`,
    borderColor: vars.color.primary,
    borderWidth: `1px`,
    selectors: {
      [pseudoSelectors.hover]: {
        color: `white`,
        background: vars.color.primary,
      },
    },
  },
  ghost: {
    color: `inherit`,
    background: `transparent`,
    selectors: {
      [pseudoSelectors.hover]: {
        background: vars.color.ghostBg,
      },
      [pseudoSelectors.active]: {
        background: vars.color.ghostBg,
      },
    },
  },
}

export const buttonVariants = styleVariants(buttons, (btn) => [buttonBaseStyle, btn])

export type Sizes = "xs" | "sm" | "md" | "lg" | "brand"

const sizes: Record<Sizes, StyleRule> = {
  xs: {
    height: vars.space[6],
    minWidth: vars.space[6],
    fontSize: vars.fontSize.xs,
    paddingLeft: vars.space[2],
    paddingRight: vars.space[2],
  },
  sm: {
    height: vars.space[8],
    minWidth: vars.space[8],
    fontSize: vars.fontSize.sm,
    paddingLeft: vars.space[3],
    paddingRight: vars.space[3],
  },
  md: {
    height: vars.space[10],
    minWidth: vars.space[10],
    fontSize: vars.fontSize.md,
    paddingLeft: vars.space[4],
    paddingRight: vars.space[4],
  },
  lg: {
    height: vars.space[12],
    minWidth: vars.space[12],
    fontSize: vars.fontSize.lg,
    paddingLeft: vars.space[6],
    paddingRight: vars.space[6],
  },
  brand: {
    height: vars.space[8],
    minWidth: vars.space[10],
    fontSize: vars.fontSize.md,
    paddingLeft: vars.space[4],
    paddingRight: vars.space[4],
  },
}

export const sizesVariants = styleVariants(sizes, (size) => [size])

const transformVar = createVar()

export const arrowAnimationStyle = style({
  vars: {
    [transformVar]: `translate3d(6px, 0px, 0px)`,
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      vars: {
        [transformVar]: `translate3d(0px, 0px, 0px) !important`,
      },
    },
  },
})

globalStyle(`${arrowAnimationStyle} > span`, {
  transform: `translate3d(0px, 0px, 0px)`,
  transition: `transform .3s cubic-bezier(.73,.26,.42,1.24)`,
})

globalStyle(`${arrowAnimationStyle} svg`, {
  height: `1.5em`,
  width: `1.5em`,
})

globalStyle(`${arrowAnimationStyle}:hover > span`, {
  transform: transformVar,
  transition: `transform .3s cubic-bezier(.73,.26,.42,1.24)`,
})

export const subtleButtonStyle = style({
  letterSpacing: vars.letterSpacing.wider,
  textTransform: `uppercase`,
  fontWeight: vars.fontWeight.medium,
  fontSize: vars.fontSize.xs,
  "@media": {
    [minMediaQuery(`sm`)]: {
      fontSize: vars.fontSize.sm,
    },
  },
})

export const iconButtonStyle = style({
  display: `inline-flex`,
  alignSelf: `center`,
  flexShrink: 0,
  marginLeft: vars.space[2],
})
