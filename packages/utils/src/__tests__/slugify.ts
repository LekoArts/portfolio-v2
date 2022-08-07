import { slugify } from "../slugify"

describe(`slugify`, () => {
  it(`returns with slash if no title, slug, and prefix is given`, () => {
    expect(slugify({})).toBe(`/`)
  })
  it(`returns with prefix is no title & slug is given`, () => {
    expect(slugify({}, `category`)).toBe(`/category`)
  })
  it(`slug can override slugified title`, () => {
    expect(slugify({ slug: `custom-slug` })).toBe(`/custom-slug`)
  })
  it(`title gets slugified`, () => {
    expect(slugify({ title: `My Custom Title` })).toBe(`/my-custom-title`)
  })
  it(`prefix and double slashes no problem`, () => {
    expect(slugify({ slug: `/custom-slug` }, `/prefix`)).toBe(`/prefix/custom-slug`)
  })
})
