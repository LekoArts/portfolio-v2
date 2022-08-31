import { style } from "@vanilla-extract/css"
import { vars } from "../../styles/themes/contract.css"

export type ProseVariants = "default" | "sm" | "md" | "lg" | "xl"

const proseBaseStyle = style({
  color: vars.color.textProse,
})
