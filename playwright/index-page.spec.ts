import { test, expect } from "@playwright/test"
import { site } from "../www/src/constants/meta"

test.describe(`Index Page`, () => {
  test(`should have correct title`, async ({ page }) => {
    await page.goto(`/`)
    await expect(page).toHaveTitle(site.titleDefault)
  })
})
