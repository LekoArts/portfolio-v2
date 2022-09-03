import { globalStyle, style, styleVariants } from "@vanilla-extract/css"

export const groupStyle = style({
  boxSizing: `content-box`,
})

export const videoStyle = style({
  maxWidth: `100%`,
  cursor: `pointer`,
})

export const playPauseButtonStyle = style({
  opacity: 0,
  inset: `0px`,
  width: `64px`,
  height: `64px`,
  background: `rgba(0, 0, 0, 0.6)`,
  borderRadius: `50%`,
  color: `white`,
  transition: `opacity 500ms ease 0s`,
  pointerEvents: `none`,
})

globalStyle(`${groupStyle}:hover ${playPauseButtonStyle}`, {
  opacity: 1,
})

export const marginBottomVariants = styleVariants({
  default: {
    marginBottom: `auto`,
  },
  withDescription: {
    marginBottom: `0 !important`,
  },
})
