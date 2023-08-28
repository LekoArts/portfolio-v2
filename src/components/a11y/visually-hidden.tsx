import * as React from "react"
import { visuallyHiddenStyle } from "./visually-hidden.css"

export const VisuallyHidden: React.FC<React.PropsWithChildren> = ({ children, ...rest }) => (
  <span className={visuallyHiddenStyle} {...rest}>
    {children}
  </span>
)
