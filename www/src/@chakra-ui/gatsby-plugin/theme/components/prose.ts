import { mode } from "@chakra-ui/theme-tools"
import { round, rem, em } from "../custom/utils"

const Prose = {
  baseStyle: (props) => ({
    color: mode(`gray.700`, `gray.300`)(props),
    a: {
      color: mode(`gray.900`, `gray.100`)(props),
      fontWeight: `500`,
      textDecoration: `underline`,
    },
    strong: {
      color: mode(`gray.900`, `gray.100`)(props),
      fontWeight: `600`,
    },
    em: {
      fontWeight: `500`,
      color: mode(`brand.textEmphasized`, `brand.dark.textEmphasized`)(props),
    },
    "figure img, img": {
      borderRadius: `lg`,
      boxShadow: `lg`,
    },
    "ol, ul": {
      listStyle: `none`,
    },
    "ol > li": {
      position: `relative`,
      paddingLeft: em(28, 16),
    },
    "ol > li::before": {
      content: `counter(list-item) "."`,
      position: `absolute`,
      fontWeight: `400`,
      color: mode(`gray.500`, `gray.400`)(props),
      left: `0`,
    },
    "ul > li": {
      position: `relative`,
      paddingLeft: em(28, 16),
    },
    "ul > li::before": {
      content: `""`,
      position: `absolute`,
      backgroundColor: mode(`gray.300`, `gray.400`)(props),
      borderRadius: `50%`,
      width: em(6, 16),
      height: em(6, 16),
      top: `calc(${em(28 / 2, 16)} - ${em(3, 16)})`,
      left: em(4, 16),
    },
    hr: {
      borderColor: mode(`blueGray.200`, `blueGray.600`)(props),
      borderTopWidth: 1,
      marginTop: em(48, 16),
      marginBottom: em(48, 16),
    },
    blockquote: {
      fontWeight: `500`,
      fontStyle: `italic`,
      color: mode(`gray.900`, `gray.100`)(props),
      borderLeftWidth: `0.25rem`,
      borderLeftColor: mode(`gray.200`, `gray.600`)(props),
      quotes: `"\\201C""\\201D""\\2018""\\2019"`,
      marginTop: em(32, 20),
      marginBottom: em(32, 20),
      paddingLeft: em(20, 20),
    },
    "blockquote p:first-of-type::before": {
      content: `open-quote`,
    },
    "blockquote p:last-of-type::after": {
      content: `close-quote`,
    },
    h1: {
      color: mode(`gray.900`, `gray.100`)(props),
      fontWeight: `700`,
      fontFamily: `heading`,
      letterSpacing: `wide`,
      fontSize: em(40, 16), // Changed from 36
      marginTop: `0`,
      marginBottom: em(32, 36),
      lineHeight: round(40 / 36),
    },
    h2: {
      color: mode(`gray.900`, `gray.100`)(props),
      fontWeight: `700`,
      fontFamily: `heading`,
      fontSize: em(28, 16), // Changed from 24
      marginTop: em(48, 24),
      marginBottom: em(24, 24),
      lineHeight: round(32 / 24),
    },
    h3: {
      color: mode(`gray.900`, `gray.100`)(props),
      fontWeight: `600`,
      fontFamily: `heading`,
      fontSize: em(24, 16), // Changed from 20
      marginTop: em(32, 20),
      marginBottom: em(12, 20),
      lineHeight: round(32 / 20),
    },
    h4: {
      color: mode(`gray.900`, `gray.100`)(props),
      fontWeight: `600`,
      fontFamily: `heading`,
      marginTop: em(24, 16),
      marginBottom: em(8, 16),
      lineHeight: round(24 / 16),
    },
    "figure figcaption": {
      color: mode(`gray.500`, `gray.400`)(props),
      fontSize: em(14, 16),
      lineHeight: round(20 / 14),
      marginTop: em(12, 14),
    },
    code: {
      color: mode(`gray.900`, `gray.100`)(props),
      fontWeight: `600`,
      fontSize: em(14, 16),
      fontFamily: `mono`,
      bg: mode(`brand.primaryAlpha`, `brand.dark.primaryAlpha`)(props),
      px: `2`,
      py: `1`,
      borderRadius: `base`,
    },
    "a code": {
      color: mode(`gray.900`, `gray.100`)(props),
    },
    pre: {
      color: mode(`gray.200`, `gray.200`)(props),
      backgroundColor: mode(`gray.800`, `gray.900`)(props),
      overflowX: `auto`,
      fontSize: em(14, 16),
      lineHeight: round(24 / 14),
      marginTop: em(24, 14),
      marginBottom: em(24, 14),
      borderRadius: rem(6),
      paddingTop: em(12, 14),
      paddingRight: em(16, 14),
      paddingBottom: em(12, 14),
      paddingLeft: em(16, 14),
    },
    "pre code": {
      backgroundColor: `transparent`,
      borderWidth: `0`,
      borderRadius: `0`,
      padding: `0`,
      fontWeight: `400`,
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
    table: {
      width: `100%`,
      tableLayout: `auto`,
      textAlign: `left`,
      marginTop: em(32, 16),
      marginBottom: em(32, 16),
      fontSize: em(14, 16),
      lineHeight: round(24 / 14),
    },
    thead: {
      color: mode(`gray.900`, `gray.100`)(props),
      fontWeight: `600`,
      borderBottomWidth: `1px`,
      borderBottomColor: mode(`gray.300`, `gray.500`)(props),
    },
    "thead th": {
      verticalAlign: `bottom`,
      paddingRight: em(8, 14),
      paddingBottom: em(8, 14),
      paddingLeft: em(8, 14),
    },
    "tbody tr": {
      borderBottomWidth: `1px`,
      borderBottomColor: mode(`gray.200`, `gray.500`)(props),
    },
    "tbody tr:last-of-type": {
      borderBottomWidth: `0`,
    },
    "tbody td": {
      verticalAlign: `top`,
      paddingTop: em(8, 14),
      paddingRight: em(8, 14),
      paddingBottom: em(8, 14),
      paddingLeft: em(8, 14),
    },
    fontSize: rem(16),
    lineHeight: round(28 / 16),
    p: {
      marginTop: em(20, 16),
      marginBottom: em(20, 16),
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
      marginTop: `0`,
      marginBottom: `0`,
    },
    "h2 code": {
      fontSize: em(21, 24),
    },
    "h3 code": {
      fontSize: em(18, 20),
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
    "hr + *": {
      marginTop: `0`,
    },
    "h2 + *": {
      marginTop: `0`,
    },
    "h3 + *": {
      marginTop: `0`,
    },
    "h4 + *": {
      marginTop: `0`,
    },
    "thead th:first-of-type": {
      paddingLeft: `0`,
    },
    "thead th:last-of-type": {
      paddingRight: `0`,
    },
    "tbody td:first-of-type": {
      paddingLeft: `0`,
    },
    "tbody td:last-of-type": {
      paddingRight: `0`,
    },
  }),
  variants: {
    default: {},
    sm: {
      fontSize: rem(14),
      lineHeight: round(24 / 14),
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
        marginTop: `0`,
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
        marginTop: `0`,
        marginBottom: `0`,
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
        left: `0`,
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
        marginTop: `0`,
      },
      "h2 + *": {
        marginTop: `0`,
      },
      "h3 + *": {
        marginTop: `0`,
      },
      "h4 + *": {
        marginTop: `0`,
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
        paddingLeft: `0`,
      },
      "thead th:last-of-type": {
        paddingRight: `0`,
      },
      "tbody td": {
        paddingTop: em(8, 12),
        paddingRight: em(12, 12),
        paddingBottom: em(8, 12),
        paddingLeft: em(12, 12),
      },
      "tbody td:first-of-type": {
        paddingLeft: `0`,
      },
      "tbody td:last-of-type": {
        paddingRight: `0`,
      },
    },
    lg: {
      fontSize: rem(18),
      lineHeight: round(32 / 18),
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
        marginTop: `0`,
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
        marginTop: `0`,
        marginBottom: `0`,
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
        left: `0`,
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
        marginTop: `0`,
      },
      "h2 + *": {
        marginTop: `0`,
      },
      "h3 + *": {
        marginTop: `0`,
      },
      "h4 + *": {
        marginTop: `0`,
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
        paddingLeft: `0`,
      },
      "thead th:last-of-type": {
        paddingRight: `0`,
      },
      "tbody td": {
        paddingTop: em(12, 16),
        paddingRight: em(12, 16),
        paddingBottom: em(12, 16),
        paddingLeft: em(12, 16),
      },
      "tbody td:first-of-type": {
        paddingLeft: `0`,
      },
      "tbody td:last-of-type": {
        paddingRight: `0`,
      },
    },
    xl: {
      fontSize: rem(20),
      lineHeight: round(36 / 20),
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
        marginTop: `0`,
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
        marginTop: `0`,
        marginBottom: `0`,
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
        left: `0`,
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
        marginTop: `0`,
      },
      "h2 + *": {
        marginTop: `0`,
      },
      "h3 + *": {
        marginTop: `0`,
      },
      "h4 + *": {
        marginTop: `0`,
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
        paddingLeft: `0`,
      },
      "thead th:last-of-type": {
        paddingRight: `0`,
      },
      "tbody td": {
        paddingTop: em(16, 18),
        paddingRight: em(12, 18),
        paddingBottom: em(16, 18),
        paddingLeft: em(12, 18),
      },
      "tbody td:first-of-type": {
        paddingLeft: `0`,
      },
      "tbody td:last-of-type": {
        paddingRight: `0`,
      },
    },
  },
}

export default Prose
