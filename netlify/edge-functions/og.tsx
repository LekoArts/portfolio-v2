import React from "https://esm.sh/react@18.2.0"
import type { Config } from "@netlify/edge-functions"
import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts"

const WIDTH = 1600
const HEIGHT = 836

type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
type Style = "normal" | "italic"

const customFonts: Array<{ name: string; weight: Weight; style: Style; fileName: string }> = [
  {
    name: `Inter`,
    weight: 500,
    style: `normal`,
    fileName: `inter-500.ttf`,
  },
  {
    name: `Inter`,
    weight: 700,
    style: `normal`,
    fileName: `inter-700.ttf`,
  },
]

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url)
  const fonts = Promise.all(customFonts.map((font) => fetch(new URL(`/edge/${font.fileName}`, req.url))))

  const fontsDatas = await fonts

  const fontsOptions = fontsDatas.map((fontData, i) => ({
    name: customFonts[i].name,
    data: fontData,
    style: customFonts[i].style,
    weight: customFonts[i].weight,
  }))

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
          background: `url(${new URL(`/edge/digital-garden-template.png`, req.url).toString()})`,
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
      fonts: fontsOptions,
    }
  )
}

export const config: Config = {
  path: `/og/garden`,
}
