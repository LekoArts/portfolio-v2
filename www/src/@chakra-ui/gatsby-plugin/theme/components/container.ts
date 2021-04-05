const Container = {
  baseStyle: {
    w: `100%`,
    mx: `auto`,
    maxW: `1024px`,
    px: [`1rem`, `1.5rem`],
  },
  defaultProps: {
    size: `lg`,
  },
  variants: {
    proseRoot: {
      pt: 16,
      pb: [20, null, null, 24],
    },
  },
}

export default Container
