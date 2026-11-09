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
