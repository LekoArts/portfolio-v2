import * as React from "react"
import { alertIconStyle, AlertStatus, alertTitleStyle, alertVariants } from "./alert.css"
import { Box, SVGIcon } from "../primitives"

interface IAlertProps {
  title: string
  status: AlertStatus
}

const iconMap = {
  info: `info`,
  warning: `warning`,
  success: `check`,
  error: `warning`,
} as const

export const Alert: React.FC<React.PropsWithChildren<IAlertProps>> = ({ title, status, children }) => (
  <Box
    borderRadius="lg"
    position="relative"
    my={[`6`, null, null, `12`]}
    px="4"
    py="3"
    width="auto"
    role="alert"
    data-testid={`alert-${status}`}
    className={alertVariants[status]}
  >
    <Box display="flex" flexDirection="row" alignItems="center" marginBottom="4">
      <Box className={alertIconStyle}>
        <SVGIcon id={iconMap[status]} />
      </Box>
      <Box fontWeight="bold" className={alertTitleStyle}>
        {title}
      </Box>
    </Box>
    {children}
  </Box>
)
