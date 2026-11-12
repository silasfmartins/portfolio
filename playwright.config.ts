import { defineConfig, devices } from "@playwright/test";

// Uncommon port: other local projects use 3000-3100, and a server left there would answer instead.
const PORT = 4317;
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
    // Always headless, never the UI mode or a visible window. The tests are paused since
    // November 12, 2026 (not run locally or in CI). When they return, CI only: no browser is
    // installed on the Mac; Dia ignores --headless and Safari has no headless mode.
    headless: true,
    locale: "pt-BR",
    trace: "on-first-retry",
  },
  // Runs against the production build: run `pnpm build` first.
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `pnpm exec next start --port ${PORT}`,
        // Never reuse: a server already on the port may be another project or an old build.
        reuseExistingServer: false,
        timeout: 60_000,
        url: `${baseURL}/pt-BR`,
      },
});
