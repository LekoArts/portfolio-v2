import * as React from "react"
import { skipNavLinkStyle } from "./skip-nav.css"

const defaultId = `skip-to-content`

export const SkipNavLink: React.FC<React.PropsWithChildren<{ contentId?: string }>> = ({
  children = `Skip to content`,
  contentId,
  ...props
}) => {
  const id = contentId || defaultId

  return (
    <a {...props} className={skipNavLinkStyle} href={`#${id}`}>
      {children}
    </a>
  )
}

/**
 * Wrap the main content of a page with this, thus also the <main> tag
 */
export const SkipNavContent: React.FC<React.PropsWithChildren<{ id?: string }>> = ({
  children,
  id: idProp,
  ...props
}) => {
  const id = idProp || defaultId

  return (
    <main {...props} id={id}>
      {children}
    </main>
  )
}
