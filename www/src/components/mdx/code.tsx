import * as React from "react"
import Highlight, { defaultProps, Language } from "prism-react-renderer"
import lightTheme from "prism-react-renderer/themes/nightOwlLight"
import darkTheme from "prism-react-renderer/themes/nightOwl"
import { useTheme } from "themes-utils"
import { Box } from "../primitives"
import { calculateLinesToHighlight, getLanguage, languageOverride } from "../../utils/code"
import { Copy } from "./copy"

type CodeProps = {
  codeString: string
  language: string
  withLineNumbers?: boolean
  metastring?: string
  [key: string]: any
}

export const Code = ({
  codeString,
  withLineNumbers = false,
  title = undefined,
  className: blockClassName,
  metastring = ``,
}: CodeProps) => {
  const { resolvedTheme } = useTheme()
  const originalLanguage = getLanguage(blockClassName)
  const language = languageOverride(originalLanguage)
  const shouldHighlightLine = calculateLinesToHighlight(metastring)
  const hasLineNumbers = withLineNumbers && language !== `withLineNumbers`

  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language as Language}
      theme={resolvedTheme === `light` ? lightTheme : darkTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="code-block-wrapper">
          {(title || originalLanguage) && (
            <Box
              display="flex"
              flexDirection="row"
              gap="2"
              alignItems="center"
              justifyContent="flex-end"
              className="gatsby-highlight-header"
            >
              {title && (
                <Box style={{ flexGrow: 1 }} className="code-title">
                  {title}
                </Box>
              )}
              {originalLanguage && (
                <Box
                  display="inline-flex"
                  alignItems="center"
                  style={{ textTransform: `uppercase` }}
                  className="language-display"
                  data-lang={originalLanguage}
                >
                  {originalLanguage}
                </Box>
              )}
              <Copy content={codeString} fileName={title} />
            </Box>
          )}
          <div className="gatsby-highlight" data-prism-renderer="true" data-has-line-numbers={hasLineNumbers}>
            <pre className={className} style={style}>
              <code className={`language-${language}`}>
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i })

                  if (shouldHighlightLine(i)) {
                    lineProps.className = `${lineProps.className} highlight-line`
                  }

                  return (
                    <div {...lineProps}>
                      {hasLineNumbers && <span className="line-number-style">{i + 1}</span>}
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  )
                })}
              </code>
            </pre>
          </div>
        </div>
      )}
    </Highlight>
  )
}
