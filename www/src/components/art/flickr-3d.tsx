import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ArtImage } from "./art-image"

interface IQueryResult {
  ThreeD: {
    nodes: {
      title: string
      description: string
      photoId: string
      imageUrls: {
        image: {
          url: string
          width: number
          height: number
        }
      }
    }[]
  }
}

export const Flickr3D = () => {
  const data = useStaticQuery<IQueryResult>(graphql`
    query {
      ThreeD: allFlickrPhotosetsPhotos(
        filter: { photoset_id: { eq: "72177720300732809" } }
        sort: { fields: datetaken, order: DESC }
      ) {
        nodes {
          title
          description
          photoId: _id
          imageUrls {
            image: _1024px {
              url
              width
              height
            }
          }
        }
      }
    }
  `)

  return (
    <>
      {data.ThreeD.nodes.map((img) => (
        <ArtImage
          key={img.photoId}
          alt={img.description}
          photoId={img.photoId}
          height={img.imageUrls.image.height}
          width={img.imageUrls.image.width}
          src={img.imageUrls.image.url}
          title={img.title}
        />
      ))}
    </>
  )
}
