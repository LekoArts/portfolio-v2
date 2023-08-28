import { style, StyleRule, styleVariants } from "@vanilla-extract/css"
import { getColor, transparentizeDict } from "../../utils/color"
import { themesSelectors } from "../../styles/atoms.css"
import { vars } from "../../styles/themes/contract.css"
import { colorPalette } from "../../styles/tokens/colors"

const tagBaseStyle = style({
  fontWeight: vars.fontWeight.medium,
  lineHeight: vars.lineHeight.shorter,
  outline: `0`,
  borderRadius: vars.borderRadius.md,
  display: `inline-flex`,
  verticalAlign: `top`,
  alignItems: `center`,
  maxWidth: vars.space.full,
  minHeight: vars.space[6],
  minWidth: vars.space[6],
  fontSize: vars.fontSize.sm,
  paddingLeft: vars.space[2],
  paddingRight: vars.space[2],
})

export const tagLabelBaseStyle = style({
  lineHeight: vars.lineHeight.shorter,
  overflow: `visible`,
})

export type TagsColorSchemes = "green" | "blue" | "purple" | "yellow" | "teal" | "gray"

const getColors = (c: TagsColorSchemes): StyleRule => ({
  color: getColor(colorPalette, `${c}.800`),
  background: getColor(colorPalette, `${c}.100`),
  selectors: {
    [themesSelectors.dark]: {
      color: getColor(colorPalette, `${c}.200`),
      background: transparentizeDict(`${c}.200`, 0.16)(colorPalette),
    },
  },
})

const tags: Record<TagsColorSchemes, StyleRule> = {
  green: getColors(`green`),
  blue: getColors(`blue`),
  purple: getColors(`purple`),
  yellow: getColors(`yellow`),
  teal: getColors(`teal`),
  gray: getColors(`gray`),
}

export const tagVariants = styleVariants(tags, (tag) => [tagBaseStyle, tag])

export const tagIconStyle = style({
  width: `1.2em`,
  height: `1.2em`,
  display: `inline-block`,
  lineHeight: `1.2em`,
  flexShrink: 0,
  verticalAlign: `top`,
  marginRight: vars.space[2],
})
