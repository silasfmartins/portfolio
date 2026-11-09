import { expect, type Locator, type Page, test } from "@playwright/test";

const PDF_SIGNATURE = "%PDF-";
const RESUME_URL = /\/pt-BR\/resume$/u;

for (const [locale, fileName] of [
  ["pt-BR", "curriculo-silas-martins.pdf"],
  ["en", "resume-silas-martins.pdf"],
] as const) {
  test(`gera o currículo em PDF (${locale})`, async ({ request }) => {
    const response = await request.get(`/api/resume/${locale}`);

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("application/pdf");
    expect(response.headers()["content-disposition"]).toContain(fileName);
    expect((await response.body()).subarray(0, 5).toString()).toBe(
      PDF_SIGNATURE
    );
  });
}

test("idioma inexistente não gera currículo", async ({ request }) => {
  const response = await request.get("/api/resume/fr");
  expect(response.status()).toBe(404);
});

test("baixar currículo abre a escolha de idioma", async ({ page }) => {
  await page.goto("/pt-BR");
  const main = page.getByRole("main");

  await openResumeMenu(main.getByRole("button", { name: "Baixar currículo" }));
  await expect(
    main.getByRole("link", { name: "Português PDF" })
  ).toHaveAttribute("href", "/api/resume/pt-BR");
  await expect(main.getByRole("link", { name: "English PDF" })).toHaveAttribute(
    "href",
    "/api/resume/en"
  );

  await page.keyboard.press("Escape");
  await expect(main.getByRole("link", { name: "English PDF" })).toBeHidden();
});

// A click before hydration does nothing, so retry until the menu reports it is open.
async function openResumeMenu(button: Locator) {
  await expect(async () => {
    if ((await button.getAttribute("aria-expanded")) !== "true") {
      await button.click();
    }
    await expect(button).toHaveAttribute("aria-expanded", "true", {
      timeout: 1000,
    });
  }).toPass();
}

const setPdfViewer = (page: Page, enabled: boolean) =>
  page.addInitScript((value) => {
    Object.defineProperty(navigator, "pdfViewerEnabled", { value });
  }, enabled);

test("com visualizador de PDF, mostra o currículo na página", async ({
  page,
}) => {
  await setPdfViewer(page, true);
  await page.goto("/pt-BR/resume");

  await expect(
    page.getByRole("heading", { level: 1, name: "Currículo" })
  ).toBeVisible();
  await expect(page.locator('object[type="application/pdf"]')).toHaveAttribute(
    "data",
    "/api/resume/pt-BR?preview=1"
  );
  await expect(
    page.getByRole("main").getByRole("button", { name: "Baixar currículo" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Abrir em nova aba" })
  ).toHaveAttribute("href", "/api/resume/pt-BR?preview=1");
});

test("sem visualizador de PDF (como no celular), mostra o botão para abrir", async ({
  page,
}) => {
  await setPdfViewer(page, false);
  await page.goto("/pt-BR/resume");

  await expect(page.getByText("Seu navegador não mostra o PDF")).toBeVisible();
  await expect(page.locator("object")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Abrir em nova aba" })
  ).toBeVisible();
});

test("a pré-visualização abre o PDF na página, sem baixar", async ({
  request,
}) => {
  const response = await request.get("/api/resume/pt-BR?preview=1");

  expect(response.headers()["content-disposition"]).toContain("inline");
  expect(response.headers()["x-frame-options"]).toBe("SAMEORIGIN");
});

test("a home leva à página do currículo", async ({ page }) => {
  await page.goto("/pt-BR");
  await page.getByRole("link", { name: "Ver currículo" }).click();

  await expect(page).toHaveURL(RESUME_URL);
});

test("o cabeçalho oferece o currículo nos dois idiomas", async ({
  page,
  isMobile,
}) => {
  await page.goto("/en");
  const header = page.getByRole("banner");

  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
  }

  await openResumeMenu(
    header.getByRole("button", {
      name: isMobile ? "Download résumé" : "Résumé",
    })
  );
  await expect(
    header.getByRole("link", { name: "Português PDF" })
  ).toHaveAttribute("href", "/api/resume/pt-BR");
});
