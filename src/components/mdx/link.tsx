import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { isInternalUrl } from "../../utils/is-internal-url"
import { VisuallyHidden } from "../a11y/visually-hidden"

/**
 * Use Gatsby's link component for internal links.
 * Set target="_blank" for external links and add data attribute for CSS styling.
 */
export const MarkdownLink = ({ href, children, ...rest }) => {
  // If URL is a hash link, use anchor tag
  if (href.startsWith(`#`)) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }

  // If internal, use Gatsby's link component
  if (isInternalUrl(href)) {
    return (
      <GatsbyLink data-link-internal to={href} {...rest}>
        {children}
      </GatsbyLink>
    )
  }

  // If URL is a protocol like mailto or tel, use anchor tag
  if (!href.startsWith(`http`)) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }

  // At this point the link can only be external, style as such
  return (
    <a data-link-external target="_blank" rel="noopener noreferrer" href={href} {...rest}>
      {children}
      <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
    </a>
  )
}
