import * as React from "react"
import Highlight, { defaultProps, Language } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwl"
import { Stack, Box } from "@chakra-ui/react"
import { Copy } from "./copy"
import { calculateLinesToHighlight, getParams } from "../../utils/code"

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
  className: blockClassName,
  metastring = ``,
}: CodeProps) => {
  const {
    language,
    params: { title = `` },
  } = getParams(blockClassName)
  const shouldHighlightLine = calculateLinesToHighlight(metastring)
  const hasLineNumbers = withLineNumbers && language !== `withLineNumbers`

  return (
    <Highlight {...defaultProps} code={codeString} language={language as Language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <React.Fragment>
          {(title || language) && (
            <Stack direction="row" spacing={2} justifyContent="flex-end" className="gatsby-highlight-header">
              {title && (
                <Box flexGrow={1} className="code-title">
                  {title}
                </Box>
              )}
              {language && (
                <Box
                  textTransform="uppercase"
                  display="inline-flex"
                  alignItems="center"
                  className="language-display"
                  data-lang={language}
                >
                  {language}
                </Box>
              )}
              <Copy content={codeString} fileName={title} />
            </Stack>
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
        </React.Fragment>
      )}
    </Highlight>
  )
}
