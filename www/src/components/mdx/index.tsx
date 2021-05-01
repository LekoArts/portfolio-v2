import * as React from "react"
import { headings } from "./heading"
import { Code } from "./code"
import { Alert } from "./alert"
import { preToCodeBlock } from "../../utils/code"

export const components = {
  pre: (preProps) => {
    const props = preToCodeBlock(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />
  },
  Alert,
  wrapper: ({ children }) => <>{children}</>,
  ...headings,
}
