import * as React from "react"
import { renderToString } from "react-dom/server"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import createEmotionServer from "@emotion/server/create-instance"
import { cacheKey } from "./src/constants/emotion"

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) => {
  const cache = createCache({ key: cacheKey })
  const { extractCritical } = createEmotionServer(cache)
  const { html, css, ids } = extractCritical(
    renderToString(<CacheProvider value={cache}>{bodyComponent}</CacheProvider>)
  )

  setHeadComponents([
    <style
      key={`data-emotion-${cacheKey}`}
      data-emotion={`${cacheKey} ${ids.join(` `)}`}
      dangerouslySetInnerHTML={{ __html: css }}
    />,
  ])

  replaceBodyHTMLString(html)
}
