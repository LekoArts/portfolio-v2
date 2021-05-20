import * as React from "react"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import { cacheKey } from "./src/constants/emotion"

export const wrapRootElement = ({ element }) => {
  const cache = createCache({ key: cacheKey })

  return <CacheProvider value={cache}>{element}</CacheProvider>
}

export const onRouteUpdate = () => {
  if (process.env.NODE_ENV === `production` && typeof window.plausible === `object`) {
    window.plausible(`pageview`)
  }
}
