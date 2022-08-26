import { vars } from "./themes/contract.css"
import { zIndices } from "./tokens/z-indices"

export const unresponsiveProperties = {
  overflow: [`hidden`, `scroll`, `visible`, `auto`],
  opacity: [0],
  zIndex: zIndices,
  cursor: [`default`, `pointer`],
  position: [`relative`, `absolute`],
  fontWeight: vars.fontWeight,
  border: [`none`],
} as const

export type UnresponsiveProperties = keyof typeof unresponsiveProperties

export const responsiveProperties = {
  display: [`block`, `inline-block`, `flex`, `inline-flex`, `none`, `grid`],
  fontSize: vars.fontSize,
  borderRadius: vars.radius,
  paddingTop: vars.space,
  paddingBottom: vars.space,
  paddingRight: vars.space,
  paddingLeft: vars.space,
  marginTop: vars.space,
  marginBottom: vars.space,
  marginRight: vars.space,
  marginLeft: vars.space,
  alignItems: [`flex-start`, `flex-end`, `center`],
  justifyContent: [`flex-start`, `flex-end`, `center`, `space-between`],
  flexDirection: [`row`, `column`, `row-reverse`, `column-reverse`],
  flexWrap: [`wrap`, `nowrap`],
  gridGap: vars.space,
  flexShrink: [0],
  flexGrow: [0, 1],
  textAlign: [`left`, `center`, `right`],
  height: vars.space,
  width: vars.space,
  minWidth: vars.space,
  minHeight: vars.space,
} as const

export type ResponsiveProperties = keyof typeof responsiveProperties
