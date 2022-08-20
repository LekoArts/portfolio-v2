import * as React from "react"
import type { GatsbySSR } from "gatsby"
import { ThemeProvider, ThemeScript } from "themes-utils"
import { site } from "./src/constants/meta"
import { DEFAULT_THEME, STORAGE_KEY, THEMES } from "./src/constants/themes"
// @ts-ignore
import interVariableWoff2 from "./src/assets/fonts/Inter-roman.var.woff2"
// @ts-ignore
import crimsonProVariableWoff2 from "./src/assets/fonts/Crimson-Pro.var.woff2"

const PLAUSIBLE_DOMAIN = `plausible.io`
const SCRIPT_URI = `/js/plausible.js`

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `en-US` })

  if (process.env.NODE_ENV === `production`) {
    const scriptProps = {
      "data-domain": site.dataDomain,
      src: `https://${PLAUSIBLE_DOMAIN}${SCRIPT_URI}`,
    }

    setHeadComponents([
      <link rel="preload" href="/icons.svg" as="image" type="image/svg+xml" key="svgIcons" />,
      <link
        rel="preload"
        href={interVariableWoff2}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        key="interFont"
      />,
      <link
        rel="preload"
        href={crimsonProVariableWoff2}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        key="crimsonFont"
      />,
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
      <ThemeScript defaultTheme={DEFAULT_THEME} storageKey={STORAGE_KEY} themes={THEMES} key="theme-utils-script" />,
    ])
  }
}

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => (
  <ThemeProvider
    defaultTheme={DEFAULT_THEME}
    storageKey={STORAGE_KEY}
    themes={THEMES}
    disableTransitionOnChange
    key="theme-utils-provider"
  >
    {element}
  </ThemeProvider>
)
