import { mode } from "@chakra-ui/theme-tools"
import sizes from "./foundations/sizes"

const styles = {
  global: (props) => ({
    html: {
      scrollPaddingTop: `calc(${sizes.navigationHeight} + 1rem)`,
    },
    body: {
      bg: `bg`,
      color: `text`,
      scrollbarWidth: `thin`,
      scrollbarColor: mode(`blueGray.400 blueGray.200`, `blueGray.400 blueGray.700`)(props),
      "::-webkit-scrollbar": {
        width: `14px`,
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: mode(`blueGray.200`, `blueGray.700`)(props),
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: mode(`blueGray.400`, `blueGray.400`)(props),
        borderRadius: `8px`,
        borderWidth: `3px`,
        borderStyle: `solid`,
        borderColor: mode(`blueGray.200`, `blueGray.700`)(props),
      },
    },
    "[data-skip-to-content]": {
      clip: `rect(0 0 0 0)`,
      "&:focus": {
        clip: `auto`,
      },
    },
  }),
}

export default styles
