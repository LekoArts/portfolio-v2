import { mode } from "@chakra-ui/theme-tools"
import InnerContainerStyles from "./container"

const fullWidthContainerStyles = {
  parts: [`outer`, `inner`],
  baseStyle: {
    outer: {
      w: `100%`,
      margin: 0,
    },
    inner: {
      ...InnerContainerStyles.baseStyle,
    },
  },
  variants: {
    default: (props) => ({
      outer: {
        bg: mode(`white`, `blueGray.800`)(props),
      },
      inner: {
        bg: mode(`white`, `blueGray.800`)(props),
      },
    }),
    light: (props) => ({
      outer: {
        bg: mode(`blueGray.50`, `blueGray.900`)(props),
      },
      inner: {
        bg: mode(`blueGray.50`, `blueGray.900`)(props),
      },
    }),
    dark: (props) => ({
      outer: {
        bg: mode(`blueGray.800`, `blueGray.900`)(props),
      },
      inner: {
        bg: mode(`blueGray.800`, `blueGray.900`)(props),
      },
    }),
  },
}

export default fullWidthContainerStyles
