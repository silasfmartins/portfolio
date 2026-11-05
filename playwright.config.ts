import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  forbidOnly: Boolean(process.env.CI),
  fullyParallel: true,
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  reporter: [["list"]],
  retries: process.env.CI ? 2 : 0,
  testDir: "./e2e",
  use: {
    baseURL,
    locale: "pt-BR",
    trace: "on-first-retry",
  },
  // Runs against the production build: run `pnpm build` first.
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `pnpm exec next start --port ${PORT}`,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
        url: `${baseURL}/pt-BR`,
      },
});
