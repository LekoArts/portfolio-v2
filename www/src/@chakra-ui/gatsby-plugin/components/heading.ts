import { headingBaseStyles } from "../custom/typography"

export const Heading = {
  defaultProps: {},
  baseStyle: {
    fontFamily: `heading`,
    fontWeight: `bold`,
    color: `heading`,
  },
  sizes: {
    "4xl": {
      fontSize: `4xl`,
      lineHeight: `4xl`,
    },
    "3xl": {
      fontSize: `3xl`,
      lineHeight: `3xl`,
    },
    "2xl": {
      fontSize: `2xl`,
      lineHeight: `2xl`,
    },
    xl: {
      fontSize: `xl`,
      lineHeight: `xl`,
    },
    lg: {
      fontSize: `lg`,
      lineHeight: `lg`,
    },
    md: {
      fontSize: `md`,
      lineHeight: `md`,
    },
    sm: {
      fontSize: `sm`,
      lineHeight: `sm`,
    },
  },
  variants: {
    h1: {
      ...headingBaseStyles.h1,
    },
    h2: {
      ...headingBaseStyles.h2,
    },
    h3: {
      ...headingBaseStyles.h3,
    },
    h4: {
      ...headingBaseStyles.h4,
    },
  },
}
