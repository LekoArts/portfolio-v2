import { transparentize } from "utils"
import { vars } from "../../styles/themes/contract.css"
import { rem, round, em } from "../../utils/css"
import { fonts } from "../../styles/fonts.css"
import { colorPalette } from "../../styles/tokens/colors"
import type { SelectorMap } from "../../utils/vanilla-extract"

const nullHelper = null as unknown as string

export const proseRootMobile = {
  fontSize: rem(14),
  lineHeight: round(24 / 14),
}

export const proseRootMd = {
  fontSize: rem(16),
  lineHeight: round(28 / 16),
}

export const proseRootLg = {
  fontSize: rem(18),
  lineHeight: round(32 / 18),
}

export const proseRootXl = {
  fontSize: rem(20),
  lineHeight: round(36 / 20),
}

export const proseSmVariant = {
  p: {
    marginTop: em(16, 14),
    marginBottom: em(16, 14),
  },
  blockquote: {
    marginTop: em(24, 18),
    marginBottom: em(24, 18),
    paddingLeft: em(20, 18),
  },
  h1: {
    fontSize: em(34, 14), // Changed from 30
    marginTop: vars.space[0],
    marginBottom: em(24, 30),
    lineHeight: round(36 / 30),
  },
  h2: {
    fontSize: em(24, 14), // Changed from 20
    marginTop: em(32, 20),
    marginBottom: em(16, 20),
    lineHeight: round(28 / 20),
  },
  h3: {
    fontSize: em(21, 14), // Changed from 18
    marginTop: em(28, 18),
    marginBottom: em(8, 18),
    lineHeight: round(28 / 18),
  },
  h4: {
    fontSize: em(18, 14),
    marginTop: em(26, 14),
    marginBottom: em(8, 14),
    lineHeight: round(20 / 14),
  },
  img: {
    marginTop: em(24, 14),
    marginBottom: em(24, 14),
  },
  video: {
    marginTop: em(24, 14),
    marginBottom: em(24, 14),
  },
  figure: {
    marginTop: em(24, 14),
    marginBottom: em(24, 14),
  },
  "figure > *": {
    marginTop: vars.space[0],
    marginBottom: vars.space[0],
  },
  "figure figcaption": {
    fontSize: em(12, 14),
    lineHeight: round(16 / 12),
    marginTop: em(8, 12),
  },
  code: {
    fontSize: em(12, 14),
  },
  "h2 code": {
    fontSize: em(18, 20),
  },
  "h3 code": {
    fontSize: em(16, 18),
  },
  pre: {
    fontSize: em(12, 14),
    lineHeight: round(20 / 12),
    marginTop: em(20, 12),
    marginBottom: em(20, 12),
    borderRadius: rem(4),
    paddingTop: em(8, 12),
    paddingRight: em(12, 12),
    paddingBottom: em(8, 12),
    paddingLeft: em(12, 12),
    marginLeft: nullHelper,
    marginRight: nullHelper,
  },
  ol: {
    marginTop: em(16, 14),
    marginBottom: em(16, 14),
  },
  ul: {
    marginTop: em(16, 14),
    marginBottom: em(16, 14),
  },
  li: {
    marginTop: em(4, 14),
    marginBottom: em(4, 14),
  },
  "ol > li": {
    paddingLeft: em(22, 14),
  },
  "ol > li::before": {
    left: vars.space[0],
  },
  "ul > li": {
    paddingLeft: em(22, 14),
  },
  "ul > li::before": {
    height: em(5, 14),
    width: em(5, 14),
    top: `calc(${em(24 / 2, 14)} - ${em(2.5, 14)})`,
    left: em(3, 14),
  },
  "> ul > li p": {
    marginTop: em(8, 14),
    marginBottom: em(8, 14),
  },
  "> ul > li > *:first-of-type": {
    marginTop: em(16, 14),
  },
  "> ul > li > *:last-of-type": {
    marginBottom: em(16, 14),
  },
  "> ol > li > *:first-of-type": {
    marginTop: em(16, 14),
  },
  "> ol > li > *:last-of-type": {
    marginBottom: em(16, 14),
  },
  "ul ul, ul ol, ol ul, ol ol": {
    marginTop: em(8, 14),
    marginBottom: em(8, 14),
  },
  hr: {
    marginTop: em(40, 14),
    marginBottom: em(40, 14),
  },
  "hr + *": {
    marginTop: vars.space[0],
  },
  "h2 + *": {
    marginTop: vars.space[0],
  },
  "h3 + *": {
    marginTop: vars.space[0],
  },
  "h4 + *": {
    marginTop: vars.space[0],
  },
  table: {
    fontSize: em(12, 14),
    lineHeight: round(18 / 12),
  },
  "thead th": {
    paddingRight: em(12, 12),
    paddingBottom: em(8, 12),
    paddingLeft: em(12, 12),
  },
  "thead th:first-of-type": {
    paddingLeft: vars.space[0] as string,
  },
  "thead th:last-of-type": {
    paddingRight: vars.space[0] as string,
  },
  "tbody td": {
    paddingTop: em(8, 12),
    paddingRight: em(12, 12),
    paddingBottom: em(8, 12),
    paddingLeft: em(12, 12),
  },
  "tbody td:first-of-type": {
    paddingLeft: vars.space[0] as string,
  },
  "tbody td:last-of-type": {
    paddingRight: vars.space[0] as string,
  },
}

