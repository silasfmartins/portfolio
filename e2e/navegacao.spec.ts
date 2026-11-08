import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ENGLISH_URL = /\/en$/u;
const ENGLISH_PROJECTS_URL = /\/en\/projects$/u;
const PROJECT_URL = /\/projects\/[^/]+$/u;
const DARK_THEME = /dark/u;
const SEARCH_IN_URL = /[?&]search=/u;

test("troca o idioma e mantém a tela", async ({ page, isMobile }) => {
  test.skip(isMobile, "o seletor fica dentro do menu no celular");

  await page.goto("/pt-BR");
  await page.getByRole("button", { name: "Mudar idioma para EN" }).click();

  await expect(page).toHaveURL(ENGLISH_URL);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("endereços antigos em espanhol vão para o inglês", async ({ page }) => {
  await page.goto("/es/projects");

  await expect(page).toHaveURL(ENGLISH_PROJECTS_URL);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("o tema escolhido vale desde o primeiro carregamento", async ({
  page,
}) => {
  await page.addInitScript(() => localStorage.setItem("theme", "dark"));
  await page.goto("/pt-BR");

  await expect(page.locator("html")).toHaveClass(DARK_THEME);
});

test("busca rápida abre com o atalho e leva ao projeto", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "o atalho é de teclado");

  await page.goto("/pt-BR/projects");
  await expect(page.getByLabel("Buscar projetos")).toBeVisible();
  await expect(page.getByText("Ctrl + K")).toBeVisible();
  const title = (await page.locator("main h3").first().textContent()) ?? "";

  await page.keyboard.press("Control+K");
  const input = page.getByRole("dialog").getByRole("combobox");
  await expect(input).toBeFocused();

  await input.fill(title.trim());
  await expect(page).toHaveURL(SEARCH_IN_URL);
  await input.press("Enter");
  await expect(page).toHaveURL(PROJECT_URL);
  await expect(page).not.toHaveURL(SEARCH_IN_URL);
});

test("a busca rápida abre por link e fecha com Esc", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "o modal fica no cabeçalho do desktop");

  await page.goto("/pt-BR?search=docker");
  const input = page.getByRole("dialog").getByRole("combobox");
  await expect(input).toHaveValue("docker");

  await input.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page).not.toHaveURL(SEARCH_IN_URL);
});

test("a busca rápida separa páginas e projetos, sem falhas de acessibilidade", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "o modal fica no cabeçalho do desktop");

  await page.goto("/pt-BR?search=");
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("group", { name: "Páginas" })).toBeVisible();
  await expect(dialog.getByRole("group", { name: "Projetos" })).toBeVisible();

  const { violations } = await new AxeBuilder({ page })
    .include("dialog")
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(violations.map(({ id }) => id)).toEqual([]);
});

test("publica robots, sitemap e manifest", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("sitemap.xml");

  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("/pt-BR/projects");

  const manifest = await request.get("/manifest.webmanifest");
  expect((await manifest.json()).name).toBe("Silas Martins");
});

test("a página de privacidade abre pelo rodapé", async ({ page }) => {
  await page.goto("/pt-BR");
  await page
    .locator("footer")
    .getByRole("link", { name: "Privacidade" })
    .click();

  await expect(
    page.getByRole("heading", { level: 1, name: "Privacidade" })
  ).toBeVisible();
  await expect(page.getByText("Lei 13.709/2018")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Seus direitos" })
  ).toBeVisible();
});
