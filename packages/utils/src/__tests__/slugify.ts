import { slugify } from "../slugify"

describe(`slugify`, () => {
  it(`throws with empty input`, () => {
    // @ts-ignore
    expect(() => slugify({})).toThrowErrorMatchingInlineSnapshot(`"title or slug must be provided."`)
  })
  it(`throws with empty input and given prefix`, () => {
    // @ts-ignore
    expect(() => slugify({}, `category`)).toThrowErrorMatchingInlineSnapshot(`"title or slug must be provided."`)
  })
  it(`only slug can be provided`, () => {
    expect(slugify({ slug: `custom-slug` })).toBe(`/custom-slug`)
  })
  it(`slug can override slugified title`, () => {
    expect(slugify({ slug: `custom-slug`, title: `some-title` })).toBe(`/custom-slug`)
  })
  it(`title gets slugified`, () => {
    expect(slugify({ title: `My Custom Title` })).toBe(`/my-custom-title`)
  })
  it(`prefix and double slashes no problem`, () => {
    expect(slugify({ slug: `/custom-slug` }, `/prefix`)).toBe(`/prefix/custom-slug`)
  })
})
