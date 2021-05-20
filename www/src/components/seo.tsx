import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useLocation } from "@reach/router"

type SEOProps = {
  title?: string
  description?: string
  pathname?: string
  image?: string
  noIndex?: boolean
}

const faviconSrc =
  process.env.NODE_ENV === `production`
    ? `/favicon.svg`
    : `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🔥</text></svg>`

export const SEO: React.FC<SEOProps> = ({ title, description, pathname, image, noIndex = false, children }) => {
  const { href } = useLocation()

  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteTitleDefault
          siteUrl
          siteDescription
          siteImage
          twitter
        }
      }
    }
  `)

  const { siteTitle, siteTitleDefault, siteUrl, siteDescription, siteImage, twitter } = siteMetadata

  const seo = {
    title: title || siteTitleDefault,
    description: description || siteDescription,
    url: pathname ? `${siteUrl}${pathname}` : href,
    image: `${siteUrl}${image || siteImage}`,
  }

  return (
    <Helmet title={title} defaultTitle={siteTitleDefault} titleTemplate={`%s | ${siteTitle}`}>
      <html lang="en-US" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={twitter} />
      <meta name="creator" content="LekoArts" />
      <link rel="icon" type="image/svg+xml" href={faviconSrc} />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="msapplication-TileColor" content="#0f172a" />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {children}
    </Helmet>
  )
}
