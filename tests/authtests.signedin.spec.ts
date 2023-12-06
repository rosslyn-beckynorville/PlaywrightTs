import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';

test.beforeEach(async ({ page , baseURL}) => {

  if (baseURL != null)
  {
    await page.goto(baseURL)
  }
  else throw("Base URL is not defined in the config!");
});

test("Test the auth state, should already be signed in", async ({ page }) => {

  await expect(page.getByRole("heading", {name: "Authentication"})).toBeVisible()
});

test("Enable MFA link should navigate to the Enable Authenticator page", async({page}) =>{

  await page.getByText("Enable MFA").click()
  await expect(page.getByText("Scan the QR code to set up your authenticator app:")).toBeVisible()
});