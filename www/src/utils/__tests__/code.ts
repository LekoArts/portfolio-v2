import { getLanguage, calculateLinesToHighlight, preToCodeBlock } from "../code"

const preProps = {
  children: {
    props: {
      children: `This is the code string`,
      className: `language-javascript`,
      otherProps: `Hello World`,
    },
    type: `code`,
  },
}

describe(`code utils`, () => {
  it(`getLanguage: get language`, () => {
    expect(getLanguage(`language-js`)).toBe(`js`)
    expect(getLanguage()).toBe(``)
  })
  describe(`calculateLinesToHighlight`, () => {
    it(`returns false if nothing can be found`, () => {
      const shouldHighlight = calculateLinesToHighlight(``)
      expect(shouldHighlight(1)).toBe(false)
    })
    it(`returns true for valid cases`, () => {
      // The result of calculateLinesToHighlight is zero-indexed
      const sh1 = calculateLinesToHighlight(`2`)
      expect(sh1(0)).toBe(false)
      expect(sh1(1)).toBe(true)
      const sh2 = calculateLinesToHighlight(`2-4`)
      expect(sh2(1)).toBe(true)
      expect(sh2(2)).toBe(true)
      expect(sh2(3)).toBe(true)
      expect(sh2(4)).toBe(false)
      const sh3 = calculateLinesToHighlight(`1-2,6`)
      expect(sh3(0)).toBe(true)
      expect(sh3(1)).toBe(true)
      expect(sh3(5)).toBe(true)
    })
  })
  it(`preToCodeBlock`, () => {
    // @ts-ignore - Intentially passing in invalid props
    expect(preToCodeBlock({ foo: `bar` })).toBe(undefined)
    expect(preToCodeBlock(preProps)).toStrictEqual({
      codeString: preProps.children.props.children,
      className: preProps.children.props.className,
      language: `javascript`,
      otherProps: preProps.children.props.otherProps,
    })
    expect(
      preToCodeBlock({ children: { props: { children: `This is the code string` }, type: `code` } })
    ).toStrictEqual({
      className: ``,
      codeString: preProps.children.props.children,
      language: ``,
    })
  })
})
