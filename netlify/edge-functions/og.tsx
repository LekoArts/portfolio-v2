import React from "https://esm.sh/react@18.2.0"
import type { Config } from "@netlify/edge-functions"
import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts"

const WIDTH = 1600
const HEIGHT = 836

const interMedium = await loadFont(`https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-500-normal.ttf`)

const interBold = await loadFont(`https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf`)

function loadFont(name: string) {
  return fetch(name).then((res) => res.arrayBuffer())
}

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url)

  const hasTitle = searchParams.has(`title`)
  const title = hasTitle ? (searchParams.get(`title`) as string) : `Digital Garden`
  const subTitle = hasTitle ? `Digital Garden` : `Lennart Jörgens`
  const lastUpdated = searchParams.get(`lastUpdated`) ?? null
  const tags = searchParams.get(`tags`) ?? null

  return new ImageResponse(
    (
      <div
        className="parent"
        style={{
          display: `flex`,
          fontFamily: `"Inter", sans-serif`,
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
          flexDirection: `column`,
          justifyContent: `center`,
          alignItems: `center`,
          position: `relative`,
          background: `url(https://www.lekoarts.de/edge/digital-garden-template.png)`,
        }}
      >
        <div
          className="text"
          style={{
            display: `flex`,
            flexDirection: `column`,
            textAlign: `center`,
            alignItems: `center`,
            maxWidth: `1400px`,
          }}
        >
          <h2
            className="subtitle"
            style={{
              display: `flex`,
              backgroundImage: `linear-gradient(to bottom, #FFFFFF 0%, #B8C6E9 100%)`,
              backgroundClip: `text`,
              WebkitBackgroundClip: `text`,
              WebkitTextFillColor: `transparent`,
              color: `transparent`,
              fontSize: `57.33px`,
              fontWeight: 500,
              marginTop: `0`,
              marginBottom: `16px`,
              letterSpacing: `0.025em`,
            }}
          >
            {subTitle}
          </h2>
          <h1
            className="title"
            style={{
              display: `flex`,
              wordBreak: `break-word`,
              background: `linear-gradient(to bottom, #7AD28D 0%, #1B9C68 100%)`,
              backgroundClip: `text`,
              WebkitBackgroundClip: `text`,
              WebkitTextFillColor: `transparent`,
              color: `transparent`,
              fontSize: `68.80px`,
              fontWeight: 700,
              margin: `0`,
              lineHeight: 1.15,
            }}
          >
            {title}
          </h1>
        </div>
        {lastUpdated ? (
          <div
            className="date"
            style={{
              display: `flex`,
              position: `absolute`,
              left: `80px`,
              bottom: `80px`,
              background: `linear-gradient(to bottom, #FFFFFF 0%, #C3F1C3 100%)`,
              backgroundClip: `text`,
              WebkitBackgroundClip: `text`,
              WebkitTextFillColor: `transparent`,
              fontSize: `27.65px`,
              color: `transparent`,
              textAlign: `left`,
            }}
          >
            Last updated: {lastUpdated}
          </div>
        ) : null}
        {tags ? (
          <div
            className="tags"
            style={{
              display: `flex`,
              position: `absolute`,
              right: `80px`,
              bottom: `80px`,
              background: `linear-gradient(to bottom, #FFFFFF 0%, #C3F1C3 100%)`,
              backgroundClip: `text`,
              WebkitBackgroundClip: `text`,
              WebkitTextFillColor: `transparent`,
              fontSize: `27.65px`,
              color: `transparent`,
              textAlign: `left`,
            }}
          >
            Tags: {tags.split(`,`).join(`, `)}
          </div>
        ) : null}
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: `Inter`,
          data: interMedium,
          style: `normal`,
          weight: 500,
        },
        {
          name: `Inter`,
          data: interBold,
          style: `normal`,
          weight: 700,
        },
      ],
    }
  )
}

export const config: Config = {
  path: `/og/garden`,
}
