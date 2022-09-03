import { transparentizeDict } from "../color"

const colorPalette = {
  black: `#000`,
  purple: {
    400: `#c084fc`,
  },
}

describe(`transparentize`, () => {
  it(`should get same color at root with full opacity`, () => {
    expect(transparentizeDict(`black`, 1)(colorPalette)).toBe(`rgb(0, 0, 0)`)
  })
  it(`should use rgba string with transparency`, () => {
    expect(transparentizeDict(`black`, 0.5)(colorPalette)).toBe(`rgba(0, 0, 0, 0.5)`)
  })
  it(`should get nested color property`, () => {
    expect(transparentizeDict(`purple.400`, 0.5)(colorPalette)).toBe(`rgba(192, 132, 252, 0.5)`)
  })
})
