import * as React from "react"
import { artImageStyle } from "./art-image.css"

interface IArtImageProps {
  loading?: "lazy" | "eager"
  src: string
  photoId: string
  height: number
  width: number
  alt: string
  title: string
}

const USER_ID = `192975453@N04`

export const ArtImage = ({ src, photoId, height, width, alt, loading = `lazy`, title }: IArtImageProps) => (
  <a href={`https://www.flickr.com/photos/${USER_ID}/${photoId}`} title={title}>
    <img loading={loading} src={src} width={width} height={height} alt={alt} className={artImageStyle} />
  </a>
)
