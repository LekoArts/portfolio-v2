import * as React from "react"
import { createBox } from "../../utils/box"
import { atoms } from "../../styles/atoms.css"

export const Box = createBox({ atoms })

export interface IBoxProps extends React.ComponentPropsWithRef<typeof Box> {}
