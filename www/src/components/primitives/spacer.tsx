import * as React from "react"
import { Atoms } from "../../styles/atoms.css"
import { Space } from "../../styles/tokens/space"
import { Box } from "../primitives/box"

interface ISpacerProps extends Atoms {
  size: Space
  axis: "vertical" | "horizontal"
}

export const Spacer = ({ size, axis, ...rest }: ISpacerProps) => {
  const width = axis === `vertical` ? `px` : size
  const height = axis === `horizontal` ? `px` : size
  return <Box as="span" width={width} height={height} minWidth={width} minHeight={height} display="block" {...rest} />
}
