import { test, expect } from "@playwright/test"

test.describe(`Visiting pages`, () => {
  test.skip(`should work`, async ({ page }) => {
    // Go to http://localhost:8000/
    await page.goto(`http://localhost:8000/`)
    // Click [aria-label="Primary navigation"] >> text=Writing
    await page.locator(`[aria-label="Primary navigation"] >> text=Writing`).click()
    await expect(page).toHaveURL(`http://localhost:8000/writing`)
    // Click [aria-label="Primary navigation"] >> text=Art
    await Promise.all([
      page.waitForNavigation(/* { url: 'http://localhost:8000/art' }*/),
      page.locator(`[aria-label="Primary navigation"] >> text=Art`).click(),
    ])
    // Click [aria-label="Primary navigation"] >> text=About
    await Promise.all([
      page.waitForNavigation(/* { url: 'http://localhost:8000/about' }*/),
      page.locator(`[aria-label="Primary navigation"] >> text=About`).click(),
    ])
    // Click [aria-label="lekoarts\.de\, Back to homepage"] svg
    await page.locator(`[aria-label="lekoarts\\.de\\, Back to homepage"] svg`).click()
    await expect(page).toHaveURL(`http://localhost:8000/`)
    // Click text=Continue Reading
    await Promise.all([
      page.waitForNavigation(/* { url: 'http://localhost:8000/gatsby/using-deferred-static-generation-with-analytics-tools' }*/),
      page.locator(`text=Continue Reading`).click(),
    ])
    // Click text=Table of Contents
    await page.locator(`text=Table of Contents`).click()
    // Click [aria-label="Primary navigation"] >> text=Writing
    await Promise.all([
      page.waitForNavigation(/* { url: 'http://localhost:8000/writing' }*/),
      page.locator(`[aria-label="Primary navigation"] >> text=Writing`).click(),
    ])
    // Click text=Tutorials >> nth=0
    await Promise.all([
      page.waitForNavigation(/* { url: 'http://localhost:8000/tutorials' }*/),
      page.locator(`text=Tutorials`).first().click(),
    ])
    // Click text=Community >> nth=0
    await page.locator(`text=Community`).first().click()
    await expect(page).toHaveURL(`http://localhost:8000/community`)
    // Click text=Design >> nth=0
    await page.locator(`text=Design`).first().click()
    await expect(page).toHaveURL(`http://localhost:8000/design`)
    // Click text=Gatsby
    await Promise.all([
      page.waitForNavigation(/* { url: 'http://localhost:8000/gatsby' }*/),
      page.locator(`text=Gatsby`).click(),
    ])
    // Click text=JavaScript
    await page.locator(`text=JavaScript`).click()
    await expect(page).toHaveURL(`http://localhost:8000/javascript`)
    // Click text=React >> nth=0
    await Promise.all([
      page.waitForNavigation(/* { url: 'http://localhost:8000/react' }*/),
      page.locator(`text=React`).first().click(),
    ])
    // Click text=Digital Garden
    await Promise.all([
      page.waitForNavigation(/* { url: 'http://localhost:8000/garden' }*/),
      page.locator(`text=Digital Garden`).click(),
    ])
  })
})
