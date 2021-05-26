/**
 * Get the language and optional parameters back
 * @param {string} className
 * @returns {string} The language
 * @example
 * getLanguage('language-js')
 */
export const getLanguage = (className = ``): string => className.split(`language-`).pop()

export const preToCodeBlock = (preProps) => {
  if (preProps?.children?.props?.mdxType === `code`) {
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
 * @returns A function that returns a boolean depending on if the index should be highlighted or not
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
