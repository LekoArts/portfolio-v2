import * as React from "react"
import { AspectRatios, youtubeIframeStyle, youtubeWrapperVariants } from "./youtube.css"

export interface IYouTubeProps {
  id?: string
  aspectRatio?: AspectRatios
  skipTo?: {
    h?: number
    m: number
    s: number
  }
}

export const YouTube = ({ id, aspectRatio = `16:9`, skipTo = { h: 0, m: 0, s: 0 } }: IYouTubeProps) => {
  const { h, m, s } = skipTo

  const tH = h! * 60
  const tM = m * 60

  const startTime = tH + tM + s

  const provider = `https://www.youtube-nocookie.com`
  const baseUrl = `${provider}/embed/`
  const src = `${baseUrl}${id}?&autoplay=false&start=${startTime}`

  return (
    <div className={youtubeWrapperVariants[aspectRatio]}>
      <iframe
        data-testid="youtube-embed"
        title={`youTube-${id}`}
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={youtubeIframeStyle}
      />
    </div>
  )
}
