import { isInternalUrl } from "../is-internal-url"

describe(`isInternalUrl`, () => {
  it(`returns true for internal URLs`, () => {
    expect(isInternalUrl(`/`)).toBe(true)
    expect(isInternalUrl(`/about/`)).toBe(true)
    expect(isInternalUrl(`/about/#anchor`)).toBe(true)
    expect(isInternalUrl(`https://www.lekoarts.de`)).toBe(true)
    expect(isInternalUrl(`https://www.lekoarts.de/about/`)).toBe(true)
    expect(isInternalUrl(`https://www.lekoarts.de/about/#anchor`)).toBe(true)
  })

  it(`returns false for external URLs`, () => {
    expect(isInternalUrl(`https://example.com`)).toBe(false)
    expect(isInternalUrl(`https://example.com/about`)).toBe(false)
    expect(isInternalUrl(`https://example.com/about#anchor`)).toBe(false)
    expect(isInternalUrl(`https://example.com/about/`)).toBe(false)
    expect(isInternalUrl(`https://example.com/about/#anchor`)).toBe(false)
  })
})
