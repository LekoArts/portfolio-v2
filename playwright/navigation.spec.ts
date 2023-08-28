import { test, expect, Page } from "@playwright/test"

async function click(page: Page, selector: string) {
  return Promise.all([page.waitForNavigation(), page.locator(selector).click()])
}

async function firstClick(page: Page, selector: string) {
  return Promise.all([page.waitForNavigation(), page.locator(selector).first().click()])
}

test.describe(`Navigation`, () => {
  test(`visiting primary navigation`, async ({ page }) => {
    await page.goto(`/`)

    await click(page, `[aria-label="Primary navigation"] >> text=Writing`)
    await expect(page).toHaveURL(`/writing/`)

    await click(page, `[aria-label="Primary navigation"] >> text=Art`)
    await expect(page).toHaveURL(`/art/`)

    await click(page, `[aria-label="Primary navigation"] >> text=About`)
    await expect(page).toHaveURL(`/about/`)

    await click(page, `[aria-label="lekoarts\\.de\\, Back to homepage"] svg`)
    await expect(page).toHaveURL(`/`)
  })
  test(`visiting writing subnavigation`, async ({ page }) => {
    await page.goto(`/writing/`)

    await firstClick(page, `text=Tutorials`)
    await expect(page).toHaveURL(`/tutorials/`)

    await firstClick(page, `text=Community`)
    await expect(page).toHaveURL(`/community/`)

    await firstClick(page, `text=Design`)
    await expect(page).toHaveURL(`/design/`)

    await firstClick(page, `text=JavaScript`)
    await expect(page).toHaveURL(`/javascript/`)

    await firstClick(page, `text=React`)
    await expect(page).toHaveURL(`/react/`)
  })
  test(`footer navigation`, async ({ page }) => {
    await page.goto(`/`)

    await click(page, `footer[role="contentinfo"] >> text=Digital Garden`)
    await expect(page).toHaveURL(`/garden/`)
  })
  test(`visiting some content pages`, async ({ page }) => {
    await page.goto(`/react/using-deferred-static-generation-with-analytics-tools/`)
    await page.goto(`/design/introducing-the-theme-ui-plugin-for-figma/`)
    await page.goto(`/garden/running-cypress-tests-with-github-actions-in-parallel/`)
  })
})
