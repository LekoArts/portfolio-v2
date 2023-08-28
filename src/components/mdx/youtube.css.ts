import { style, StyleRule, styleVariants } from "@vanilla-extract/css"
import { vars } from "../../styles/themes/contract.css"

export type AspectRatios = "1:1" | "16:9" | "4:3" | "3:2" | "8:5"

const youtubeWrapperBaseStyle = style({
  position: `relative`,
  width: vars.space.full,
})

const aspectRatios: Record<AspectRatios, StyleRule> = {
  "1:1": {
    paddingTop: vars.space.full,
  },
  "16:9": {
    paddingTop: `56.25%`,
  },
  "4:3": {
    paddingTop: `75%`,
  },
  "3:2": {
    paddingTop: `66.66%`,
  },
  "8:5": {
    paddingTop: `62.5%`,
  },
}

export const youtubeWrapperVariants = styleVariants(aspectRatios, (aspectRatio) => [
  youtubeWrapperBaseStyle,
  aspectRatio,
])

export const youtubeIframeStyle = style({
  position: `absolute`,
  top: vars.space[0],
  left: vars.space[0],
  width: vars.space.full,
  height: vars.space.full,
  borderRadius: vars.borderRadius.lg,
  boxShadow: vars.shadow.lg,
})
