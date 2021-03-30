import * as React from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"

type SEOProps = {
  title?: string
  description?: string
}

export const SEO: React.FC<SEOProps> = ({ title, description, children }) => {
  const location = useLocation()

  const siteTitle = `Lennart Jörgens`
  const siteTitleDefault = `Lennart Jörgens - Software Engineer`
  const siteDescription = `Das ist ein Test`

  const seo = {
    title: title || siteTitleDefault,
    description: description || siteDescription,
    url: location.href,
  }

  return (
    <Helmet title={title} defaultTitle={siteTitleDefault} titleTemplate={`%s | ${siteTitle}`}>
      <html lang="en-US" />
      <meta name="description" content={seo.description} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      {children}
    </Helmet>
  )
}
