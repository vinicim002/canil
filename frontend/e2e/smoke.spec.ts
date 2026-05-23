import { test, expect } from "@playwright/test";

test.describe("Páginas públicas", () => {
  test("home carrega", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Canil/i);
  });

  test("página de agendar visita carrega", async ({ page }) => {
    await page.goto("/agendar-visita");
    await expect(
      page.getByRole("heading", { name: /agendar visita/i }),
    ).toBeVisible();
  });

  test("login carrega", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByLabel(/e-mail/i)).toBeVisible();
    await expect(page.getByLabel(/^senha$/i)).toBeVisible();
  });

  test("redefinir senha carrega com token na URL", async ({ page }) => {
    await page.goto("/redefinir-senha?token=test-token");
    await expect(page.getByRole("heading", { name: /nova senha/i })).toBeVisible();
  });
});
