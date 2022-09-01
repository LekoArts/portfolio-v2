import { round, em, rem } from "../css"

describe(`round`, () => {
  it(`rounds to 7 decimal places`, () => {
    expect(round(1.123456789)).toBe(`1.1234568`)
  })
  it(`keeps whole numbers`, () => {
    expect(round(8)).toBe(`8`)
    expect(round(20)).toBe(`20`)
  })
})

describe(`rem`, () => {
  it(`works`, () => {
    expect(rem(16)).toBe(`1rem`)
    expect(rem(24)).toBe(`1.5rem`)
  })
})

describe(`em`, () => {
  it(`works`, () => {
    expect(em(16, 16)).toBe(`1em`)
    expect(em(24, 16)).toBe(`1.5em`)
  })
})
