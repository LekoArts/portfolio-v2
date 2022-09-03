export const round = (num: number) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, `$1`)
    .replace(/\.0$/, ``)
export const rem = (px: number) => `${round(px / 16)}rem`
export const em = (px: number, base: number) => `${round(px / base)}em`
