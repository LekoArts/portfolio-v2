import { createVar, globalStyle, style, StyleRule, styleVariants } from "@vanilla-extract/css"
import { transparentize } from "utils"
import { themesSelectors } from "../../styles/atoms.css"
import { vars } from "../../styles/themes/contract.css"
import { minMediaQuery } from "../../styles/tokens/breakpoints"
import { colorPalette } from "../../styles/tokens/colors"
import { em } from "../../utils/css"
import { codeBlockWrapper, gatsbyHighlightHeaderStyle } from "./code.css"

export type AlertStatus = "info" | "warning" | "error" | "success"

const bgVar = createVar()
const colorVar = createVar()
const linkDecorationVar = createVar()

const alertBaseStyle = style({
  vars: {
    [bgVar]: vars.color.bg,
    [colorVar]: vars.color.text,
    [linkDecorationVar]: colorPalette.gray[300],
  },
  marginRight: vars.space[0],
  marginLeft: vars.space[0],
  background: bgVar,
  overflow: `hidden`,
  "@media": {
    [minMediaQuery(`lg`)]: {
      marginRight: `calc(${vars.space[4]} * -1)`,
      marginLeft: `calc(${vars.space[4]} * -1)`,
    },
  },
})

export const alertTitleStyle = style({
  lineHeight: vars.lineHeight.md,
  color: vars.color.heading,
})

export const alertIconStyle = style({
  width: `20px`,
  height: `20px`,
  marginRight: vars.space[3],
  display: `inherit`,
  flexShrink: 0,
  lineHeight: vars.lineHeight.md,
  color: colorVar,
  "@media": {
    [minMediaQuery(`md`)]: {
      width: `25px`,
      height: `25px`,
    },
    [minMediaQuery(`lg`)]: {
      width: `35px`,
      height: `35px`,
    },
  },
})

const colorMap = {
  info: `blue`,
  warning: `orange`,
  success: `green`,
  error: `red`,
} as const

const darkBgOpacity = 0.2
const darkBg = 200
const darkColor = 300
const bg = 100
const color = 500

globalStyle(`${alertBaseStyle} a`, {
  textDecorationColor: linkDecorationVar,
})

globalStyle(`${alertBaseStyle} p`, {
  marginBottom: em(20, 16),
  marginTop: vars.space[0],
  "@media": {
    [minMediaQuery(`lg`)]: {
      marginBottom: em(24, 18),
      marginTop: vars.space[0],
    },
    [minMediaQuery(`xl`)]: {
      marginBottom: em(24, 20),
      marginTop: vars.space[0],
    },
  },
})

globalStyle(`${alertBaseStyle} p:first-of-type`, {
  marginTop: vars.space[0],
})

globalStyle(`${alertBaseStyle} p:last-of-type`, {
  marginTop: vars.space[0],
  marginBottom: vars.space[0],
})

globalStyle(`${alertBaseStyle} .${codeBlockWrapper}`, {
  width: `100%`,
})

globalStyle(`${alertBaseStyle} .${codeBlockWrapper} pre`, {
  marginLeft: vars.space[0],
  marginRight: vars.space[0],
})

globalStyle(`${alertBaseStyle} .${codeBlockWrapper} .${gatsbyHighlightHeaderStyle}`, {
  marginLeft: vars.space[0],
  marginRight: vars.space[0],
})

const alerts: Record<AlertStatus, StyleRule> = {
  info: {
    vars: {
      [bgVar]: colorPalette[colorMap.info][bg],
      [colorVar]: colorPalette[colorMap.info][color],
      [linkDecorationVar]: colorPalette[colorMap.info][300],
    },
    selectors: {
      [themesSelectors.dark]: {
        vars: {
          [bgVar]: transparentize(colorPalette[colorMap.info][darkBg], darkBgOpacity),
          [colorVar]: colorPalette[colorMap.info][darkColor],
          [linkDecorationVar]: colorPalette[colorMap.info][500],
        },
      },
    },
  },
  warning: {
    vars: {
      [bgVar]: colorPalette[colorMap.warning][bg],
      [colorVar]: colorPalette[colorMap.warning][color],
      [linkDecorationVar]: colorPalette[colorMap.warning][300],
    },
    selectors: {
      [themesSelectors.dark]: {
        vars: {
          [bgVar]: transparentize(colorPalette[colorMap.warning][darkBg], darkBgOpacity),
          [colorVar]: colorPalette[colorMap.warning][darkColor],
          [linkDecorationVar]: colorPalette[colorMap.warning][400],
        },
      },
    },
  },
  success: {
    vars: {
      [bgVar]: colorPalette[colorMap.success][bg],
      [colorVar]: colorPalette[colorMap.success][color],
      [linkDecorationVar]: colorPalette[colorMap.success][400],
    },
    selectors: {
      [themesSelectors.dark]: {
        vars: {
          [bgVar]: transparentize(colorPalette[colorMap.success][darkBg], darkBgOpacity),
          [colorVar]: colorPalette[colorMap.success][darkColor],
          [linkDecorationVar]: colorPalette[colorMap.success][500],
        },
      },
    },
  },
  error: {
    vars: {
      [bgVar]: colorPalette[colorMap.error][bg],
      [colorVar]: colorPalette[colorMap.error][color],
      [linkDecorationVar]: colorPalette[colorMap.error][300],
    },
    selectors: {
      [themesSelectors.dark]: {
        vars: {
          [bgVar]: transparentize(colorPalette[colorMap.error][darkBg], darkBgOpacity),
          [colorVar]: colorPalette[colorMap.error][darkColor],
          [linkDecorationVar]: colorPalette[colorMap.error][500],
        },
      },
    },
  },
}

export const alertVariants = styleVariants(alerts, (alert) => [alertBaseStyle, alert])
