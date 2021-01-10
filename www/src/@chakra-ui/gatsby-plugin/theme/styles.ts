import { ThemeOverride } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const styles: ThemeOverride["styles"] = {
  global: (props) => ({
    body: {
      bg: mode(`brand.bg`, `brand.dark.bg`)(props),
      color: mode(`brand.text`, `brand.dark.text`)(props),
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