export const proseMdVariant: typeof proseSmVariant = {
  p: {
    marginTop: em(20, 16),
    marginBottom: em(20, 16),
  },
  blockquote: {
    marginTop: em(32, 20),
    marginBottom: em(32, 20),
    paddingLeft: em(20, 20),
  },
  h1: {
    fontSize: em(40, 16), // Changed from 36
    marginTop: vars.space[0],
    marginBottom: em(32, 36),
    lineHeight: round(40 / 36),
  },
  h2: {
    fontSize: em(28, 16), // Changed from 24
    marginTop: em(48, 24),
    marginBottom: em(24, 24),
    lineHeight: round(32 / 24),
  },
  h3: {
    fontSize: em(24, 16), // Changed from 20
    marginTop: em(32, 20),
    marginBottom: em(12, 20),
    lineHeight: round(32 / 20),
  },
  h4: {
    fontSize: em(20, 16),
    marginTop: em(24, 16),
    marginBottom: em(8, 16),
    lineHeight: round(24 / 16),
  },
  img: {
    marginTop: em(32, 16),
    marginBottom: em(32, 16),
  },
  video: {
    marginTop: em(32, 16),
    marginBottom: em(32, 16),
  },
  figure: {
    marginTop: em(32, 16),
    marginBottom: em(32, 16),
  },
  "figure > *": {
    marginTop: vars.space[0],
    marginBottom: vars.space[0],
  },
  "figure figcaption": {
    fontSize: em(14, 16),
    lineHeight: round(20 / 14),
    marginTop: em(12, 14),
  },
  code: {
    fontSize: em(14, 16),
  },
  "h2 code": {
    fontSize: em(21, 24),
  },
  "h3 code": {
    fontSize: em(18, 20),
  },
  pre: {
    fontSize: em(14, 16),
    lineHeight: round(24 / 14),
    marginTop: em(24, 14),
    marginBottom: em(24, 14),
    borderRadius: rem(6),
    paddingTop: em(12, 14),
    paddingRight: em(16, 14),
    paddingBottom: em(12, 14),
    paddingLeft: em(16, 14),
    marginLeft: nullHelper,
    marginRight: nullHelper,
  },
  ol: {
    marginTop: em(20, 16),
    marginBottom: em(20, 16),
  },
  ul: {
    marginTop: em(20, 16),
    marginBottom: em(20, 16),
  },
  li: {
    marginTop: em(8, 16),
    marginBottom: em(8, 16),
  },
  "ol > li": {
    paddingLeft: em(28, 16),
  },
  "ol > li::before": {
    left: vars.space[0],
  },
  "ul > li": {
    paddingLeft: em(28, 16),
  },
  "ul > li::before": {
    width: em(6, 16),
    height: em(6, 16),
    top: `calc(${em(28 / 2, 16)} - ${em(3, 16)})`,
    left: em(4, 16),
  },
  "> ul > li p": {
    marginTop: em(12, 16),
    marginBottom: em(12, 16),
  },
  "> ul > li > *:first-of-type": {
    marginTop: em(20, 16),
  },
  "> ul > li > *:last-of-type": {
    marginBottom: em(20, 16),
  },
  "> ol > li > *:first-of-type": {
    marginTop: em(20, 16),
  },
  "> ol > li > *:last-of-type": {
    marginBottom: em(20, 16),
  },
  "ul ul, ul ol, ol ul, ol ol": {
    marginTop: em(12, 16),
    marginBottom: em(12, 16),
  },
  hr: {
    marginTop: em(48, 16),
    marginBottom: em(48, 16),
  },
  "hr + *": {
    marginTop: vars.space[0],
  },
  "h2 + *": {
    marginTop: vars.space[0],
  },
  "h3 + *": {
    marginTop: vars.space[0],
  },
  "h4 + *": {
    marginTop: vars.space[0],
  },
  table: {
    fontSize: em(14, 16),
    lineHeight: round(24 / 14),
  },
  "thead th": {
    paddingRight: em(8, 14),
    paddingBottom: em(8, 14),
    paddingLeft: em(8, 14),
  },
  "thead th:first-of-type": {
    paddingLeft: nullHelper,
  },
  "thead th:last-of-type": {
    paddingRight: nullHelper,
  },
  "tbody td": {
    paddingTop: em(8, 14),
    paddingRight: em(8, 14),
    paddingBottom: em(8, 14),
    paddingLeft: em(8, 14),
  },
  "tbody td:first-of-type": {
    paddingLeft: nullHelper,
  },
  "tbody td:last-of-type": {
    paddingRight: nullHelper,
  },
}

