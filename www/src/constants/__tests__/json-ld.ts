import { breadcrumbList, article } from "../json-ld"

const category = {
  name: `Series`,
  slug: `/series`,
}

const post = {
  title: `The Expanse`,
  description: `Sci-Fi`,
  slug: `/the-expanse`,
  date: `2021-07-17`,
  lastUpdated: `2021-07-17`,
  year: `2021`,
  image: `/path-to-image.png`,
}

describe(`json-ld`, () => {
  it(`breadcrumbList`, () => {
    expect(
      breadcrumbList([
        { name: `James`, url: `/james` },
        { name: `Naomi`, url: `/naomi` },
      ])
    ).toMatchSnapshot()
  })
  describe(`article`, () => {
    it(`basic output`, () => {
      const result = article({ category, post, isGarden: true })
      expect(result[`@graph`][2]).toMatchSnapshot()
    })
    it(`isGarden: true`, () => {
      const result = article({ category, post, isGarden: true })
      expect(result[`@graph`]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            "@type": `Article`,
            articleSection: `Digital Garden`,
          }),
        ])
      )
    })
    it(`isGarden: false`, () => {
      const result = article({ category, post, isGarden: false })
      expect(result[`@graph`]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            "@type": `Article`,
            articleSection: `Writing`,
          }),
        ])
      )
    })
  })
})
