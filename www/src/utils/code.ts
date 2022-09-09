export type Language =
  | "bash"
  | "sh"
  | "shell"
  | "css"
  | "javascript"
  | "js"
  | "jsx"
  | "diff"
  | "git"
  | "go"
  | "graphql"
  | "handlebars"
  | "json"
  | "less"
  | "markdown"
  | "mdx"
  | "python"
  | "py"
  | "sass"
  | "scss"
  | "tsx"
  | "typescript"
  | "ts"
  | "wasm"
  | "yaml"
  | "rust"
  | "svelte"
  | "html"
  | "text"

export type GetLanguageInput = `language-${Language}` | ""

/**
 * Get the language and optional parameters back
 * @param {string} className
 * @returns {string} The language
 * @example
 * getLanguage('language-js')
 */
export const getLanguage = (className: GetLanguageInput = ``) => className.split(`language-`).pop() as Language

const OVERRIDES = {
  svelte: `html`,
} as const

type OverridesInput = keyof typeof OVERRIDES
type OverridesOutput = typeof OVERRIDES[OverridesInput]

/**
 * Overrides a language to another one to e.g. have correct syntax highlighting support
 * @param {string} input
 * @returns {string} Either incoming input or override
 * @example
 * languageOverride('svelte')
 */
export const languageOverride = (input: OverridesInput | Language): OverridesOutput | Language =>
  OVERRIDES?.[input] ?? input

interface IPreProps {
  children: {
    props: {
      // Default props
      children: string
      className?: string
      // My custom props
      title?: string
      highlight?: string
      withLineNumbers?: boolean
      [key: string]: any
    }
    type: string
  }
}

/**
 * Converts the props coming from a `<pre>` MDX tag into a shape for the `<Code />` component
 * @example
 * preToCodeBlock(props)
 */
export const preToCodeBlock = (preProps: IPreProps) => {
  if (preProps?.children?.type === `code`) {
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

/**
 * Get the lines to highlight in a code block
 * @param meta
 * @returns A function that returns a boolean depending on if the index should be highlighted or not (zero-indexed)
 * @example
 * calculateLinesToHighlight('3')
 * calculateLinesToHighlight('3-6')
 * calculateLinesToHighlight('3-6,8')
 */
export const calculateLinesToHighlight = (meta: string) => {
  if (!meta) {
    return () => false
  }
  const lineNumbers = meta.split(`,`).map((v) => v.split(`-`).map((x) => parseInt(x, 10)))
  return (index: number) => {
    const lineNumber = index + 1
    return lineNumbers.some(([start, end]) => (end ? lineNumber >= start && lineNumber <= end : lineNumber === start))
  }
}
