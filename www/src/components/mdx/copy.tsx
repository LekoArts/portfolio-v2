import * as React from "react"
import { VisuallyHidden, Box } from "@chakra-ui/react"
import { copyToClipboard } from "../../utils/copy-to-clipboard"

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
      type="button"
      name={label}
      disabled={copied}
      onClick={async () => {
        await copyToClipboard(trim ? content.trim() : content)
        setCopied(true)
        await delay(duration)
        setCopied(false)
      }}
      transition="all 0.3s ease-in-out"
      border="1px solid transparent"
      px={2}
      borderRadius="6px"
      _hover={{
        border: `1px solid currentColor`,
      }}
      _disabled={{
        opacity: 0.5,
        cursor: `not-allowed`,
      }}
    >
      {copied ? `Copied` : `Copy`}
      <VisuallyHidden as="span" aria-roledescription="status">
        {label}
      </VisuallyHidden>
    </Box>
  )
}
