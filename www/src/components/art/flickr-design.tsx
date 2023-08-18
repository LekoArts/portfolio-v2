import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ArtImage, IArtImageItem } from "./art-image"

interface IQueryResult {
  design: {
    nodes: Array<IArtImageItem>
  }
}

export const FlickrDesign = () => {
  const data = useStaticQuery<IQueryResult>(graphql`
    {
      design: allFlickrPhotosetsPhotos(
        filter: { photoset_id: { eq: "72177720300725772" } }
        sort: { datetaken: DESC }
      ) {
        nodes {
          ...ArtImage
        }
      }
    }
  `)

  const designNodes = data?.design?.nodes

  if (designNodes.length === 0) {
    return (
      <p>
        Define a <code>FLICKR_API_KEY</code>.
      </p>
    )
  }

  return designNodes.map((img) => {
    const photoId = img?.photoId

    if (photoId) {
      return <ArtImage key={img.photoId} images={img.images} alt={img.description} photoId={photoId} />
    }

    return null
  })
}
