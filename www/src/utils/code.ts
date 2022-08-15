/**
 * Get the language and optional parameters back
 * @param {string} className
 * @returns {string} The language
 * @example
 * getLanguage('language-js')
 */
export const getLanguage = (className = ``): string => className.split(`language-`).pop()

const OVERRIDES = {
  svelte: `html`,
} as const

/**
 * Overrides a language to another one to e.g. have correct syntax highlighting support
 * @param {string} input
 * @returns {string} Either incoming input or override
 * @example
 * languageOverride('svelte')
 */
export const languageOverride = (input: string): string => OVERRIDES?.[input] ?? input

export const preToCodeBlock = (preProps) => {
  console.log(preProps)
  if (preProps?.children?.type === `code`) {
    console.log(`hello`)
    const { children: codeString, className = ``, ...props } = preProps.children.props

    const match = className.match(/language-([\0-\uFFFF]*)/)
    return {
      codeString: codeString.trim(),
      className,
      language: match !== null ? match[1] : ``,
      ...props,
    }
  }

  return undefined
}

const RE = /{([\d,-]+)}/

/**
 * Get the lines to highlight in a code block
 * @param meta
 * @returns A function that returns a boolean depending on if the index should be highlighted or not (zero-indexed)
 * @example
 * calculateLinesToHighlight('title=gatsby-config.js {3-6}')
 * calculateLinesToHighlight('title=gatsby-config.js {3}')
 * calculateLinesToHighlight('title=gatsby-config.js {3-6,8}')
 */
export const calculateLinesToHighlight = (meta: string) => {
  if (!RE.test(meta)) {
    return () => false
  }
  const lineNumbers = RE.exec(meta)![1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)))
  return (index: number) => {
    const lineNumber = index + 1
    return lineNumbers.some(([start, end]) => (end ? lineNumber >= start && lineNumber <= end : lineNumber === start))
  }
}
