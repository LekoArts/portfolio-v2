import { style } from "@vanilla-extract/css"
import { vars } from "../../styles/themes/contract.css"
import { minMediaQuery } from "../../styles/tokens/breakpoints"

export const wrapperStyle = style({
  display: `block`,
  "@media": {
    [minMediaQuery(`2xl`)]: {
      display: `flex`,
    },
  },
})

export const asideStyle = style({
  position: `relative`,
  maxHeight: `unset`,
  top: `unset`,
  "@media": {
    [minMediaQuery(`2xl`)]: {
      position: `sticky`,
      maxHeight: `300px`,
      top: `80px`,
    },
  },
})

export const navStyle = style({
  minWidth: `185px`,
  marginTop: `0`,
  maxWidth: `100%`,
  overflow: `auto`,
  "@media": {
    [minMediaQuery(`2xl`)]: {
      marginTop: `1.8em`,
      maxWidth: `220px`,
    },
  },
})

export const headingStyle = style({
  fontSize: vars.fontSize.sm,
  letterSpacing: `0.075em`,
  textTransform: `uppercase`,
  "@media": {
    [minMediaQuery(`lg`)]: {
      fontSize: `1rem`,
    },
    [minMediaQuery(`2xl`)]: {
      fontSize: vars.fontSize.sm,
    },
  },
})
