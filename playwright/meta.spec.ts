/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { test, expect } from "@playwright/test"
import { site } from "../www/src/constants/meta"

const metaTagAssertions = [
  {
    name: `Index Page`,
    url: `/`,
    title: site.titleDefault,
    metaTags: [
      {
        key: `og:title`,
        value: site.titleDefault,
      },
      {
        key: `og:description`,
        value: site.description,
      },
    ],
  },
  {
    name: `Blog Post`,
    url: `/gatsby/using-deferred-static-generation-with-analytics-tools`,
    title: `Using Deferred Static Generation with Analytics Tools | ${site.title}`,
    metaTags: [
      {
        key: `og:title`,
        value: `Using Deferred Static Generation with Analytics Tools`,
      },
      {
        key: `og:description`,
        value: `Only want to build out the most popular pages as static pages? No problem, you can use your analytics tool to control the usage of Deferred Static Generation in Gatsby.`,
      },
    ],
  },
  {
    name: `Garden Post`,
    url: `/garden/how-to-add-plausible-analytics-to-gatsby`,
    title: `How to Add Plausible Analytics to Gatsby | ${site.title}`,
    metaTags: [
      {
        key: `og:title`,
        value: `How to Add Plausible Analytics to Gatsby`,
      },
      {
        key: `og:description`,
        value: `You're a fan of  Plausible Analytics  and  Gatsby ? Great! In this guide you'll learn how to add Plausible Analytics to your Gatsby site…`,
      },
    ],
  },
]

const noIndexPages = [
  {
    name: `Legal Notice`,
    url: `/legal-notice`,
  },
  {
    name: `Privacy Policy`,
    url: `/privacy-policy`,
  },
  {
    name: `About`,
    url: `/about`,
  },
]

test.describe(`Meta Tags`, () => {
  for (const assertion of metaTagAssertions) {
    test(`${assertion.name} should have correct information`, async ({ page }) => {
      await page.goto(assertion.url)
      await expect(page).toHaveTitle(assertion.title)
      for (const tag of assertion.metaTags) {
        await expect(
          await page.evaluate(
            ({ key }) => document.head.querySelector(`meta[property="${key}"]`).getAttribute(`content`),
            { key: tag.key }
          )
        ).toStrictEqual(tag.value)
      }
    })
  }
  for (const assertion of noIndexPages) {
    test(`${assertion.name} should have noindex meta tag`, async ({ page }) => {
      await page.goto(assertion.url)
      await expect(
        await page.evaluate(() => document.head.querySelector(`meta[name="robots"]`).getAttribute(`content`))
      ).toStrictEqual(`noindex, nofollow`)
    })
  }
})
