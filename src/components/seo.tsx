import * as React from "react"
import { breadcrumbList, BreadcrumbListItem } from "../constants/json-ld"
import { useSiteMetadata } from "../hooks/use-site-metadata"

type SEOProps = {
  title?: string
  description?: string
  pathname?: string
  image?: string
  noIndex?: boolean
  breadcrumbListItems?: Array<BreadcrumbListItem>
}

/* istanbul ignore next */
const faviconSrc =
  process.env.NODE_ENV === `production` || process.env.NODE_ENV === `test`
    ? `/favicon.svg`
    : `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🔥</text></svg>`

export const SEO: React.FC<React.PropsWithChildren<SEOProps>> = ({
  title,
  description,
  pathname,
  image,
  noIndex = false,
  breadcrumbListItems = [],
  children,
}) => {
  const { siteTitle, siteTitleDefault, siteUrl, siteDescription, siteImage, twitter } = useSiteMetadata()

  const seo = {
    title: title ? `${title} | ${siteTitle}` : siteTitleDefault,
    description: description || siteDescription,
    url: `${siteUrl}${pathname || ``}`,
    image: `${siteUrl}${image || siteImage}`,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta property="og:see_also" content="https://github.com/LekoArts" />
      <meta property="og:see_also" content="https://www.behance.net/lekoarts" />
      <meta property="og:see_also" content="https://dribbble.com/LekoArts" />
      <meta property="og:see_also" content="https://youtube.de/LekoArtsDE" />
      <meta property="og:see_also" content="https://twitter.com/lekoarts_de" />
      <meta property="og:see_also" content="https://mastodon.social/@lekoarts" />
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
      {breadcrumbListItems.length >= 1 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList(breadcrumbListItems)) }}
        />
      )}
      {children}
    </>
  )
}
