import { mode } from "@chakra-ui/theme-tools"

const baseStyles = {
  fontSize: [`xs`, null, null, `sm`],
  fontWeight: `normal`,
  letterSpacing: `widest`,
}

const Badge = {
  defaultProps: {
    variant: `default`,
  },
  variants: {
    default: (props) => ({
      ...baseStyles,
      bg: mode(`white`, `blueGray.900`)(props),
    }),
    light: (props) => ({
      ...baseStyles,
      bg: mode(`white`, `blueGray.900`)(props),
      color: mode(`blueGray.500`, `blueGray.200`)(props),
      px: `1rem`,
      py: `4px`,
      borderRadius: `xl`,
    }),
  },
}

export default Badge
