import { expect, type Page, test } from "@playwright/test";

const NOT_FOUND_TITLE = "Página não encontrada";

const expectNotFoundScreen = async (page: Page) => {
  await expect(
    page.getByRole("heading", { name: NOT_FOUND_TITLE })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Voltar para Home" })
  ).toBeVisible();
};

// These routes stream, so the HTTP status may be sent before the content decides it is a 404.
for (const path of [
  "/pt-BR/isso-nao-existe",
  "/isso-nao-existe",
  "/pt-BR/projects/projeto-que-nao-existe",
  "/pt-BR/projects/page/99",
  "/pt-BR/projects/page/abc",
]) {
  test(`${path} mostra a tela de 404`, async ({ page }) => {
    await page.goto(path);
    await expectNotFoundScreen(page);
  });
}

test("arquivo inexistente fora de um idioma responde 404 sem montar o site", async ({
  request,
}) => {
  const response = await request.get("/_vercel/insights/script.js");
  expect(response.status()).toBe(404);
});
