import { style } from "@vanilla-extract/css"

export const skipNavLinkStyle = style({
  border: 0,
  height: `1px`,
  width: `1px`,
  margin: `-1px`,
  padding: 0,
  overflow: `hidden`,
  position: `absolute`,
  clip: `rect(0 0 0 0)`,
  ":focus": {
    padding: `1rem`,
    position: `fixed`,
    top: `10px`,
    left: `10px`,
    background: `bg`,
    zIndex: 1600,
    width: `auto`,
    height: `auto`,
    clip: `auto`,
  },
})
