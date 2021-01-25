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
    primary: (props) => ({
      bg: mode(`brand.primary`, `brand.dark.primary`)(props),
      color: `white`,
      _hover: {
        bg: mode(`brand.primaryHover`, `brand.dark.primaryHover`)(props),
        _disabled: {
          bg: `brand.primary`,
        },
      },
      _active: { bg: mode(`brand.primaryHover`, `brand.dark.primaryHover`)(props) },
    }),
  },
}

export default Button
