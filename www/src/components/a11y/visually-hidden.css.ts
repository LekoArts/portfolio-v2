import { style } from "@vanilla-extract/css"

export const visuallyHiddenStyle = style({
  border: `0px`,
  clip: `rect(0px, 0px, 0px, 0px)`,
  height: `1px`,
  width: `1px`,
  margin: `-1px`,
  padding: `0px`,
  overflow: `hidden`,
  whiteSpace: `nowrap`,
  position: `absolute`,
})
