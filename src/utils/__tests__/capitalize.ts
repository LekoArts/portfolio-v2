import { capitalize } from "../capitalize.mjs"

describe(`capitalize`, () => {
  it(`it works for all lowercase`, () => {
    expect(capitalize(`small`)).toBe(`Small`)
  })
  it(`it keeps other formats`, () => {
    expect(capitalize(`sMall`)).toBe(`SMall`)
  })
})
