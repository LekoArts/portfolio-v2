import * as React from "react"
import { IBoxProps, Box } from "./box"
import { motionBoxStyle } from "./motion-box.css"
import { composeClassNames } from "../../utils/box"

export const MotionBox: React.FC<React.PropsWithChildren<IBoxProps>> = ({ children, className, ...rest }) => (
  <Box className={composeClassNames(motionBoxStyle, className)} {...rest}>
    {children}
  </Box>
)
