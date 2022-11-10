import { globalStyle } from "@vanilla-extract/css"
import { space } from "./tokens/space"
import { vars } from "./themes/contract.css"
import { fonts } from "./fonts.css"
import { colorPalette } from "./tokens/colors"

globalStyle(`html`, {
  scrollPaddingTop: `calc(${space.navigationHeight} + ${vars.space[4]})`,
})

globalStyle(`body`, {
  fontFamily: fonts.body,
  color: vars.color.text,
  background: vars.color.bg,
  lineHeight: vars.lineHeight.base,
  transitionProperty: `background-color, color`,
  transitionDuration: `0.3s`,
  position: `relative`,
  minHeight: vars.space.full,
  fontFeatureSettings: `'kern'`,
})

globalStyle(`*`, {
  borderColor: colorPalette.transparent,
  wordWrap: `break-word`,
  boxSizing: `border-box`,
  margin: vars.space[0],
  borderWidth: vars.space[0],
  borderStyle: `solid`,
})

globalStyle(`a`, {
  backgroundColor: colorPalette.transparent,
  color: `inherit`,
  textDecoration: `inherit`,
})

globalStyle(`img`, {
  borderStyle: `none`,
})

globalStyle(`hr`, {
  boxSizing: `content-box`,
  height: vars.space[0],
  overflow: `visible`,
})

globalStyle(`pre, code, kbd`, {
  fontFamily: fonts.mono,
  fontSize: `1em`,
})

globalStyle(`button, input, select, textarea`, {
  fontFamily: `inherit`,
  fontSize: `100%`,
  lineHeight: 1.15,
  margin: vars.space[0],
})

globalStyle(`button, input`, {
  overflow: `visible`,
})

globalStyle(`button, select`, {
  textTransform: `none`,
})

globalStyle(`textarea`, {
  overflow: `auto`,
})

globalStyle(`details`, {
  display: `block`,
})

globalStyle(`summary`, {
  display: `list-item`,
})

globalStyle(`body, blockquote, h1, h2, h3, h4, h5, h6, hr, figure, p, pre`, {
  margin: vars.space[0],
})

globalStyle(`button`, {
  background: colorPalette.transparent,
  padding: vars.space[0],
  cursor: `pointer`,
})

globalStyle(`ol, ul`, {
  margin: vars.space[0],
  padding: vars.space[0],
})

globalStyle(`table`, {
  borderCollapse: `collapse`,
})

globalStyle(`h1, h2, h3, h4, h5, h6`, {
  fontSize: `inherit`,
  fontWeight: `inherit`,
})

globalStyle(`button, input, select, textarea`, {
  padding: vars.space[0],
  lineHeight: `inherit`,
  color: `inherit`,
})

globalStyle(`img, svg, video, canvas, audio, iframe, embed, object`, {
  display: `block`,
})

globalStyle(`img, video`, {
  maxWidth: vars.space.full,
  height: vars.space.auto,
})
