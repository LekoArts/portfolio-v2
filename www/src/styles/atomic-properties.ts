import { vars } from "./themes/contract.css"
import { zIndices } from "./tokens/z-indices"

const space = {
  ...vars.space,
  none: 0,
} as const

export const unresponsiveProperties = {
  overflow: [`hidden`, `scroll`, `visible`, `auto`],
  opacity: [0],
  zIndex: zIndices,
  cursor: [`default`, `pointer`],
  height: space,
  width: space,
} as const

export type UnresponsiveProperties = keyof typeof unresponsiveProperties

export const responsiveProperties = {
  display: {
    none: `none`,
    block: `block`,
    inline: `inline`,
    inlineBlock: `inline-block`,
    flex: `flex`,
  },
  position: [`relative`, `absolute`, `fixed`],
  fontSize: vars.fontSize,
  borderRadius: vars.radius,
  paddingTop: space,
  paddingBottom: space,
  paddingRight: space,
  paddingLeft: space,
  marginTop: space,
  marginBottom: space,
  marginRight: space,
  marginLeft: space,
  alignItems: {
    flexStart: `flex-start`,
    center: `center`,
    flexEnd: `flex-end`,
  },
  justifyContent: {
    flexStart: `flex-start`,
    center: `center`,
    flexEnd: `flex-end`,
    spaceBetween: `space-between`,
  },
  flexDirection: {
    row: `row`,
    rowReverse: `row-reverse`,
    column: `column`,
    columnReverse: `column-reverse`,
  },
  flexWrap: {
    wrap: `wrap`,
    nowrap: `nowrap`,
  },
  flexShrink: [0],
  flexGrow: [0, 1],
  textAlign: [`left`, `center`, `right`],
} as const

export type ResponsiveProperties = keyof typeof responsiveProperties
