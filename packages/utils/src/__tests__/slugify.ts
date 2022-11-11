import { slugify } from "../slugify"

describe(`slugify`, () => {
  it(`throws with empty input`, () => {
    expect(() => slugify(``)).toThrowErrorMatchingInlineSnapshot(`"slugify requires an input"`)
  })
  it(`throws with empty input and given prefix`, () => {
    expect(() => slugify(``, `category`)).toThrowErrorMatchingInlineSnapshot(`"slugify requires an input"`)
  })
  it(`title gets slugified`, () => {
    expect(slugify(`My Custom Title`)).toBe(`/my-custom-title`)
  })
  it(`prefix and double slashes no problem`, () => {
    expect(slugify(`/custom-slug`, `/prefix`)).toBe(`/prefix/custom-slug`)
  })
})
