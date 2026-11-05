import { expect, type Page, test } from "@playwright/test";

const SEARCH_LABEL = "Buscar projetos";
const TECHNOLOGY_LABEL = "Filtrar por tecnologia";
const QUERY_IN_URL = /[?&]q=/u;
const TECH_IN_URL = /[?&]tech=/u;
const COMBINING_MARKS = /\p{M}/gu;

async function getFirstTitle(page: Page) {
  const title = await page.locator("main h3").first().textContent();
  return title?.trim() ?? "";
}

test.describe("busca de projetos", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pt-BR/projects");
    await expect(page.getByLabel(SEARCH_LABEL)).toBeVisible();
  });

  test("guarda a busca na URL e limpa ao esvaziar o campo", async ({
    page,
  }) => {
    const search = page.getByLabel(SEARCH_LABEL);
    const firstTitle = await getFirstTitle(page);

    await search.fill(firstTitle);
    await expect(page).toHaveURL(QUERY_IN_URL);
    await expect(page.getByRole("status")).toContainText("encontrado");
    await expect(
      page.locator("main h3:visible", { hasText: firstTitle }).first()
    ).toBeVisible();

    await search.fill("");
    await expect(page).not.toHaveURL(QUERY_IN_URL);
    await expect(page.getByRole("status")).toBeEmpty();
  });

  test("ignora acentos e maiúsculas", async ({ page }) => {
    const firstTitle = await getFirstTitle(page);
    const withoutAccents = firstTitle
      .normalize("NFD")
      .replace(COMBINING_MARKS, "")
      .toUpperCase();

    await page.getByLabel(SEARCH_LABEL).fill(withoutAccents);
    await expect(page.getByRole("status")).toContainText("encontrado");
    await expect(page.getByText("Nenhum projeto combina")).toBeHidden();
  });

  test("mostra aviso sem resultados e limpa a busca", async ({ page }) => {
    await page.getByLabel(SEARCH_LABEL).fill("xyzxyz-sem-resultado");
    await expect(page.getByText("Nenhum projeto combina")).toBeVisible();

    await page.getByRole("button", { name: "Limpar busca" }).click();
    await expect(page).not.toHaveURL(QUERY_IN_URL);
    await expect(page.locator("main h3:visible").first()).toBeVisible();
  });

  test("filtra por tecnologia e abre pelo link compartilhado", async ({
    page,
  }) => {
    const select = page.getByLabel(TECHNOLOGY_LABEL);
    const technology =
      (await select.locator("option").nth(1).textContent()) ?? "";

    await select.selectOption(technology);
    await expect(page).toHaveURL(TECH_IN_URL);
    await expect(page.getByRole("status")).toContainText("encontrado");

    await page.reload();
    await expect(page.getByLabel(TECHNOLOGY_LABEL)).toHaveValue(technology);
    await expect(page.getByRole("status")).toContainText("encontrado");
  });
});
