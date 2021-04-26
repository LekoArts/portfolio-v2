type getParamsResponse = {
  language: string
  params: {
    title?: string
    [key: string]: string
  }
}

/**
 * Get the language and optional parameters back
 * @param className
 * @example
 * getParams('language-js:title=src/components/code.js')
 */
export const getParams = (className = ``): getParamsResponse => {
  const [lang = ``, params = ``] = className.split(`:`)

  const extractedLanguage = lang.split(`language-`).pop()
  const extractedParams = params.split(`&`).reduce((merged, param) => {
    const [key, value] = param.split(`=`)
    merged[key] = value
    return merged
  }, {})

  return {
    language: extractedLanguage,
    params: extractedParams,
  }
}

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

export const calculateLinesToHighlight = (meta: string) => {
  if (!RE.test(meta)) {
    return () => false
  }
  const lineNumbers = RE.exec(meta)![1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)))
  return (index: number) => {
    const lineNumber = index + 1
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    )
    return inRange
  }
}
