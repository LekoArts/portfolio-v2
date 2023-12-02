import * as React from "react"
import type { GatsbySSR } from "gatsby"
import { getSandpackCssText } from "@codesandbox/sandpack-react"
import { site } from "./src/constants/meta.mjs"
import { ThemeProvider } from "./src/styles/theme-provider"
// @ts-ignore
import interVariableWoff2 from "./src/assets/fonts/inter-latin.var.woff2"
// @ts-ignore
import crimsonProVariableWoff2 from "./src/assets/fonts/crimson-pro-latin.var.woff2"

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `en-US` })

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
    <style
      id="sandpack"
      key="sandpack-css"
      dangerouslySetInnerHTML={{
        __html: getSandpackCssText(),
      }}
    />,
  ])

  if (process.env.NODE_ENV === `production`) {
    const scriptProps = {
      "data-domain": site.dataDomain,
      src: `/js/script.js`,
    }

    setHeadComponents([
      <script key="plausible-script" defer {...scriptProps} />,
      // See: https://plausible.io/docs/custom-event-goals#1-trigger-custom-events-with-javascript-on-your-site
      <script
        key="plausible-custom-events"
        dangerouslySetInnerHTML={{
          __html: `
            window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };
          `,
        }}
      />,
    ])
  }
}

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => <ThemeProvider>{element}</ThemeProvider>
