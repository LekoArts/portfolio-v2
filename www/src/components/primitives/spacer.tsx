import * as React from "react"
import { Box } from "./box"
import { Atoms } from "../../styles/atoms.css"

interface ISpacerProps extends Atoms {
  size: Atoms["width"]
  axis: "vertical" | "horizontal"
}

export const Spacer = ({ size, axis, ...rest }: ISpacerProps) => {
  const width = axis === `vertical` ? `px` : size
  const height = axis === `horizontal` ? `px` : size
  return <Box as="span" width={width} height={height} minWidth={width} minHeight={height} display="block" {...rest} />
}
