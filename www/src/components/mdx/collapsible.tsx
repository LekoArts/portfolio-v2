import * as React from "react"
import { Box, useColorModeValue } from "@chakra-ui/react"

export const Collapsible: React.FC<{ summary: React.ReactNode }> = ({ summary, children }) => {
  const bgColor = useColorModeValue(`blue.50`, `blueGray.800`)

  return (
    <Box as="details" bgColor={bgColor} px={[4, null, 6]} py={4} borderRadius="lg">
      <Box
        as="summary"
        display="list-item"
        textStyle="prominent"
        cursor="pointer"
        sx={{ ">:first-of-type": { display: `inline` } }}
      >
        {summary}
      </Box>
      {children}
    </Box>
  )
}
