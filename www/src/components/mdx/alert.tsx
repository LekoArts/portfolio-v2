import * as React from "react"
import { Alert as ChakraAlert, AlertTitle, AlertIcon, AlertStatus, Box } from "@chakra-ui/react"

export const Alert: React.FC<{ title: string; status: AlertStatus }> = ({ title, status, children }) => (
  <ChakraAlert
    status={status}
    flexDirection="column"
    alignItems="flex-start"
    borderRadius="lg"
    my={[6, null, null, 12]}
    mx={[0, null, null, -4]}
    width="auto"
  >
    <Box display="flex" flexDirection="row" alignItems="center" mb={4}>
      <AlertIcon boxSize={[`20px`, null, `30px`]} />
      <AlertTitle>{title}</AlertTitle>
    </Box>
    {children}
  </ChakraAlert>
)
