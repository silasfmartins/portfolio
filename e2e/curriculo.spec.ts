import { expect, type Locator, type Page, test } from "@playwright/test";

const PDF_SIGNATURE = "%PDF-";
const RESUME_URL = /\/pt-BR\/resume$/u;
const PAGE_OBJECT = /\/Type \/Page\b(?!s)/gu;
const MAX_PAGES = 1;

for (const [url, fileName] of [
  ["/api/resume/pt-BR", "curriculo-silas-martins.pdf"],
  ["/api/resume/en", "resume-silas-martins.pdf"],
  ["/api/resume/pt-BR?style=simple", "curriculo-simples-silas-martins.pdf"],
  ["/api/resume/en?style=simple", "simple-resume-silas-martins.pdf"],
] as const) {
  test(`gera o currículo em PDF com 1 página (${url})`, async ({ request }) => {
    const response = await request.get(url);
    const pdf = await response.body();

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("application/pdf");
    expect(response.headers()["content-disposition"]).toContain(fileName);
    expect(pdf.subarray(0, 5).toString()).toBe(PDF_SIGNATURE);
    expect(
      pdf.toString("latin1").match(PAGE_OBJECT)?.length
    ).toBeLessThanOrEqual(MAX_PAGES);
  });
}

test("idioma inexistente não gera currículo", async ({ request }) => {
  const response = await request.get("/api/resume/fr");
  expect(response.status()).toBe(404);
});

test("baixar currículo abre a escolha de modelo e idioma", async ({ page }) => {
  await page.goto("/pt-BR");
  const main = page.getByRole("main");

  await openResumeMenu(main.getByRole("button", { name: "Baixar currículo" }));
  const modern = main.getByRole("group", { name: "Moderno, com foto" });
  const simple = main.getByRole("group", { name: "Simples, CV tradicional" });

  await expect(
    modern.getByRole("link", { name: "Português PDF" })
  ).toHaveAttribute("href", "/api/resume/pt-BR");
  await expect(
    modern.getByRole("link", { name: "English PDF" })
  ).toHaveAttribute("href", "/api/resume/en");
  await expect(
    simple.getByRole("link", { name: "Português PDF" })
  ).toHaveAttribute("href", "/api/resume/pt-BR?style=simple");
  await expect(
    simple.getByRole("link", { name: "English PDF" })
  ).toHaveAttribute("href", "/api/resume/en?style=simple");

  await page.keyboard.press("Escape");
  await expect(modern).toBeHidden();
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

test("a página do currículo troca entre o modelo moderno e o simples", async ({
  page,
}) => {
  await setPdfViewer(page, true);
  await page.goto("/pt-BR/resume");
  const simple = page.getByRole("button", { name: "Simples" });

  // A click before hydration does nothing, so retry until the button reports it is pressed.
  await expect(async () => {
    await simple.click();
    await expect(simple).toHaveAttribute("aria-pressed", "true", {
      timeout: 1000,
    });
  }).toPass();
  await expect(page.locator('object[type="application/pdf"]')).toHaveAttribute(
    "data",
    "/api/resume/pt-BR?preview=1&style=simple"
  );
  await expect(page.getByRole("button", { name: "Moderno" })).toHaveAttribute(
    "aria-pressed",
    "false"
  );
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
    header
      .getByRole("group", { name: "Modern, with photo" })
      .getByRole("link", { name: "Português PDF" })
  ).toHaveAttribute("href", "/api/resume/pt-BR");
});
