import * as React from "react"
import { graphql } from "gatsby"
import { artImageStyle } from "./art-image.css"
import { composeClassNames } from "../../utils/box"

interface IArtImageProps {
  images: IImages
  photoId: string
  alt: string
  className?: string
}

interface IImageSize {
  url: string
  width: number
  height: number
}

interface IImages {
  lg: IImageSize
  md: IImageSize
  sm: IImageSize
}

export interface IArtImageItem {
  photoId: string
  description: string
  images: IImages
}

const USER_ID = `192975453@N04`

const getSrcSet = (images: IImages) => {
  const { lg, md, sm } = images

  return `
    ${lg.url} ${lg.width}w,
    ${md.url} ${md.width}w,
    ${sm.url} ${sm.width}w
  `
}

export const ArtImage = ({ images, photoId, alt, className }: IArtImageProps) => {
  const src = images.lg.url
  const { width: maxWidth, height: maxHeight } = images.lg
  const aspectRatio = maxWidth / maxHeight

  return (
    <a href={`https://www.flickr.com/photos/${USER_ID}/${photoId}`}>
      <img
        loading="lazy"
        decoding="async"
        src={src}
        sizes={`(min-width: ${maxWidth}px) ${maxWidth}px, 100vw`}
        srcSet={getSrcSet(images)}
        alt={alt}
        className={composeClassNames(artImageStyle, className)}
        style={{
          maxWidth: `${maxWidth}px`,
          maxHeight: `${maxHeight}px`,
          aspectRatio: `${aspectRatio} / 1`,
          width: `100%`,
        }}
      />
    </a>
  )
}

export const fragment = graphql`
  fragment ArtImage on FlickrPhotosetsPhotos {
    photoId: _id
    description
    images: imageUrls {
      lg: _1024px {
        url
        height
        width
      }
      md: _800px {
        url
        width
        height
      }
      sm: _640px {
        url
        width
        height
      }
    }
  }
`
