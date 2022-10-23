import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ArtImage } from "./art-image"

interface IQueryResult {
  Photography: {
    nodes: Array<{
      title
      content: Array<{
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
      }>
    }>
  }
}

export const FlickrPhotography = () => {
  const data = useStaticQuery<IQueryResult>(graphql`
    {
      Photography: allFlickrPhotosetsList(
        filter: { _id: { nin: ["72177720300732809", "72177720300725772"] } }
        sort: { fields: date_update, order: DESC }
      ) {
        nodes {
          title
          content {
            title
            description
            photoId: _id
            imageUrls {
              image: _1024px {
                height
                url
                width
              }
            }
          }
        }
      }
    }
  `)

  if (data?.Photography?.nodes.length === 0) {
    return (
      <p>
        Define a <code>FLICKR_API_KEY</code>.
      </p>
    )
  }

  return (
    <>
      {data.Photography.nodes.map((photoset) => (
        <React.Fragment key={photoset.title}>
          <h2>{photoset.title}</h2>
          {photoset.content.map((img) => {
            if (!img.title) return null

            return (
              <ArtImage
                key={img.photoId}
                alt={img.description}
                photoId={img.photoId}
                height={img.imageUrls?.image?.height}
                width={img.imageUrls?.image?.width}
                src={img.imageUrls?.image?.url}
                title={img.title}
              />
            )
          })}
        </React.Fragment>
      ))}
    </>
  )
}
