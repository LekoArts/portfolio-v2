import { test, expect } from "@playwright/test"

test.describe(`Kitchen Sink`, () => {
  test(`visiting primary navigation`, async ({ page }) => {
    await page.goto(`/`)

    await page.locator(`[aria-label="Primary navigation"] >> text=Writing`).click()
    await expect(page).toHaveURL(`/writing`)

    await page.locator(`[aria-label="Primary navigation"] >> text=Art`).click()
    await expect(page).toHaveURL(`/art`)

    await page.locator(`[aria-label="Primary navigation"] >> text=About`).click()
    await expect(page).toHaveURL(`/about`)

    await page.locator(`[aria-label="lekoarts\\.de\\, Back to homepage"] svg`).click()
    await expect(page).toHaveURL(`/`)
  })
  test(`visiting writing subnavigation`, async ({ page }) => {
    await page.goto(`/writing`)

    await page.locator(`text=Tutorials`).first().click()
    await expect(page).toHaveURL(`/tutorials`)

    await page.locator(`text=Community`).first().click()
    await expect(page).toHaveURL(`/community`)

    await page.locator(`text=Design`).first().click()
    await expect(page).toHaveURL(`/design`)

    await page.locator(`text=Gatsby`).first().click()
    await expect(page).toHaveURL(`/gatsby`)

    await page.locator(`text=JavaScript`).first().click()
    await expect(page).toHaveURL(`/javascript`)

    await page.locator(`text=React`).first().click()
    await expect(page).toHaveURL(`/react`)
  })
  test(`footer navigation`, async ({ page }) => {
    await page.goto(`/`)

    await page.locator(`footer[role="contentinfo"] >> text=Digital Garden`).click()
    await expect(page).toHaveURL(`/garden`)
  })
  test(`content pages`, async ({ page }) => {
    await page.goto(`/gatsby/using-deferred-static-generation-with-analytics-tools`)
    await page.goto(`/design/introducing-the-theme-ui-plugin-for-figma`)
    await page.goto(`/garden/running-cypress-tests-with-github-actions-in-parallel`)
  })
})
