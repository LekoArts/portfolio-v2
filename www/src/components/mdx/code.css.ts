import { createVar, globalStyle, style, StyleRule } from "@vanilla-extract/css"
import { themesSelectors } from "../../styles/atoms.css"
import { vars } from "../../styles/themes/contract.css"
import { darkThemeClass } from "../../styles/themes/dark.css"
import { minMediaQuery } from "../../styles/tokens/breakpoints"
import { colorPalette } from "../../styles/tokens/colors"
import { em, rem } from "../../utils/css"
import { themeAwareStyles } from "../../utils/vanilla-extract"

export const codeBlockWrapper = style({})

export const gatsbyHighlightHeaderStyle = style({
  fontSize: em(12, 14),
  marginTop: em(20, 12),
  borderTopLeftRadius: rem(6),
  borderTopRightRadius: rem(6),
  color: `rgb(64, 63, 83)`,
  background: `linear-gradient(to bottom, rgb(253, 253, 253) 0%, rgb(243, 243, 243) 100%)`,
  borderBottom: `1px solid rgba(107, 111, 117, 0.15)`,
  paddingTop: em(6, 14),
  paddingBottom: em(6, 14),
  paddingRight: em(12, 12),
  paddingLeft: em(12, 12),
  selectors: {
    [themesSelectors.dark]: {
      color: `rgb(214, 222, 235)`,
      background: `linear-gradient(to bottom, rgb(2, 38, 67) 0%, rgb(1, 22, 39) 100%)`,
      borderBottom: `1px solid rgba(214, 222, 235, 0.15)`,
    },
  },
  "@media": {
    [minMediaQuery(`sm`)]: {
      fontSize: em(14, 16),
      marginTop: em(24, 14),
      paddingLeft: em(16, 14),
      paddingRight: em(16, 14),
    },
    [minMediaQuery(`lg`)]: {
      fontSize: em(14, 18),
      marginTop: em(32, 16),
      paddingRight: em(24, 14),
      paddingLeft: em(24, 14),
      marginLeft: `-${em(24, 14)}`,
      marginRight: `-${em(24, 14)}`,
    },
    [minMediaQuery(`xl`)]: {
      fontSize: em(15, 20),
      marginTop: em(36, 18),
      paddingRight: em(24, 15),
      paddingLeft: em(24, 15),
      marginLeft: `-${em(24, 15)}`,
      marginRight: `-${em(24, 15)}`,
    },
  },
})

const displayOpacityVar = createVar()

const badgeStyles = {
  "&[data-lang='js']": {
    background: `rgba(247, 223, 30, ${displayOpacityVar})`,
    color: { light: `black`, dark: `rgb(247, 223, 30)` },
  },
  "&[data-lang='jsx']": {
    background: `rgba(97, 218, 251, ${displayOpacityVar})`,
    color: { light: `${colorPalette.blueGray[800]}`, dark: `rgb(127, 222, 253)` },
  },
  "&[data-lang='ts']": {
    background: `rgba(97, 218, 251, ${displayOpacityVar})`,
    color: { light: `${colorPalette.blueGray[800]}`, dark: `rgb(127, 222, 253)` },
  },
  "&[data-lang='tsx']": {
    background: `rgba(97, 218, 251, ${displayOpacityVar})`,
    color: { light: `${colorPalette.blueGray[800]}`, dark: `rgb(127, 222, 253)` },
  },
  "&[data-lang='html']": {
    background: `rgba(0, 90, 156, ${displayOpacityVar})`,
    color: { light: `white`, dark: `rgb(114, 192, 253)` },
  },
  "&[data-lang='xml']": {
    background: `rgba(0, 90, 156, ${displayOpacityVar})`,
    color: { light: `white`, dark: `rgb(114, 192, 253)` },
  },
  "&[data-lang='svg']": {
    background: `rgba(0, 90, 156, ${displayOpacityVar})`,
    color: { light: `white`, dark: `rgb(114, 192, 253)` },
  },
  "&[data-lang='graphql']": {
    background: `rgba(225, 0, 152, ${displayOpacityVar})`,
    color: { light: `white`, dark: `rgb(255, 82, 181)` },
  },
  "&[data-lang='css']": {
    background: `rgba(255, 152, 0, ${displayOpacityVar})`,
    color: { light: `white`, dark: `rgb(255, 165, 48)` },
  },
  "&[data-lang='mdx']": {
    background: `rgba(249, 172, 0, ${displayOpacityVar})`,
    color: { light: `white`, dark: `rgb(255, 165, 48)` },
  },
  "&[data-lang='py']": {
    background: `rgba(51, 111, 160, ${displayOpacityVar})`,
    color: `rgb(255, 229, 194)`,
  },
  "&[data-lang='text']": {
    background: { light: `white`, dark: `rgba(255, 255, 255, ${displayOpacityVar})` },
  },
  "&[data-lang='sh']": {
    background: { light: `white`, dark: `rgba(255, 255, 255, ${displayOpacityVar})` },
  },
  "&[data-lang='yaml']": {
    background: `rgba(255, 168, 223, ${displayOpacityVar})`,
    color: { light: `${colorPalette.blueGray[800]}`, dark: `rgb(255, 168, 223)` },
  },
  "&[data-lang='md']": {
    background: { light: `white`, dark: `rgba(255, 255, 255, ${displayOpacityVar})` },
  },
  "&[data-lang='json']": {
    background: `rgba(250, 240, 230, ${displayOpacityVar})`,
    color: { light: `${colorPalette.blueGray[800]}`, dark: `rgb(250, 240, 230)` },
  },
  "&[data-lang='diff']": {
    background: `rgba(230, 255, 237, ${displayOpacityVar})`,
    color: { light: `${colorPalette.blueGray[800]}`, dark: `rgb(230, 255, 237)` },
  },
  "&[data-lang='svelte']": {
    background: { light: `rgb(255, 62, 0)`, dark: `rgba(255, 62, 0, ${displayOpacityVar})` },
    color: { light: `white`, dark: `rgb(255, 221, 211)` },
  },
}