export const proseLgVariant: typeof proseSmVariant = {
  p: {
    marginTop: em(24, 18),
    marginBottom: em(24, 18),
  },
  blockquote: {
    marginTop: em(40, 24),
    marginBottom: em(40, 24),
    paddingLeft: em(24, 24),
  },
  h1: {
    fontSize: em(54, 18), // Changed from 48
    marginTop: vars.space[0],
    marginBottom: em(40, 48),
    lineHeight: round(48 / 48),
  },
  h2: {
    fontSize: em(36, 18), // Changed from 30
    marginTop: em(56, 30),
    marginBottom: em(32, 30),
    lineHeight: round(40 / 30),
  },
  h3: {
    fontSize: em(28, 18), // Changed from 24
    marginTop: em(40, 24),
    marginBottom: em(16, 24),
    lineHeight: round(36 / 24),
  },
  h4: {
    fontSize: em(22, 18),
    marginTop: em(32, 18),
    marginBottom: em(8, 18),
    lineHeight: round(28 / 18),
  },
  img: {
    marginTop: em(32, 18),
    marginBottom: em(32, 18),
  },
  video: {
    marginTop: em(32, 18),
    marginBottom: em(32, 18),
  },
  figure: {
    marginTop: em(32, 18),
    marginBottom: em(32, 18),
  },
  "figure > *": {
    marginTop: vars.space[0],
    marginBottom: vars.space[0],
  },
  "figure figcaption": {
    fontSize: em(16, 18),
    lineHeight: round(24 / 16),
    marginTop: em(16, 16),
  },
  code: {
    fontSize: em(16, 18),
  },
  "h2 code": {
    fontSize: em(26, 30),
  },
  "h3 code": {
    fontSize: em(21, 24),
  },
  pre: {
    fontSize: em(16, 18),
    lineHeight: round(28 / 16),
    marginTop: em(32, 16),
    marginBottom: em(32, 16),
    borderRadius: rem(6),
    paddingTop: em(16, 16),
    paddingRight: em(24, 16),
    paddingBottom: em(16, 16),
    paddingLeft: em(24, 16),
    marginLeft: `-${em(24, 16)}`,
    marginRight: `-${em(24, 16)}`,
  },
  ol: {
    marginTop: em(24, 18),
    marginBottom: em(24, 18),
  },
  ul: {
    marginTop: em(24, 18),
    marginBottom: em(24, 18),
  },
  li: {
    marginTop: em(12, 18),
    marginBottom: em(12, 18),
  },
  "ol > li": {
    paddingLeft: em(30, 18),
  },
  "ol > li::before": {
    left: vars.space[0],
  },
  "ul > li": {
    paddingLeft: em(30, 18),
  },
  "ul > li::before": {
    width: em(6, 18),
    height: em(6, 18),
    top: `calc(${em(32 / 2, 18)} - ${em(3, 18)})`,
    left: em(4, 18),
  },
  "> ul > li p": {
    marginTop: em(16, 18),
    marginBottom: em(16, 18),
  },
  "> ul > li > *:first-of-type": {
    marginTop: em(24, 18),
  },
  "> ul > li > *:last-of-type": {
    marginBottom: em(24, 18),
  },
  "> ol > li > *:first-of-type": {
    marginTop: em(24, 18),
  },
  "> ol > li > *:last-of-type": {
    marginBottom: em(24, 18),
  },
  "ul ul, ul ol, ol ul, ol ol": {
    marginTop: em(16, 18),
    marginBottom: em(16, 18),
  },
  hr: {
    marginTop: em(56, 18),
    marginBottom: em(56, 18),
  },
  "hr + *": {
    marginTop: vars.space[0],
  },
  "h2 + *": {
    marginTop: vars.space[0],
  },
  "h3 + *": {
    marginTop: vars.space[0],
  },
  "h4 + *": {
    marginTop: vars.space[0],
  },
  table: {
    fontSize: em(16, 18),
    lineHeight: round(24 / 16),
  },
  "thead th": {
    paddingRight: em(12, 16),
    paddingBottom: em(12, 16),
    paddingLeft: em(12, 16),
  },
  "thead th:first-of-type": {
    paddingLeft: vars.space[0],
  },
  "thead th:last-of-type": {
    paddingRight: vars.space[0],
  },
  "tbody td": {
    paddingTop: em(12, 16),
    paddingRight: em(12, 16),
    paddingBottom: em(12, 16),
    paddingLeft: em(12, 16),
  },
  "tbody td:first-of-type": {
    paddingLeft: vars.space[0],
  },
  "tbody td:last-of-type": {
    paddingRight: vars.space[0],
  },
}

