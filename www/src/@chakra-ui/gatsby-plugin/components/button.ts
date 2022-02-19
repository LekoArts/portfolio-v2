import { mode } from "@chakra-ui/theme-tools"

const Button = {
  baseStyle: {
    fontWeight: `normal`,
  },
  defaultProps: {
    size: `brand`,
  },
  sizes: {
    brand: {
      h: 8,
      minW: 10,
      fontSize: `md`,
      px: 4,
    },
  },
  variants: {
    primary: {
      bg: `primary`,
      color: `white`,
      _hover: {
        bg: `primaryHover`,
        _disabled: {
          bg: `primary`,
        },
      },
      _active: { bg: `primaryHover` },
    },
    outline: (props) => ({
      color: mode(`text`, `white`)(props),
      bg: `transparent`,
      borderStyle: `solid`,
      borderColor: `primary`,
      borderWidth: `1px`,
      _hover: {
        color: `white`,
        bg: `primary`,
      },
    }),
  },
}

export default Button
