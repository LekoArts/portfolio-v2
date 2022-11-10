import * as React from "react"
import { Box } from "../primitives"
import { detailsStyle, summaryStyle } from "./collapsible.css"

export const Collapsible: React.FC<React.PropsWithChildren<{ summary: React.ReactNode }>> = ({ summary, children }) => (
  <Box as="details" px={[`4`, null, `6`]} py={[`4`, null, `6`]} borderRadius="lg" className={detailsStyle}>
    <Box as="summary" className={summaryStyle}>
      {summary}
    </Box>
    {children}
  </Box>
)