export const proseXlVariant: typeof proseSmVariant = {
  p: {
    marginTop: em(24, 20),
    marginBottom: em(24, 20),
  },
  blockquote: {
    marginTop: em(48, 30),
    marginBottom: em(48, 30),
    paddingLeft: em(32, 30),
  },
  h1: {
    fontSize: em(64, 20), // Changed from 56
    marginTop: vars.space[0],
    marginBottom: em(48, 56),
    lineHeight: round(56 / 56),
  },
  h2: {
    fontSize: em(42, 20), // Changed from 36
    marginTop: em(56, 36),
    marginBottom: em(32, 36),
    lineHeight: round(40 / 36),
  },
  h3: {
    fontSize: em(34, 20), // Changed from 30
    marginTop: em(48, 30),
    marginBottom: em(20, 30),
    lineHeight: round(40 / 30),
  },
  h4: {
    fontSize: em(28, 20),
    marginTop: em(36, 20),
    marginBottom: em(12, 20),
    lineHeight: round(32 / 20),
  },
  img: {
    marginTop: em(40, 20),
    marginBottom: em(40, 20),
  },
  video: {
    marginTop: em(40, 20),
    marginBottom: em(40, 20),
  },
  figure: {
    marginTop: em(40, 20),
    marginBottom: em(40, 20),
  },
  "figure > *": {
    marginTop: vars.space[0],
    marginBottom: vars.space[0],
  },
  "figure figcaption": {
    fontSize: em(18, 20),
    lineHeight: round(28 / 18),
    marginTop: em(18, 18),
  },
  code: {
    fontSize: em(18, 20),
  },
  "h2 code": {
    fontSize: em(31, 36),
  },
  "h3 code": {
    fontSize: em(27, 30),
  },
  pre: {
    fontSize: em(18, 20),
    lineHeight: round(32 / 18),
    marginTop: em(36, 18),
    marginBottom: em(36, 18),
    borderRadius: rem(8),
    paddingTop: em(20, 18),
    paddingRight: em(24, 18),
    paddingBottom: em(20, 18),
    paddingLeft: em(24, 18),
    marginLeft: `-${em(24, 18)}`,
    marginRight: `-${em(24, 18)}`,
  },
  ol: {
    marginTop: em(24, 20),
    marginBottom: em(24, 20),
  },
  ul: {
    marginTop: em(24, 20),
    marginBottom: em(24, 20),
  },
  li: {
    marginTop: em(12, 20),
    marginBottom: em(12, 20),
  },
  "ol > li": {
    paddingLeft: em(36, 20),
  },
  "ol > li::before": {
    left: vars.space[0],
  },
  "ul > li": {
    paddingLeft: em(36, 20),
  },
  "ul > li::before": {
    width: em(7, 20),
    height: em(7, 20),
    top: `calc(${em(36 / 2, 20)} - ${em(3.5, 20)})`,
    left: em(5, 20),
  },
  "> ul > li p": {
    marginTop: em(16, 20),
    marginBottom: em(16, 20),
  },
  "> ul > li > *:first-of-type": {
    marginTop: em(24, 20),
  },
  "> ul > li > *:last-of-type": {
    marginBottom: em(24, 20),
  },
  "> ol > li > *:first-of-type": {
    marginTop: em(24, 20),
  },
  "> ol > li > *:last-of-type": {
    marginBottom: em(24, 20),
  },
  "ul ul, ul ol, ol ul, ol ol": {
    marginTop: em(16, 20),
    marginBottom: em(16, 20),
  },
  hr: {
    marginTop: em(56, 20),
    marginBottom: em(56, 20),
  },
  "hr + *": {
    marginTop: vars.space[0],
  },
  "h2 + *": {
    marginTop: vars.space[0],
  },
  "h3 + *": {
    marginTop: vars.space[0],
  },
  "h4 + *": {
    marginTop: vars.space[0],
  },
  table: {
    fontSize: em(18, 20),
    lineHeight: round(28 / 18),
  },
  "thead th": {
    paddingRight: em(12, 18),
    paddingBottom: em(16, 18),
    paddingLeft: em(12, 18),
  },
  "thead th:first-of-type": {
    paddingLeft: vars.space[0],
  },
  "thead th:last-of-type": {
    paddingRight: vars.space[0],
  },
  "tbody td": {
    paddingTop: em(16, 18),
    paddingRight: em(12, 18),
    paddingBottom: em(16, 18),
    paddingLeft: em(12, 18),
  },
  "tbody td:first-of-type": {
    paddingLeft: vars.space[0],
  },
  "tbody td:last-of-type": {
    paddingRight: vars.space[0],
  },
}

