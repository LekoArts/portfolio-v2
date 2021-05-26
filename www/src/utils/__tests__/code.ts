import { getLanguage, calculateLinesToHighlight } from "../code"

describe(`code utils`, () => {
  it(`getLanguage: get language`, () => {
    expect(getLanguage(`language-js`)).toBe(`js`)
  })
  it(`calculateLinesToHighlight: returns false if nothing can be found`, () => {
    const shouldHighlight = calculateLinesToHighlight(`title=gatsby-config.js`)
    expect(shouldHighlight(1)).toBe(false)
  })
  it(`calculateLinesToHighlight: returns true for valid cases`, () => {
    const sh1 = calculateLinesToHighlight(`title=gatsby-config.js {2}`)
    expect(sh1(0)).toBe(false)
    const sh2 = calculateLinesToHighlight(`title=gatsby-config.js {2}`)
    expect(sh2(1)).toBe(true)
    const sh3 = calculateLinesToHighlight(`title=gatsby-config.js {2-4}`)
    expect(sh3(1)).toBe(true)
    expect(sh3(2)).toBe(true)
    expect(sh3(3)).toBe(true)
    expect(sh3(4)).toBe(false)
    const sh4 = calculateLinesToHighlight(`title=gatsby-config.js {1-2,6}`)
    expect(sh4(0)).toBe(true)
    expect(sh4(1)).toBe(true)
    expect(sh4(5)).toBe(true)
  })
})
