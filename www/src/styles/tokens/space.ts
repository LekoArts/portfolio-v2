import { Atoms } from "../atoms.css"

export const baseSizes = {
  "0": `0`,
  "1": `0.25rem`,
  "2": `0.5rem`,
  "3": `0.75rem`,
  "4": `1rem`,
  "5": `1.25rem`,
  "6": `1.5rem`,
  "7": `1.75rem`,
  "8": `2rem`,
  "9": `2.25rem`,
  "10": `2.5rem`,
  "12": `3rem`,
  "14": `3.5rem`,
  "16": `4rem`,
  "20": `5rem`,
  "24": `6rem`,
  "28": `7rem`,
  "32": `8rem`,
  "36": `9rem`,
  "40": `10rem`,
  "44": `11rem`,
  "48": `12rem`,
  px: `1px`,
}

export const navigation = {
  navigationHeight: `61px`,
  navigationWithSubHeight: `111px`,
}

export const negativeNavigation = {
  "-navigationHeight": `-61px`,
  "-navigationWithSubHeight": `-111px`,
}

export const space = {
  ...baseSizes,
  full: `100%`,
  unset: `unset`,
  auto: `auto`,
  ...navigation,
  ...negativeNavigation,
}

export const paddingResponsiveArrays = {
  paddingSmall: [`12`, `16`, null, `24`, `28`] as Atoms["paddingTop"],
  paddingMedium: [`16`, `24`, null, `36`, `40`] as Atoms["paddingTop"],
  paddingLarge: [`20`, `24`, null, `40`, `48`] as Atoms["paddingTop"],
}

export type Space = keyof typeof space
