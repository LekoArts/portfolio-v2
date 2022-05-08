import * as React from "react"
import type { GatsbySSR } from "gatsby"
import { site } from "./src/constants/meta"

const PLAUSIBLE_DOMAIN = `plausible.io`
const SCRIPT_URI = `/js/plausible.js`

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV === `production`) {
    const scriptProps = {
      "data-domain": site.dataDomain,
      src: `https://${PLAUSIBLE_DOMAIN}${SCRIPT_URI}`,
    }

    return setHeadComponents([
      <link rel="preload" href="/icons.svg" as="image/svg+xml" />,
      <link rel="preload" href="/fonts/Inter-roman.var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />,
      <link rel="preload" href="/fonts/Crimson-Pro.var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />,
      <link key="gatsby-plugin-plausible-preconnect" rel="preconnect" href={`https://${PLAUSIBLE_DOMAIN}`} />,
      <script key="gatsby-plugin-plausible-script" defer {...scriptProps} />,
      // See: https://plausible.io/docs/custom-event-goals#1-trigger-custom-events-with-javascript-on-your-site
      <script
        key="gatsby-plugin-plausible-custom-events"
        dangerouslySetInnerHTML={{
          __html: `
            window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };
          `,
        }}
      />,
    ])
  }
  return null
}
