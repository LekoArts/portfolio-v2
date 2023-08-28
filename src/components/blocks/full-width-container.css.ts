import { style, StyleRule, styleVariants } from "@vanilla-extract/css"
import { themesSelectors } from "../../styles/atoms.css"
import { vars } from "../../styles/themes/contract.css"
import { colorPalette } from "../../styles/tokens/colors"
import { zIndices } from "../../styles/tokens/z-indices"
import { ContainerVariants } from "../primitives/container.css"

export type FullWidthContainerVariants = Exclude<ContainerVariants, "proseRoot">

const tlg = (bottomColor: string, topColor: string) => `linear-gradient(to top, ${bottomColor} 0%, ${topColor} 100%)`

const fwcBaseStyle = style({
  width: vars.space.full,
  margin: vars.space[0],
})

const fullWidthContainers: Record<FullWidthContainerVariants, StyleRule> = {
  default: {
    background: vars.color.bg,
  },
  hero: {
    background: vars.color.bg,
    selectors: {
      [themesSelectors.dark]: {
        background: tlg(colorPalette.blueGray[950], vars.color.bg),
      },
    },
  },
  light: {
    background: colorPalette.blueGray[50],
    selectors: {
      [themesSelectors.dark]: {
        background: tlg(vars.color.bg, colorPalette.blueGray[800]),
      },
    },
  },
  dark: {
    background: colorPalette.blueGray[700],
    selectors: {
      [themesSelectors.dark]: {
        background: tlg(colorPalette.blueGray[900], colorPalette.blueGray[950]),
      },
    },
  },
  navigation: {
    background: vars.color.navigationBg,
    backdropFilter: `blur(8px)`,
    position: `fixed`,
    display: `flex`,
    zIndex: zIndices.sticky,
  },
  fullBleed: {
    background: `transparent`,
    color: `white`,
    display: `flex`,
    zIndex: zIndices.sticky,
  },
}

export const fullWidthContainerVariants = styleVariants(fullWidthContainers, (fwc) => [fwcBaseStyle, fwc])
