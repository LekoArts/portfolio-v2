export const letterSpacings = {
  tighter: `-0.05em`,
  tight: `-0.025em`,
  normal: `0`,
  wide: `0.025em`,
  wider: `0.05em`,
  widest: `0.1em`,
}

export type LetterSpacings = keyof typeof letterSpacings

export const lineHeights = {
  none: `1`,
  shorter: `1.25`,
  short: `1.375`,
  base: `1.5`,
  tall: `1.625`,
  taller: `2`,
  xs: `1rem`,
  sm: `1.25rem`,
  md: `1.5rem`,
  lg: `1.75rem`,
  xl: `1.75rem`,
  "2xl": `2.25rem`,
  "3xl": `2.5rem`,
  "4xl": `1`,
  "5xl": `1`,
  "6xl": `1`,
}

export type LineHeights = keyof typeof lineHeights

export const fontWeights = {
  normal: `400`,
  medium: `500`,
  semibold: `600`,
  bold: `700`,
  extrabold: `800`,
}

export type FontWeights = keyof typeof fontWeights

export const fontSizes = {
  xs: `0.7rem`,
  sm: `0.875rem`, // 14px
  md: `1rem`,
  lg: `1.125rem`,
  lgx: `1.3125rem`,
  xl: `1.563rem`, // h4
  "2xl": `1.953rem`, // h3
  "3xl": `2.441rem`, // h2
  "4xl": `3.052rem`, // h1
  "5xl": `3.815rem`,
  "6xl": `4.768rem`,
}

export type FontSizes = keyof typeof fontSizes
