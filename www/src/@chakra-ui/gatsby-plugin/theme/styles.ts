import { ThemeOverride } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const styles: ThemeOverride["styles"] = {
  global: (props) => ({
    body: {
      bg: mode(`white`, `blueGray.800`)(props),
      color: mode(`blueGray.800`, `blueGray.200`)(props),
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
