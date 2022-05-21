import type { PlaywrightTestConfig } from "@playwright/test"
import { devices } from "@playwright/test"

const config: PlaywrightTestConfig = {
  testDir: `./playwright`,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [[`html`, { outputFolder: `./playwright/report` }]],
  webServer: {
    command: process.env.IS_BUILD ? `yarn build && yarn serve` : `yarn develop`,
    port: process.env.IS_BUILD ? 9000 : 8000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    actionTimeout: 0,
    trace: `on-first-retry`,
  },
  projects: [
    {
      name: `chromium`,
      use: {
        ...devices[`Desktop Chrome`],
      },
    },
  ],
  outputDir: `./playwright/test-results`,
}

export default config
