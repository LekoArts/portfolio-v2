import * as React from "react"
import * as Gatsby from "gatsby"
import * as ReachRouter from "@reach/router"
import { Helmet } from "react-helmet"
import { render } from "@testing-library/react"
import { SEO } from "../seo"

const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`)
const useLocation = jest.spyOn(ReachRouter, `useLocation`)
const mockUseLocationValue = {
  href: `https://www.dev.cool`,
}
const mockUseStaticQuery = {
  site: {
    siteMetadata: {
      siteTitle: `Harry Potter`,
      siteTitleDefault: `Harry Potter - Wizard`,
      siteUrl: `https://www.dev.cool`,
      siteDescription: `Hogwarts is magical`,
      siteImage: `/social/harry-potter.png`,
      twitter: `@cool`,
    },
  },
}

describe(`SEO component`, () => {
  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery)
    // @ts-ignore
    useLocation.mockImplementation(() => mockUseLocationValue)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it(`should have sensible defaults`, () => {
    render(<SEO />)
    const { htmlAttributes, linkTags, metaTags, title } = Helmet.peek()
    const meta = mockUseStaticQuery.site.siteMetadata

    expect(title).toBe(meta.siteTitleDefault)
    expect(metaTags.find((tag) => tag.property === `og:description`).content).toBe(meta.siteDescription)
    expect(htmlAttributes.lang).toBe(`en-US`)
    expect(linkTags.find((tag) => tag.rel === `canonical`).href).toBe(meta.siteUrl)
    expect(metaTags.find((tag) => tag.name === `robots`)).toBe(undefined)
    expect(metaTags.find((tag) => tag.property === `og:image`).content).toBe(`${meta.siteUrl}${meta.siteImage}`)
  })
  it(`should accept all common props`, () => {
    render(
      <SEO
        title="Custom Title"
        image="/path/to/image.png"
        description="Custom Description"
        pathname="/custom-path"
        breadcrumbListItems={[{ name: `Hermione`, url: `/granger` }]}
      />
    )
    const { scriptTags, metaTags, title } = Helmet.peek()
    const meta = mockUseStaticQuery.site.siteMetadata
    const breadcrumbJSON = JSON.parse(scriptTags[0].innerHTML)

    expect(title).toBe(`Custom Title | Harry Potter`)
    expect(metaTags.find((tag) => tag.property === `og:description`).content).toBe(`Custom Description`)
    expect(metaTags.find((tag) => tag.property === `og:url`).content).toBe(`${meta.siteUrl}/custom-path`)
    expect(metaTags.find((tag) => tag.property === `og:image`).content).toBe(`${meta.siteUrl}/path/to/image.png`)
    expect(breadcrumbJSON.name).toBe(`Breadcrumbs`)
    expect(breadcrumbJSON.itemListElement.find((el) => el.position === 1).item.name).toBe(`Homepage`)
    expect(breadcrumbJSON.itemListElement.find((el) => el.position === 2).item.name).toBe(`Hermione`)
  })
  it(`should hide with noIndex`, () => {
    render(<SEO noIndex />)
    const { metaTags } = Helmet.peek()

    expect(metaTags.find((tag) => tag.name === `robots`).content).toBe(`noindex, nofollow`)
  })
})
