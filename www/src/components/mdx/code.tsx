import * as React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import { useTheme } from "themes-utils"
import { nightOwlLight } from "../../styles/prism/nightOwlLight"
import { nightOwl } from "../../styles/prism/nightOwl"
import { themeWithCssVariables } from "../../styles/prism/prism-utils"
import { Box } from "../primitives"
import { calculateLinesToHighlight, getLanguage, GetLanguageInput, languageOverride } from "../../utils/code"
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

const { theme: lightTheme } = themeWithCssVariables(nightOwlLight)
const { theme: darkTheme } = themeWithCssVariables(nightOwl)

type CodeProps = {
  codeString: string
  withLineNumbers?: boolean
  highlight?: string
  title?: string
  className: GetLanguageInput
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

  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      // @ts-ignore
      language={language}
      theme={resolvedTheme === `light` ? lightTheme : darkTheme}
    >
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <div className={codeBlockWrapper} data-testid="code-wrapper">
          {(title || originalLanguage) && (
            <Box
              display="flex"
              flexDirection="row"
              gap="2"
              alignItems="center"
              justifyContent="flex-end"
              className={gatsbyHighlightHeaderStyle}
              data-testid="code-header"
            >
              {title && (
                <Box style={{ flexGrow: 1 }} data-testid="code-title">
                  {title}
                </Box>
              )}
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
            <pre className={composeClassNames(className, gatsbyHighlightPreStyle)}>
              <code className={composeClassNames(`language-${language}`, codeStyle)}>
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i })

                  lineProps.className = composeClassNames(lineProps.className, tokenLineStyle)

                  if (shouldHighlightLine(i)) {
                    lineProps.className = composeClassNames(lineProps.className, highlightLineStyle)
                  }

                  return (
                    <div {...lineProps}>
                      {withLineNumbers && <span className={lineNumberStyle}>{i + 1}</span>}
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
