import { mode } from "@chakra-ui/theme-tools"
import { textStyles as foundationTextStyles } from "../foundations/typography"

const Text = {
  variants: {
    heading: (props) => ({
      color: mode(`black`, `white`)(props),
    }),
    prominent: (props) => ({
      ...foundationTextStyles.prominent,
      strong: {
        ...foundationTextStyles.prominent.strong,
        color: mode(`blueGray.900`, `blueGray.100`)(props),
      },
      a: {
        ...foundationTextStyles.prominent.a,
        color: mode(`blueGray.900`, `blueGray.100`)(props),
      },
    }),
  },
}

export default Text
