import React from "https://esm.sh/react@18.2.0"
import type { Config } from "@netlify/edge-functions"
import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts"

export default async function handler(req: Request) {
  return new ImageResponse(
    (
      <div
        style={{
          width: `100%`,
          height: `100%`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          fontSize: 128,
          background: `lavender`,
        }}
      >
        Hello World 123!
      </div>
    ),
    {
      width: 1600,
      height: 836,
      debug: true,
    }
  )
}

export const config: Config = {
  path: `/og/garden`,
}
