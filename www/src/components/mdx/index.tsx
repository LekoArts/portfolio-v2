import * as React from "react"
import type { Components } from "@mdx-js/react/lib/index"
import { headings } from "./heading"
import { Code } from "./code"
import { Alert } from "./alert"
import { Collapsible } from "./collapsible"
import { Video } from "./video"
import { YouTube } from "./youtube"
import { Playground } from "./playground"
import { preToCodeBlock } from "../../utils/code"

// @ts-ignore
export const components: Components = {
  pre: (preProps) => {
    // @ts-ignore
    const props = preToCodeBlock(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />
  },
  Alert,
  Collapsible,
  Video,
  YouTube,
  Playground,
  ...headings,
}
