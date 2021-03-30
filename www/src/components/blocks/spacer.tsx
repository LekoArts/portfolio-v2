import * as React from "react"
import { Box, BoxProps } from "@chakra-ui/react"

interface ISpacerProps extends BoxProps {
  size: BoxProps["width"]
  axis: "vertical" | "horizontal"
}

export const Spacer = ({ size, axis, ...rest }: ISpacerProps) => {
  const width = axis === `vertical` ? `1px` : size
  const height = axis === `horizontal` ? `1px` : size
  return <Box as="span" width={width} height={height} minWidth={width} minHeight={height} display="block" {...rest} />
}
