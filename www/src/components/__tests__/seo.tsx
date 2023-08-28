/**
 * @vitest-environment jsdom
 */

import * as React from "react"
import * as Gatsby from "gatsby"
import { render } from "@testing-library/react"
import { vi } from "vitest"
import { SEO } from "../seo"

const useStaticQuery = vi.spyOn(Gatsby, `useStaticQuery`)
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
  beforeAll(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery)
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it(`should have sensible defaults`, () => {
    const result = render(<SEO />, { container: document.head }).baseElement.parentElement?.firstChild

    expect(result).toMatchInlineSnapshot(
      `
      <head>
        <title>
          Harry Potter - Wizard
        </title>
        <meta
          content="Hogwarts is magical"
          name="description"
        />
        <meta
          content="https://www.dev.cool/social/harry-potter.png"
          name="image"
        />
        <link
          href="https://www.dev.cool"
          rel="canonical"
        />
        <meta
          content="Harry Potter - Wizard"
          property="og:title"
        />
        <meta
          content="https://www.dev.cool"
          property="og:url"
        />
        <meta
          content="Hogwarts is magical"
          property="og:description"
        />
        <meta
          content="https://www.dev.cool/social/harry-potter.png"
          property="og:image"
        />
        <meta
          content="website"
          property="og:type"
        />
        <meta
          content="https://github.com/LekoArts"
          property="og:see_also"
        />
        <meta
          content="https://www.behance.net/lekoarts"
          property="og:see_also"
        />
        <meta
          content="https://dribbble.com/LekoArts"
          property="og:see_also"
        />
        <meta
          content="https://youtube.de/LekoArtsDE"
          property="og:see_also"
        />
        <meta
          content="https://twitter.com/lekoarts_de"
          property="og:see_also"
        />
        <meta
          content="https://mastodon.social/@lekoarts"
          property="og:see_also"
        />
        <meta
          content="summary_large_image"
          name="twitter:card"
        />
        <meta
          content="Harry Potter - Wizard"
          name="twitter:title"
        />
        <meta
          content="https://www.dev.cool"
          name="twitter:url"
        />
        <meta
          content="Hogwarts is magical"
          name="twitter:description"
        />
        <meta
          content="https://www.dev.cool/social/harry-potter.png"
          name="twitter:image"
        />
        <meta
          content="@cool"
          name="twitter:creator"
        />
        <meta
          content="LekoArts"
          name="creator"
        />
        <link
          href="/favicon.svg"
          rel="icon"
          type="image/svg+xml"
        />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
        />
        <meta
          content="#0f172a"
          name="msapplication-TileColor"
        />
      </head>
    `
    )
  })
  it(`should accept all common props`, () => {
    const result = render(
      <SEO
        title="Custom Title"
        image="/path/to/image.png"
        description="Custom Description"
        pathname="/custom-path"
        breadcrumbListItems={[{ name: `Hermione`, url: `/granger` }]}
      />,
      { container: document.head }
    ).baseElement.parentElement?.firstChild

    expect(result).toMatchInlineSnapshot(`
      <head>
        <title>
          Custom Title | Harry Potter
        </title>
        <meta
          content="Custom Description"
          name="description"
        />
        <meta
          content="https://www.dev.cool/path/to/image.png"
          name="image"
        />
        <link
          href="https://www.dev.cool/custom-path"
          rel="canonical"
        />
        <meta
          content="Custom Title | Harry Potter"
          property="og:title"
        />
        <meta
          content="https://www.dev.cool/custom-path"
          property="og:url"
        />
        <meta
          content="Custom Description"
          property="og:description"
        />
        <meta
          content="https://www.dev.cool/path/to/image.png"
          property="og:image"
        />
        <meta
          content="website"
          property="og:type"
        />
        <meta
          content="https://github.com/LekoArts"
          property="og:see_also"
        />
        <meta
          content="https://www.behance.net/lekoarts"
          property="og:see_also"
        />
        <meta
          content="https://dribbble.com/LekoArts"
          property="og:see_also"
        />
        <meta
          content="https://youtube.de/LekoArtsDE"
          property="og:see_also"
        />
        <meta
          content="https://twitter.com/lekoarts_de"
          property="og:see_also"
        />
        <meta
          content="https://mastodon.social/@lekoarts"
          property="og:see_also"
        />
        <meta
          content="summary_large_image"
          name="twitter:card"
        />
        <meta
          content="Custom Title | Harry Potter"
          name="twitter:title"
        />
        <meta
          content="https://www.dev.cool/custom-path"
          name="twitter:url"
        />
        <meta
          content="Custom Description"
          name="twitter:description"
        />
        <meta
          content="https://www.dev.cool/path/to/image.png"
          name="twitter:image"
        />
        <meta
          content="@cool"
          name="twitter:creator"
        />
        <meta
          content="LekoArts"
          name="creator"
        />
        <link
          href="/favicon.svg"
          rel="icon"
          type="image/svg+xml"
        />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
        />
        <meta
          content="#0f172a"
          name="msapplication-TileColor"
        />
        <script
          type="application/ld+json"
        >
          {"@context":"https://schema.org","@type":"BreadcrumbList","description":"Breadcrumbs list","itemListElement":[{"@type":"ListItem","item":{"@id":"https://www.lekoarts.de","name":"Homepage"},"position":1},{"@type":"ListItem","item":{"@id":"https://www.lekoarts.de/granger","name":"Hermione"},"position":2}],"name":"Breadcrumbs"}
        </script>
      </head>
    `)
  })
  it(`should hide with noIndex`, () => {
    const result = render(<SEO noIndex />, { container: document.head }).baseElement.parentElement?.firstChild

    expect(result).toMatchInlineSnapshot(`
      <head>
        <title>
          Harry Potter - Wizard
        </title>
        <meta
          content="Hogwarts is magical"
          name="description"
        />
        <meta
          content="https://www.dev.cool/social/harry-potter.png"
          name="image"
        />
        <link
          href="https://www.dev.cool"
          rel="canonical"
        />
        <meta
          content="Harry Potter - Wizard"
          property="og:title"
        />
        <meta
          content="https://www.dev.cool"
          property="og:url"
        />
        <meta
          content="Hogwarts is magical"
          property="og:description"
        />
        <meta
          content="https://www.dev.cool/social/harry-potter.png"
          property="og:image"
        />
        <meta
          content="website"
          property="og:type"
        />
        <meta
          content="https://github.com/LekoArts"
          property="og:see_also"
        />
        <meta
          content="https://www.behance.net/lekoarts"
          property="og:see_also"
        />
        <meta
          content="https://dribbble.com/LekoArts"
          property="og:see_also"
        />
        <meta
          content="https://youtube.de/LekoArtsDE"
          property="og:see_also"
        />
        <meta
          content="https://twitter.com/lekoarts_de"
          property="og:see_also"
        />
        <meta
          content="https://mastodon.social/@lekoarts"
          property="og:see_also"
        />
        <meta
          content="summary_large_image"
          name="twitter:card"
        />
        <meta
          content="Harry Potter - Wizard"
          name="twitter:title"
        />
        <meta
          content="https://www.dev.cool"
          name="twitter:url"
        />
        <meta
          content="Hogwarts is magical"
          name="twitter:description"
        />
        <meta
          content="https://www.dev.cool/social/harry-potter.png"
          name="twitter:image"
        />
        <meta
          content="@cool"
          name="twitter:creator"
        />
        <meta
          content="LekoArts"
          name="creator"
        />
        <link
          href="/favicon.svg"
          rel="icon"
          type="image/svg+xml"
        />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
        />
        <meta
          content="#0f172a"
          name="msapplication-TileColor"
        />
        <meta
          content="noindex, nofollow"
          name="robots"
        />
      </head>
    `)
  })
})
