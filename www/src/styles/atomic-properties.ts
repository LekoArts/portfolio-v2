import { vars } from "./themes/contract.css"
import { zIndices } from "./tokens/z-indices"

export const unresponsiveProperties = {
  position: [`relative`, `absolute`, `sticky`],
  overflow: [`hidden`, `scroll`, `visible`, `auto`],
  opacity: [0],
  zIndex: zIndices,
  cursor: [`default`, `pointer`, `not-allowed`],
  fontWeight: vars.fontWeight,
  border: [`none`],
  paddingTop: vars.space,
  paddingBottom: vars.space,
  paddingRight: vars.space,
  paddingLeft: vars.space,
  borderRadius: vars.borderRadius,
  textAlign: [`left`, `center`, `right`],
} as const

export type UnresponsiveProperties = keyof typeof unresponsiveProperties

export const responsiveProperties = {
  display: [`block`, `inline-block`, `flex`, `inline-flex`, `none`],
  fontSize: vars.fontSize,
  marginTop: vars.space,
  marginBottom: vars.space,
  marginRight: vars.space,
  marginLeft: vars.space,
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
