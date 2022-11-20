import type { SandpackTheme } from "@codesandbox/sandpack-react"
import { nightOwl as prismNightOwl } from "../prism/nightOwl"
import { fonts } from "../fonts.css"

export const nightOwl: SandpackTheme = {
  colors: {
    surface1: prismNightOwl.plain.backgroundColor as string,
    surface2: `#243b4c`,
    surface3: `#112331`,
    clickable: `#6988a1`,
    base: `#808080`,
    disabled: `#4D4D4D`,
    hover: `#c5e4fd`,
    accent: `#c5e4fd`,
    error: `#ffcdca`,
    errorSurface: `#811e18`,
  },
  syntax: {
    plain: `#d6deeb`,
    comment: { color: `#999999`, fontStyle: `italic` },
    keyword: { color: `#c792ea`, fontStyle: `italic` },
    tag: `#7fdbca`,
    punctuation: `#7fdbca`,
    definition: `#82aaff`,
    property: { color: `#addb67`, fontStyle: `italic` },
    static: `#f78c6c`,
    string: `#ecc48d`,
  },
  font: {
    body: fonts.body,
    mono: fonts.mono,
    size: `0.875rem`,
    lineHeight: `1.4`,
  },
}
