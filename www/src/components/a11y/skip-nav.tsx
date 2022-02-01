import * as React from "react"
import { chakra } from "@chakra-ui/react"

const defaultId = `skip-to-content`

const SkipNavLink: React.FC<{ contentId?: string }> = ({ children = `Skip to content`, contentId, ...props }) => {
  const id = contentId || defaultId

  return (
    <chakra.a
      {...props}
      border={0}
      height="1px"
      width="1px"
      margin="-1px"
      padding={0}
      overflow="hidden"
      position="absolute"
      _focus={{
        padding: `1rem`,
        position: `fixed`,
        top: `10px`,
        left: `10px`,
        background: `bg`,
        zIndex: `skipLink`,
        width: `auto`,
        height: `auto`,
      }}
      href={`#${id}`}
      data-skip-to-content
    >
      {children}
    </chakra.a>
  )
}

/**
 * Wrap the main content of a page with this, thus also the <main> tag
 */
const SkipNavContent: React.FC<{ id?: string }> = ({ children, id: idProp, ...props }) => {
  const id = idProp || defaultId

  return (
    <main {...props} id={id}>
      {children}
    </main>
  )
}

export { SkipNavLink, SkipNavContent }
