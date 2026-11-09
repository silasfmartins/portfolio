import { instant } from "@next/playwright";
import { expect, test } from "@playwright/test";

// Needs a build made with EXPOSE_TESTING_API=1 (the CI does this); run locally with
// `EXPOSE_TESTING_API=1 pnpm build && EXPOSE_TESTING_API=1 pnpm test:e2e`.
test.skip(
  process.env.EXPOSE_TESTING_API !== "1",
  "requires a build with EXPOSE_TESTING_API=1"
);

const PAGE_TWO_URL = "/pt-BR/projects/page/2";
const PROJECT_URL = /\/pt-BR\/projects\/(?!page)[^/]+$/u;

test("a lista de projetos aparece inteira na carga inicial", async ({
  page,
  baseURL,
}) => {
  await instant(
    page,
    async () => {
      await page.goto("/pt-BR/projects");
      await expect(
        page.getByRole("heading", { level: 1, name: "Meus Projetos" })
      ).toBeVisible();
      await expect(page.locator("main a h3").first()).toBeVisible();
    },
    { baseURL }
  );
});

test("a página 2 de projetos abre na hora", async ({ page }) => {
  await page.goto("/pt-BR/projects");
  // The CI builds with the sample content, which has a single page of projects.
  test.skip(
    (await page.locator(`a[href="${PAGE_TWO_URL}"]`).count()) === 0,
    "only one page of projects"
  );

  await instant(page, async () => {
    await page.locator(`a[href="${PAGE_TWO_URL}"]`).first().click();
    await page.waitForURL((url) => url.pathname === PAGE_TWO_URL);
    await expect(page.locator("main a h3:visible").first()).toBeVisible();
  });
});

test("abrir um projeto mostra o esqueleto na hora, sem travar", async ({
  page,
}) => {
  await page.goto("/pt-BR/projects");

  await instant(page, async () => {
    await page.locator("main a[href*='/projects/']:has(h3)").first().click();
    await page.waitForURL(PROJECT_URL);
    await expect(page.locator("header")).toBeVisible();
    await expect(
      page.getByText("Carregando detalhes do projeto...")
    ).toBeVisible();
  });

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
