import * as React from "react"
import { VisuallyHidden } from "../a11y/visually-hidden"
import { Box } from "../primitives"
import { copyToClipboard } from "../../utils/copy-to-clipboard"
import { copyButtonStyle } from "./copy.css"

// eslint-disable-next-line no-promise-executor-return
const delay = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration))

type CopyProps = {
  content: string
  duration?: number
  fileName?: string
  trim?: boolean
}

export const Copy = ({ content, duration = 5000, fileName = ``, trim = false }: CopyProps) => {
  const [copied, setCopied] = React.useState(false)

  const label = copied
    ? `${fileName ? `${fileName} ` : ``}copied to clipboard`
    : `${fileName ? `${fileName}: ` : ``}copy code to clipboard`

  return (
    <Box
      as="button"
      name={label}
      disabled={copied}
      onClick={async () => {
        await copyToClipboard(trim ? content.trim() : content)
        setCopied(true)
        await delay(duration)
        setCopied(false)
      }}
      px="2"
      borderRadius="md"
      className={copyButtonStyle}
    >
      {copied ? `Copied` : `Copy`}
      <VisuallyHidden aria-roledescription="status">{label}</VisuallyHidden>
    </Box>
  )
}
