import * as React from "react"
import Highlight, { defaultProps, Language } from "prism-react-renderer"
import lightTheme from "prism-react-renderer/themes/nightOwlLight"
import darkTheme from "prism-react-renderer/themes/nightOwl"
import { useTheme } from "themes-utils"
import { Box } from "../primitives"
import { calculateLinesToHighlight, getLanguage, languageOverride } from "../../utils/code"
import { Copy } from "./copy"
import {
  codeBlockWrapper,
  codeStyle,
  gatsbyHighlightHeaderStyle,
  gatsbyHighlightPreStyle,
  gatsbyHighlightStyle,
  highlightLineStyle,
  languageDisplayStyle,
  lineNumberStyle,
  tokenLineStyle,
} from "./code.css"
import { composeClassNames } from "../../utils/box"

type CodeProps = {
  codeString: string
  language: string
  withLineNumbers?: boolean
  highlight?: string
  title?: string
  className: string
}

export const Code = ({
  codeString,
  withLineNumbers = false,
  title = undefined,
  className: blockClassName,
  highlight = ``,
}: CodeProps) => {
  const { resolvedTheme } = useTheme()
  const originalLanguage = getLanguage(blockClassName)
  const language = languageOverride(originalLanguage)
  const shouldHighlightLine = calculateLinesToHighlight(highlight)
  const hasLineNumbers = withLineNumbers && language !== `withLineNumbers`

  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language as Language}
      theme={resolvedTheme === `light` ? lightTheme : darkTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className={codeBlockWrapper}>
          {(title || originalLanguage) && (
            <Box
              display="flex"
              flexDirection="row"
              gap="2"
              alignItems="center"
              justifyContent="flex-end"
              className={gatsbyHighlightHeaderStyle}
            >
              {title && <Box style={{ flexGrow: 1 }}>{title}</Box>}
              {originalLanguage && (
                <Box
                  display="inline-flex"
                  alignItems="center"
                  style={{ textTransform: `uppercase` }}
                  className={languageDisplayStyle}
                  data-lang={originalLanguage}
                >
                  {originalLanguage}
                </Box>
              )}
              <Copy content={codeString} fileName={title} />
            </Box>
          )}
          <div className={gatsbyHighlightStyle}>
            <pre className={composeClassNames(className, gatsbyHighlightPreStyle)} style={style}>
              <code className={composeClassNames(`language-${language}`, codeStyle)}>
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i })

                  lineProps.className = composeClassNames(lineProps.className, tokenLineStyle)

                  if (shouldHighlightLine(i)) {
                    lineProps.className = composeClassNames(lineProps.className, highlightLineStyle)
                  }

                  return (
                    <div {...lineProps}>
                      {hasLineNumbers && <span className={lineNumberStyle}>{i + 1}</span>}
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
