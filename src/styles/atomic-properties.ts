import { vars } from "./themes/contract.css"
import { zIndices } from "./tokens/z-indices"

export const unresponsiveProperties = {
  position: [`relative`, `absolute`, `sticky`],
  opacity: [0, 0.1, 0.5, 1],
  zIndex: zIndices,
  fontWeight: vars.fontWeight,
  border: [`none`],
  gap: vars.space,
  borderRadius: vars.borderRadius,
  textAlign: [`left`, `center`, `right`],
} as const

export type UnresponsiveProperties = keyof typeof unresponsiveProperties

export const responsiveProperties = {
  display: [`block`, `inline-block`, `flex`, `inline-flex`],
  fontSize: vars.fontSize,
  marginTop: vars.space,
  marginBottom: vars.space,
  marginRight: vars.space,
  marginLeft: vars.space,
  paddingTop: vars.space,
  paddingBottom: vars.space,
  paddingRight: vars.space,
  paddingLeft: vars.space,
  alignItems: [`flex-start`, `flex-end`, `center`],
  justifyContent: [`flex-start`, `flex-end`, `center`, `space-between`],
  flexDirection: [`row`, `column`, `row-reverse`, `column-reverse`],
  flexWrap: [`wrap`, `nowrap`],
  height: vars.space,
  width: vars.space,
  minWidth: vars.space,
  minHeight: vars.space,
} as const

export type ResponsiveProperties = keyof typeof responsiveProperties
