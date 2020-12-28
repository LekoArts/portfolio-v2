const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, `$1`)
    .replace(/\.0$/, ``)
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`

export { round, rem, em }
