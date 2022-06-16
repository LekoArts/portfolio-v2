import { getLanguage, calculateLinesToHighlight, preToCodeBlock } from "../code"

const preProps = {
  mdxType: `code`,
  children: `This is the code string`,
  className: `language-javascript`,
  otherProps: `Hello World`,
}

describe(`code utils`, () => {
  it(`getLanguage: get language`, () => {
    expect(getLanguage(`language-js`)).toBe(`js`)
    expect(getLanguage()).toBe(``)
  })
  describe(`calculateLinesToHighlight`, () => {
    it(`returns false if nothing can be found`, () => {
      const shouldHighlight = calculateLinesToHighlight(`title=gatsby-config.js`)
      expect(shouldHighlight(1)).toBe(false)
    })
    it(`returns true for valid cases`, () => {
      // The result of calculateLinesToHighlight is zero-indexed
      const sh1 = calculateLinesToHighlight(`title=gatsby-config.js {2}`)
      expect(sh1(0)).toBe(false)
      expect(sh1(1)).toBe(true)
      const sh2 = calculateLinesToHighlight(`title=gatsby-config.js {2-4}`)
      expect(sh2(1)).toBe(true)
      expect(sh2(2)).toBe(true)
      expect(sh2(3)).toBe(true)
      expect(sh2(4)).toBe(false)
      const sh3 = calculateLinesToHighlight(`title=gatsby-config.js {1-2,6}`)
      expect(sh3(0)).toBe(true)
      expect(sh3(1)).toBe(true)
      expect(sh3(5)).toBe(true)
    })
  })
  it(`preToCodeBlock`, () => {
    expect(preToCodeBlock({ foo: `bar` })).toBe(undefined)
    expect(preToCodeBlock({ children: { props: preProps } })).toStrictEqual({
      codeString: preProps.children,
      className: preProps.className,
      language: `javascript`,
      otherProps: preProps.otherProps,
      mdxType: preProps.mdxType,
    })
    expect(preToCodeBlock({ children: { props: { mdxType: `code`, children: preProps.children } } })).toStrictEqual({
      className: ``,
      codeString: preProps.children,
      language: ``,
      mdxType: preProps.mdxType,
    })
  })
})
