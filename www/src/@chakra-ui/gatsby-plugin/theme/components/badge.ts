import { mode } from "@chakra-ui/theme-tools"

const baseStyles = {
  fontSize: [`xs`, null, null, `sm`],
  fontWeight: `medium`,
  letterSpacing: `widest`,
}

const Badge = {
  defaultProps: {
    variant: `default`,
  },
  variants: {
    default: (props) => ({
      ...baseStyles,
      bg: mode(`brand.bg`, `brand.dark.bg`)(props),
    }),
    light: (props) => ({
      ...baseStyles,
      bg: mode(`brand.bg`, `brand.dark.bg`)(props),
      color: mode(`blueGray.500`, `blueGray.400`)(props),
      px: `1rem`,
      py: `4px`,
      borderRadius: `xl`,
    }),
    dark: (props) => ({
      ...baseStyles,
      bg: mode(`blueGray.50`, `blueGray.800`)(props),
      color: mode(`blueGray.600`, `blueGray.400`)(props),
      px: `1rem`,
      py: `4px`,
      borderRadius: `xl`,
    }),
  },
}

export default Badge
