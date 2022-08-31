/* prominent: (props) => ({
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
    lightContainer: (props) => ({
      color: mode(`blueGray.700`, `blueGray.200`)(props),
    }),
*/

import { StyleRule, styleVariants } from "@vanilla-extract/css"

export type TextVariants = "prominent"

const texts: Record<TextVariants, StyleRule> = {
  prominent: {},
}

export const textVariants = styleVariants(texts, (text) => [text])
