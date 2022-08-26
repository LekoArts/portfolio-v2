export const breakpointNames = [`mobile`, `sm`, `md`, `lg`, `xl`, `2xl`] as const

export const breakpoints = {
  mobile: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

export type Breakpoint = keyof typeof breakpoints

export const minMediaQuery = (breakpoint: Breakpoint) => `screen and (min-width: ${breakpoints[breakpoint]}px)`
