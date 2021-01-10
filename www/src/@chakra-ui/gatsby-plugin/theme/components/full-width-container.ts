import { mode } from "@chakra-ui/theme-tools"
import InnerContainerStyles from "./container"

const FullWidthContainer = {
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
        bg: mode(`brand.bg`, `brand.dark.bg`)(props),
      },
      inner: {
        bg: mode(`brand.bg`, `brand.dark.bg`)(props),
      },
    }),
    light: (props) => ({
      outer: {
        bg: mode(`blueGray.50`, `blueGray.800`)(props),
      },
      inner: {
        bg: mode(`blueGray.50`, `blueGray.800`)(props),
      },
    }),
    dark: (props) => ({
      outer: {
        bg: mode(`blueGray.800`, `blueGray.800`)(props),
      },
      inner: {
        bg: mode(`blueGray.800`, `blueGray.800`)(props),
        color: `blueGray.300`,
      },
    }),
    navigation: (props) => ({
      outer: {
        bg: mode(`brand.bgAlpha`, `brand.dark.bgAlpha`)(props),
        backdropFilter: `blur(8px)`,
        position: `fixed`,
        display: `flex`,
        alignItems: `center`,
        height: `navigationHeight`,
        zIndex: `sticky`,
      },
    }),
  },
}

export default FullWidthContainer
