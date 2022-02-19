import * as React from "react"
import { Global } from "@emotion/react"

export const Fonts = () => (
  <Global
    styles={`
    /* Inter UI */

    @font-face {
      font-family: 'Inter';
      font-weight: 400 700;
      font-display: swap;
      font-style: normal;
      font-named-instance: 'Regular';
      src: url(/fonts/Inter-roman.var.woff2?v=3.19) format("woff2");
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    /* Crimson Pro */

    @font-face {
      font-family: 'Crimson Pro';
      font-style: normal;
      font-weight: 600 800;
      font-display: swap;
      src: url(/fonts/Crimson-Pro.var.woff2?v=1) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
  `}
  />
)