export const proseBaseStyle: SelectorMap = {
  a: {
    color: vars.color.proseLink,
    fontWeight: vars.fontWeight.medium,
    textDecoration: `underline`,
    textDecorationColor: vars.color.proseLinkDecoration,
  },
  "a:hover": {
    textDecoration: `none`,
  },
  strong: {
    color: {
      light: colorPalette.gray[900],
      dark: colorPalette.gray[100],
    },
    fontWeight: vars.fontWeight.semibold,
  },
  em: {
    fontWeight: vars.fontWeight.medium,
    color: vars.color.textEmphasized,
    fontStyle: `normal`,
  },
  "figure img": {
    borderRadius: vars.borderRadius.lg,
  },
  img: {
    borderRadius: vars.borderRadius.lg,
  },
  blockquote: {
    fontWeight: vars.fontWeight.medium,
    fontStyle: `italic`,
    color: {
      light: colorPalette.gray[900],
      dark: colorPalette.gray[100],
    },
    borderLeftWidth: vars.space[1],
    borderLeftColor: {
      light: colorPalette.gray[200],
      dark: colorPalette.gray[600],
    },
    quotes: `"\\201C""\\201D""\\2018""\\2019"`,
  },
  "blockquote p:first-of-type::before": {
    content: `open-quote`,
  },
  "blockquote p:last-of-type::after": {
    content: `close-quote`,
  },
  h1: {
    color: vars.color.heading,
    fontWeight: vars.fontWeight.bold,
    fontFamily: fonts.heading,
    letterSpacing: vars.letterSpacing.wide,
  },
  h2: {
    color: vars.color.heading,
    fontWeight: vars.fontWeight.bold,
    fontFamily: fonts.heading,
  },
  h3: {
    color: vars.color.heading,
    fontWeight: vars.fontWeight.semibold,
    fontFamily: fonts.heading,
  },
  h4: {
    color: vars.color.heading,
    fontWeight: vars.fontWeight.semibold,
    fontFamily: fonts.heading,
  },
  "figure figcaption": {
    color: {
      light: colorPalette.gray[500],
      dark: colorPalette.gray[400],
    },
    textAlign: `center`,
  },
  code: {
    color: {
      light: colorPalette.gray[900],
      dark: colorPalette.gray[100],
    },
    fontWeight: vars.fontWeight.medium,
    fontFamily: fonts.mono,
    background: transparentize(colorPalette.blueGray[400], 0.25),
    paddingLeft: vars.space[2],
    paddingRight: vars.space[2],
    paddingTop: vars.space[1],
    paddingBottom: vars.space[1],
    borderRadius: vars.borderRadius.base,
  },
  "a code": {
    color: {
      light: colorPalette.gray[900],
      dark: colorPalette.gray[100],
    },
  },
  "a:has(code)": {
    textDecorationColor: {
      light: colorPalette.gray[400],
      dark: colorPalette.gray[400],
    },
  },
  pre: {
    color: colorPalette.gray[200],
    backgroundColor: {
      light: colorPalette.gray[800],
      dark: colorPalette.gray[900],
    },
    overflowX: `auto`,
  },
  "pre code": {
    backgroundColor: colorPalette.transparent,
    borderWidth: vars.space[0],
    borderRadius: vars.space[0],
    padding: vars.space[0],
    fontWeight: vars.fontWeight.normal,
    color: `inherit`,
    fontSize: `inherit`,
    fontFamily: `inherit`,
    lineHeight: `inherit`,
  },
  "pre code::before": {
    content: `""`,
  },
  "pre code::after": {
    content: `""`,
  },
  thead: {
    color: {
      light: colorPalette.gray[900],
      dark: colorPalette.gray[100],
    },
    fontWeight: vars.fontWeight.semibold,
    borderBottomWidth: vars.space.px,
    borderBottomColor: {
      light: colorPalette.gray[300],
      dark: colorPalette.gray[500],
    },
  },
  video: {
    borderRadius: vars.borderRadius.lg,
  },
  "ol, ul": {
    listStyle: `none`,
  },
  "ol > li": {
    position: `relative`,
  },
  "ol > li::before": {
    content: `counter(list-item) "."`,
    position: `absolute`,
    fontWeight: vars.fontWeight.normal,
    color: {
      light: colorPalette.gray[500],
      dark: colorPalette.gray[400],
    },
  },
  "ul > li": {
    position: `relative`,
  },
  "ul > li::before": {
    content: `""`,
    position: `absolute`,
    backgroundColor: {
      light: colorPalette.gray[300],
      dark: colorPalette.gray[400],
    },
    borderRadius: `50%`,
  },
  hr: {
    borderColor: {
      light: colorPalette.blueGray[200],
      dark: colorPalette.blueGray[600],
    },
    borderTopWidth: 1,
  },
  table: {
    width: vars.space.full,
    tableLayout: `auto`,
    textAlign: `left`,
    marginTop: em(32, 16),
    marginBottom: em(32, 16),
  },
  "thead th": {
    verticalAlign: `bottom`,
  },
  "tbody tr": {
    borderBottomWidth: vars.space.px,
    borderBottomColor: {
      light: colorPalette.gray[200],
      dark: colorPalette.gray[500],
    },
  },
  "tbody tr:last-of-type": {
    borderBottomWidth: vars.space[0],
  },
  "tbody td": {
    verticalAlign: `top`,
  },
  "thead th:first-of-type": {
    paddingLeft: vars.space[0],
  },
  "thead th:last-of-type": {
    paddingRight: vars.space[0],
  },
  "tbody td:first-of-type": {
    paddingLeft: vars.space[0],
  },
  "tbody td:last-of-type": {
    paddingRight: vars.space[0],
  },
}