export const languageDisplayStyle = style({
  borderRadius: rem(6),
  paddingRight: em(6, 14),
  paddingLeft: em(6, 14),
  vars: {
    [displayOpacityVar]: `0.75`,
  },
  selectors: {
    [themesSelectors.dark]: {
      vars: {
        [displayOpacityVar]: `0.25`,
      },
    },
    ...themeAwareStyles({ selectorMap: badgeStyles, defaultTheme: `light`, darkThemeClass }),
  },
})

export const gatsbyHighlightStyle = style({})

export const gatsbyHighlightPreStyle = style({
  marginTop: `${vars.space[0]} !important`,
  borderTopLeftRadius: `${vars.borderRadius.none} !important`,
  borderTopRightRadius: `${vars.borderRadius.none} !important`,
  wordSpacing: `normal`,
  wordBreak: `normal`,
  overflowWrap: `normal`,
  tabSize: 4,
  minWidth: vars.space.full,
  maxHeight: `80vh`,
  hyphens: `none`,
})

export const codeStyle = style({
  wordSpacing: `normal`,
  wordBreak: `normal`,
  overflowWrap: `normal`,
  tabSize: 4,
  hyphens: `none`,
  float: `left`,
  minWidth: vars.space.full,
})

export const lineNumberStyle = style({
  display: `inline-block`,
  width: `2em`,
  userSelect: `none`,
  opacity: 0.3,
  textAlign: `left`,
  position: `relative`,
})

export const tokenLineStyle = style({
  paddingLeft: em(12, 12),
  paddingRight: em(12, 12),
  marginLeft: `-${em(12, 12)}`,
  marginRight: `-${em(12, 12)}`,
  "@media": {
    [minMediaQuery(`sm`)]: {
      paddingLeft: em(16, 14),
      paddingRight: em(16, 14),
      marginLeft: `-${em(16, 14)}`,
      marginRight: `-${em(16, 14)}`,
    },
    [minMediaQuery(`lg`)]: {
      paddingLeft: em(24, 16),
      paddingRight: em(24, 16),
      marginLeft: `-${em(24, 16)}`,
      marginRight: `-${em(24, 16)}`,
    },
    [minMediaQuery(`xl`)]: {
      paddingLeft: em(24, 18),
      paddingRight: em(24, 18),
      marginLeft: `-${em(24, 18)}`,
      marginRight: `-${em(24, 18)}`,
    },
  },
})

export const highlightLineStyle = style({
  background: `linear-gradient(90deg, rgb(140, 175, 255) 0% .5%, rgb(243, 242, 248) .5% 100%)`,
  selectors: {
    [themesSelectors.dark]: {
      background: `linear-gradient(90deg, rgb(11, 142, 215) 0% .5%, rgb(3, 46, 67) .5% 100%)`,
    },
  },
})

globalStyle(`${highlightLineStyle} ${lineNumberStyle}`, {
  opacity: 0.5,
})

globalStyle(`${gatsbyHighlightStyle} .token-line .function`, {
  fontStyle: `normal !important`, // The light-theme syntax made those italic
})

globalStyle(`${gatsbyHighlightStyle} .token`, {
  display: `inline-block`,
})
