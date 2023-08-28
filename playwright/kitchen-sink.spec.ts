import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto(`/kitchen-sink/`)
})

test.describe(`Smoke Test`, () => {
  test(`should have MDX content`, async ({ page }) => {
    await page.locator(`h2:has-text("Alerts")`)
  })
})

test.describe(`Alerts`, () => {
  test(`should have titles`, async ({ page }) => {
    await page.locator(`data-testid=alert-success >> text=Success Note`)
    await page.locator(`data-testid=alert-info >> text=Info Note`)
    await page.locator(`data-testid=alert-warning >> text=Warning Note`)
    await page.locator(`data-testid=alert-error >> text=Error Note`)
  })
  test(`should have contents`, async ({ page }) => {
    await page.locator(`data-testid=alert-success >> text=This is a success.`)
    await page.locator(`data-testid=alert-info >> text=This is an info.`)
    await page.locator(`data-testid=alert-warning >> text=This is a warning.`)
    await page.locator(`data-testid=alert-error >> text=This is an error.`)
  })
})

test.describe(`Code`, () => {
  test(`should show inline code`, async ({ page }) => {
    await page.locator(`code:has-text("inline-code-block)`)
  })
  test(`should not show code-header with no language/title defined`, async ({ page }) => {
    const childSelector = `pre:has-text("code block without any meta")`
    const codeWrapperLocator = await page.locator(`data-testid=code-wrapper`, {
      has: page.locator(childSelector),
    })

    const codeHeader = await codeWrapperLocator.locator(`data-testid=code-header`)
    expect(await codeHeader.isVisible()).toBe(false)
  })
  test(`should show code-header with language`, async ({ page }) => {
    const childSelector = `text=/.*const language: string = "simple language".*/`
    const codeWrapperLocator = await page.locator(`data-testid=code-wrapper`, {
      has: page.locator(childSelector),
    })

    const codeHeader = await codeWrapperLocator.locator(`data-testid=code-header`)
    expect(await codeHeader.isVisible()).toBe(true)
    const lang = await codeHeader.locator(`[data-lang="ts"]`)
    await expect(lang).toContainText(`ts`)
  })
  test(`should show code-header with language & title`, async ({ page }) => {
    const childSelector = `text=/.*const withTitle = "simple language with title".*/`
    const codeWrapperLocator = await page.locator(`data-testid=code-wrapper`, {
      has: page.locator(childSelector),
    })

    const codeHeader = await codeWrapperLocator.locator(`data-testid=code-header`)
    expect(await codeHeader.isVisible()).toBe(true)
    const lang = await codeHeader.locator(`[data-lang="js"]`)
    await expect(lang).toContainText(`js`)
    const title = await codeHeader.locator(`data-testid=code-title`)
    await expect(title).toContainText(`title.js`)
  })
  test(`should show line numbers`, async ({ page }) => {
    const childSelector = `text=/.*1const lineNumbers = "simple language with title and line numbers".*/`
    const codeWrapperLocator = await page.locator(`data-testid=code-wrapper`, {
      has: page.locator(childSelector),
    })

    const one = await codeWrapperLocator.locator(`span:has-text("1")`)
    const two = await codeWrapperLocator.locator(`span:has-text("2")`)
    const three = await codeWrapperLocator.locator(`span:has-text("3")`)

    expect(await one.isVisible()).toBe(true)
    expect(await two.isVisible()).toBe(true)
    expect(await three.isVisible()).toBe(true)
  })
  test(`should show line numbers and line highlights`, async ({ page }) => {
    const childSelector = `text=/.*1const lineNumbers = "simple language with title and line numbers and highlight".*/`
    const codeWrapperLocator = await page.locator(`data-testid=code-wrapper`, {
      has: page.locator(childSelector),
    })

    const one = await codeWrapperLocator.locator(`span:has-text("1")`)
    const two = await codeWrapperLocator.locator(`span:has-text("2")`)
    const three = await codeWrapperLocator.locator(`span:has-text("3")`)
    const four = await codeWrapperLocator.locator(`span:has-text("4")`)

    expect(await one.isVisible()).toBe(true)
    expect(await two.isVisible()).toBe(true)
    expect(await three.isVisible()).toBe(true)
    expect(await four.isVisible()).toBe(true)

    const highlightCSS = /linear-gradient\(90deg, rgb\(140, 175, 255\)/gm

    await expect(await one.locator(`..`)).toHaveCSS(`background`, highlightCSS)
    await expect(await two.locator(`..`)).toHaveCSS(`background-color`, `rgba(0, 0, 0, 0)`)
    await expect(await three.locator(`..`)).toHaveCSS(`background`, highlightCSS)
    await expect(await four.locator(`..`)).toHaveCSS(`background`, highlightCSS)
  })
})
