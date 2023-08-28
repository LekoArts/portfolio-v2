export const breakpointNames = [`mobile`, `sm`, `md`, `lg`, `xl`, `2xl`] as const

export const breakpoints = {
  mobile: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

// Get number values from breakpoints and exclude "mobile"
export const breakpointValues = Object.values(breakpoints).slice(1) as Array<Exclude<BreakpointValues, 0>>

export type Breakpoint = keyof typeof breakpoints
export type BreakpointValues = (typeof breakpoints)[Breakpoint]

export const minMediaQuery = (breakpoint: Exclude<Breakpoint, "mobile">) =>
  `screen and (min-width: ${breakpoints[breakpoint]}px)`
