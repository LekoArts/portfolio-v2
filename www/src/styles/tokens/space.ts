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

const container = {
  containerSM: `640px`,
  containerMD: `768px`,
  containerLG: `1024px`,
  containerXL: `1280px`,
}

export const navigation = {
  navigationHeight: `61px`,
  navigationWithSubHeight: `111px`,
}

export const space = {
  ...baseSizes,
  max: `max-content`,
  min: `min-content`,
  full: `100%`,
  ...navigation,
  ...container,
}
