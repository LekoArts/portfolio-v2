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
    expect(htmlAttributes.lang).toBe(`en-US`)
    expect(linkTags.find((tag) => tag.rel === `canonical`).href).toBe(meta.siteUrl)
    expect(metaTags.find((tag) => tag.name === `robots`)).toBe(undefined)
  })
})
