import { slugify, capitalize, shuffle } from "../index"

describe(`utils`, () => {
  it(`slugify: returns with slash if no title, slug, and prefix is given`, () => {
    expect(slugify({})).toBe(`/`)
  })
  it(`slugify: returns with prefix is no title & slug is given`, () => {
    expect(slugify({}, `category`)).toBe(`/category`)
  })
  it(`slugify: slug can override slugified title`, () => {
    expect(slugify({ slug: `custom-slug` })).toBe(`/custom-slug`)
  })
  it(`slugify: title gets slugified`, () => {
    expect(slugify({ title: `My Custom Title` })).toBe(`/my-custom-title`)
  })
  it(`slugify: prefix and double slashes no problem`, () => {
    expect(slugify({ slug: `/custom-slug` }, `/prefix`)).toBe(`/prefix/custom-slug`)
  })
  it(`shuffle: seed makes it consistent`, () => {
    expect(shuffle([`one`, `two`, `three`], 1)).toStrictEqual([`three`, `one`])
  })
  it(`shuffle: count option`, () => {
    expect(shuffle([`one`, `two`, `three`, `four`, `five`], 1, 3)).toStrictEqual([`four`, `five`, `three`])
  })
  it(`capitalize`, () => {
    expect(capitalize(`small`)).toBe(`Small`)
    expect(capitalize(`sMall`)).toBe(`SMall`)
  })
})
