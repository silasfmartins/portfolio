import { expect, test } from "@playwright/test";

const VALID_BODY = {
  email: "teste@example.com",
  message: "Mensagem de teste",
  name: "Pessoa Teste",
};

test.describe("formulário de contato", () => {
  test("a rota existe e recusa dados inválidos", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: { email: "invalido", message: "", name: "" },
    });

    expect(response.status()).toBe(400);
  });

  test("a isca para robôs não entrega a mensagem", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: { ...VALID_BODY, website: "https://spam.example.com" },
    });

    expect(response.status()).toBe(200);
  });

  test("mostra o erro de cada campo", async ({ page }) => {
    await page.goto("/pt-BR");
    await page.getByRole("button", { name: "Enviar Mensagem" }).click();

    await expect(page.getByText("Informe seu nome")).toBeVisible();
    await expect(page.getByText("Escreva sua mensagem")).toBeVisible();
  });

  test("envia para a rota certa", async ({ page }) => {
    // Intercepted so the test never reaches the real webhook.
    let sent: unknown;
    await page.route("**/api/contact", async (route) => {
      sent = route.request().postDataJSON();
      await route.fulfill({ json: { message: "ok" } });
    });

    await page.goto("/pt-BR");
    await page.getByRole("textbox", { name: "Nome" }).fill(VALID_BODY.name);
    await page.getByRole("textbox", { name: "Email" }).fill(VALID_BODY.email);
    await page
      .getByRole("textbox", { name: "Mensagem" })
      .fill(VALID_BODY.message);
    await page.getByRole("button", { name: "Enviar Mensagem" }).click();

    await expect(page.getByText("Mensagem enviada com sucesso!")).toBeVisible();
    expect(sent).toMatchObject(VALID_BODY);
  });
});
