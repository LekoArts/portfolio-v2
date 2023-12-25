import { globalStyle, style, StyleRule, styleVariants } from "@vanilla-extract/css"
import { headingFontFamilyClass } from "./fonts.css"
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
  color: vars.color.proseLink,
})

globalStyle(`${prominent} a`, {
  fontWeight: vars.fontWeight.medium,
  color: vars.color.proseLink,
})

const headingBaseStyle = style({
  fontWeight: vars.fontWeight.bold,
  color: vars.color.heading,
  // @ts-expect-error - This is a valid CSS property
  textWrap: `balance`,
})

export type Headings = "h1" | "h2" | "h3" | "h4"

const headings: Record<Headings, StyleRule> = {
  h1: {
    fontWeight: vars.fontWeight.bold,
    letterSpacing: vars.letterSpacing.wide,
    lineHeight: vars.lineHeight[`4xl`],
    marginTop: vars.space[0],
    marginBottom: vars.space[4],
    fontSize: vars.fontSize[`2xl`],
    "@media": {
      [minMediaQuery(`sm`)]: {
        fontSize: vars.fontSize[`3xl`],
      },
      [minMediaQuery(`lg`)]: {
        fontSize: vars.fontSize[`4xl`],
      },
      [minMediaQuery(`xl`)]: {
        fontSize: vars.fontSize[`5xl`],
      },
    },
  },
  h2: {
    fontWeight: vars.fontWeight.bold,
    lineHeight: vars.lineHeight[`3xl`],
    marginBottom: vars.space[6],
    fontSize: vars.fontSize.xl,
    "@media": {
      [minMediaQuery(`sm`)]: {
        fontSize: vars.fontSize[`2xl`],
      },
      [minMediaQuery(`lg`)]: {
        fontSize: vars.fontSize[`3xl`],
      },
      [minMediaQuery(`xl`)]: {
        fontSize: vars.fontSize[`4xl`],
      },
    },
  },
  h3: {
    fontWeight: vars.fontWeight.semibold,
    lineHeight: vars.lineHeight[`2xl`],
    marginBottom: vars.space[3],
    fontSize: vars.fontSize.lg,
    "@media": {
      [minMediaQuery(`sm`)]: {
        fontSize: vars.fontSize.xl,
      },
      [minMediaQuery(`lg`)]: {
        fontSize: vars.fontSize[`2xl`],
      },
      [minMediaQuery(`xl`)]: {
        fontSize: vars.fontSize[`3xl`],
      },
    },
  },
  h4: {
    fontWeight: vars.fontWeight.semibold,
    lineHeight: vars.lineHeight.xl,
    marginBottom: vars.space[2],
    fontSize: vars.fontSize.lg,
    "@media": {
      [minMediaQuery(`lg`)]: {
        fontSize: vars.fontSize.xl,
      },
      [minMediaQuery(`xl`)]: {
        fontSize: vars.fontSize[`2xl`],
      },
    },
  },
}

export const headingVariants = styleVariants(headings, (heading) => [headingBaseStyle, headingFontFamilyClass, heading])
