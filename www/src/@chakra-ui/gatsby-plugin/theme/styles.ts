import { ThemeOverride } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const styles: ThemeOverride["styles"] = {
  global: (props) => ({
    body: {
      bg: mode(`brand.bg`, `brand.dark.bg`)(props),
      color: mode(`brand.text`, `brand.dark.text`)(props),
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
