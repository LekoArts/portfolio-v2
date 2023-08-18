import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ArtImage, IArtImageItem } from "./art-image"

interface IQueryResult {
  threeD: {
    nodes: Array<IArtImageItem>
  }
}

export const Flickr3D = () => {
  const data = useStaticQuery<IQueryResult>(graphql`
    {
      threeD: allFlickrPhotosetsPhotos(
        filter: { photoset_id: { eq: "72177720300732809" } }
        sort: { datetaken: DESC }
      ) {
        nodes {
          ...ArtImage
        }
      }
    }
  `)

  const threeDNodes = data?.threeD?.nodes

  if (threeDNodes.length === 0) {
    return (
      <p>
        Define a <code>FLICKR_API_KEY</code>.
      </p>
    )
  }

  return threeDNodes.map((img) => {
    const src = img.images?.lg?.url

    if (src) {
      return <ArtImage key={img.photoId} images={img.images} alt={img.description} photoId={img.photoId} />
    }

    return null
  })
}
