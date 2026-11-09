import { expect, test } from "@playwright/test";

const PDF_SIGNATURE = "%PDF-";

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

test("a home oferece o currículo nos dois idiomas", async ({ page }) => {
  await page.goto("/pt-BR");

  await expect(
    page.getByRole("link", { name: "Baixar currículo em Português" })
  ).toHaveAttribute("href", "/api/resume/pt-BR");
  await expect(
    page.getByRole("link", { name: "Baixar currículo em English" })
  ).toHaveAttribute("href", "/api/resume/en");
});
