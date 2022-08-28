import * as React from "react"
import { alertIconStyle, AlertStatus, alertTitleStyle, alertVariants } from "./alert.css"
import { Box } from "../primitives/box"
import { SVGIcon } from "../primitives/svg-icon"

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
    display="flex"
    flexDirection="column"
    alignItems="flex-start"
    borderRadius="lg"
    position="relative"
    my={[`6`, null, null, `12`]}
    px="4"
    py="3"
    width="auto"
    role="alert"
    className={alertVariants[status]}
  >
    <Box display="flex" flexDirection="row" alignItems="center" mb="4">
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
