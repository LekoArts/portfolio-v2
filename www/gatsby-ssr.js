import * as React from "react"
import { renderToString } from "react-dom/server"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import createEmotionServer from "@emotion/server/create-instance"
import parse from "html-react-parser"
import { cacheKey } from "./src/constants/emotion"
import { site } from "./src/constants/meta"

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) => {
  const cache = createCache({ key: cacheKey })
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache)

  const element = <CacheProvider value={cache}>{bodyComponent}</CacheProvider>

  const { styles, html } = extractCriticalToChunks(renderToString(element))
  const stylesString = constructStyleTagsFromChunks({ html, styles })

  setHeadComponents([parse(stylesString)])

  replaceBodyHTMLString(html)
}

const PLAUSIBLE_DOMAIN = `plausible.io`
const SCRIPT_URI = `/js/plausible.js`

export const onRenderBody = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV === `production`) {
    const scriptProps = {
      "data-domain": site.dataDomain,
      src: `https://${PLAUSIBLE_DOMAIN}${SCRIPT_URI}`,
    }

    return setHeadComponents([
      <link key="gatsby-plugin-plausible-preconnect" rel="preconnect" href={`https://${PLAUSIBLE_DOMAIN}`} />,
      <script key="gatsby-plugin-plausible-script" async defer {...scriptProps} />,
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
