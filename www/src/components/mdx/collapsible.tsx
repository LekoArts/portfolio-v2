import * as React from "react"
import { Box } from "../primitives/box"
import { detailsStyle, summaryStyle } from "./collapsible.css"

export const Collapsible: React.FC<React.PropsWithChildren<{ summary: React.ReactNode }>> = ({ summary, children }) => (
  <Box as="details" py="4" borderRadius="lg" className={detailsStyle}>
    <Box as="summary" className={summaryStyle}>
      {summary}
    </Box>
    {children}
  </Box>
)
