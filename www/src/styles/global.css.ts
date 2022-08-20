import { globalStyle } from "@vanilla-extract/css"
import { sizes } from "./foundations/sizes"

globalStyle(`html`, {
  scrollPaddingTop: `calc(${sizes.navigationHeight} + 1rem)`,
})

globalStyle(`body`, {
  scrollbarWidth: `thin`,
})
