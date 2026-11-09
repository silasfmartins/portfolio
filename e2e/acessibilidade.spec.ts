import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ROUTES = [
  "/pt-BR",
  "/en",
  "/pt-BR/projects",
  "/en/projects",
  "/pt-BR/privacy",
  "/pt-BR/resume",
  "/pt-BR/isso-nao-existe",
];
const THEMES = ["light", "dark"];

for (const theme of THEMES) {
  for (const route of ROUTES) {
    test(`${route} sem falhas de acessibilidade no tema ${theme}`, async ({
      page,
    }) => {
      await page.addInitScript((value) => {
        localStorage.setItem("theme", value);
      }, theme);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      expect(
        violations.map(({ id, nodes }) => ({
          id,
          targets: nodes.map((node) => node.target.join(" ")),
        }))
      ).toEqual([]);
    });
  }
}
