import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';

test.beforeEach(async ({ page , baseURL}) => {

  if (baseURL != null)
  {
    await page.goto(baseURL)
    await page.getByRole('link', {name: "Sign in"}).click()
  }
  else throw("Base URL is not defined in the config!");
});

test("Able to sign in with correct credentials, username is displayed", async ({ page }) => {

  var usernameText:string = "BNQAUserTest@r10dev.com"
  await attempt_Login(page, usernameText,"Zqxwce12!HG")
  await expect(page.getByRole("heading", {name: usernameText})).toBeVisible()
});

test("Incorrect credentials prevents sign in attempt, error message displayed", async ({ page }) => {

  await attempt_Login(page, "Test","PasswordTest")
  await expect(page.getByText('Invalid login attempt', {exact: true})).toBeVisible()
});

export async function attempt_Login(page: Page, username: string, password: string) {

  await page.getByLabel("User name").fill(username)
  await page.getByLabel("Password").fill(password)
  await page.getByLabel("Remember me").click()
  await page.getByRole("checkbox").check()
  await page.getByRole("button").click()
}
