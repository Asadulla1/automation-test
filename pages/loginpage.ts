import { Page, Locator, expect } from "@playwright/test";

// Locators
const loginLink = (page: Page): Locator =>
  page.getByRole("link", { name: /Signup \/ Login/ });

const loginHeading = (page: Page): Locator =>
  page.getByRole("heading", { name: "Login to your account" });

const emailInput = (page: Page): Locator =>
  page.locator('[data-qa="login-email"]');

const passwordInput = (page: Page): Locator =>
  page.locator('[data-qa="login-password"]');

const loginButton = (page: Page): Locator =>
  page.locator('[data-qa="login-button"]');

const loggedInAs = (page: Page): Locator =>
  page.locator('a:has-text("Logged in as")');

const logoutLink = (page: Page): Locator =>
  page.getByRole("link", { name: /Logout/ });

// Actions
export async function launch(page: Page) {
  await page.goto("/");
  await expect(page).toHaveTitle(/Automation Exercise/);
  // Dismiss the cookie/consent popup if it appears
  const consent = page.locator(".fc-cta-consent");
  if (await consent.isVisible({ timeout: 3000 }).catch(() => false)) {
    await consent.click();
  }
}

export async function goToLoginPage(page: Page) {
  await loginLink(page).click();
  await expect(page).toHaveURL(/\/login/);
  await expect(loginHeading(page)).toBeVisible();
}

export async function login(page: Page, email: string, password: string) {
  await emailInput(page).fill(email);
  await passwordInput(page).fill(password);
  await loginButton(page).click();
}

export async function verifyLoginSuccess(page: Page, userName: string) {
  await expect(loggedInAs(page)).toBeVisible();
  await expect(loggedInAs(page)).toContainText(userName);
  await expect(logoutLink(page)).toBeVisible();
}
