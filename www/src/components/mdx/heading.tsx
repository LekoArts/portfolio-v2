import * as React from "react"
import { VisuallyHidden } from "../a11y/visually-hidden"
import { Box } from "../primitives/box"
import { anchorStyle, headingStyle, introductionStyle } from "./heading.css"

type HeadingProps = {
  id: string
  children: React.ReactNode
}

/* eslint-disable */
const heading =
  (Tag) =>
    ({ id, children }: HeadingProps) => {
      if (Tag === 'h2' && children === `Introduction`) {
        return (
          <VisuallyHidden>
            <Box as={Tag} id={id} className={introductionStyle}>{children}</Box>
          </VisuallyHidden>
        )
      }

      return (
        <Box as={Tag} id={id} position="relative" className={headingStyle}>
          <Box
            as="a"
            href={`#${id}`}
            aria-label={`${children} permalink`}
            display="inline-block"
            position="absolute"
            className={anchorStyle}
          >
            #
          </Box>
          {children}
        </Box>
      )
    }
/* eslint-enable */

export const headings = {
  h1: heading(`h1`),
  h2: heading(`h2`),
  h3: heading(`h3`),
  h4: heading(`h4`),
  h5: heading(`h5`),
  h6: heading(`h6`),
}
