import * as React from "react"
import { Box } from "@chakra-ui/react"

type HeadingProps = {
  id: string
  children: React.ReactNode
}

/* eslint-disable */
const heading =
  (Tag) =>
    ({ id, children }: HeadingProps) =>
    (
      <Box as={Tag} id={id} position="relative" _hover={{ a: { visibility: `visible` } }}>
        <Box
          as="a"
          href={`#${id}`}
          aria-label={`${children} permalink`}
          display="inline-block"
          position="absolute"
          left={-10}
          fontFamily="body"
          transition="all 0.3s ease-in-out"
          visibility="hidden"
          sx={{
            textDecoration: `none !important`,
            opacity: 0.3,
          }}
          _hover={{
            opacity: 1,
          }}
        >
          #
        </Box>
        {children}
      </Box>
    )
/* eslint-enable */

export const headings = {
  h1: heading(`h1`),
  h2: heading(`h2`),
  h3: heading(`h3`),
  h4: heading(`h4`),
  h5: heading(`h5`),
  h6: heading(`h6`),
}
