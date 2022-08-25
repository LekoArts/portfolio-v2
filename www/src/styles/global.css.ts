import { globalStyle } from "@vanilla-extract/css"
import { space } from "./tokens/space"
import { vars } from "./themes/contract.css"

globalStyle(`html`, {
  scrollPaddingTop: `calc(${space.navigationHeight} + 1rem)`,
})

globalStyle(`body`, {
  background: vars.color.bg,
  color: vars.color.text,
  scrollbarWidth: `thin`,
  scrollbarColor: `${vars.color.scrollbarTrack} ${vars.color.scrollbarThumb}`,
})
