import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';

var username = process.env.USERNAME
var password = process.env.PASSWORD

test.beforeEach(async ({ page , baseURL}) => {

  if (baseURL && username && password != null)
  {
    await page.goto(baseURL)
    await page.getByRole('link', {name: "Sign in"}).click()
  }
  else throw("Environment variables not correctly defined in the config!");
});

test("Able to sign in with persistent session", async ({ page }) => {

  await attempt_Login(page, username, password, true)
  await expect(page.getByRole("heading", {name: username})).toBeVisible()
  await expect(page.getByText("True")).toBeVisible()
});

test("Able to sign in without persistent session", async ({ page }) => {

  await attempt_Login(page, username, password)
  await expect(page.getByRole("heading", {name: username})).toBeVisible()
});

test("Incorrect credentials prevents sign in attempt, error message displayed", async ({ page }) => {

  await attempt_Login(page, "Test","PasswordTest")
  await expect(page.getByText('Invalid login attempt')).toBeVisible()
});

test("Able to send a reset password request, success message is displayed", async({ page }) => {

  await page.getByText("Forgot your password?").click()
  await page.getByPlaceholder('Your email address').fill("sdfdf@dsfdsf.df")
  await page.getByText("Request reset").click()
  await expect(page.getByText("We will send a password reset"))
  .toBeVisible()
});

test("Able to cancel a reset password request and be returned to the sign in page", async({ page }) => {

  await page.getByText("Forgot your password?").click()
  await page.getByText("Never mind").click()
  await expect(page.getByRole("button", {name: "Sign in"})).toBeVisible()
});

export async function attempt_Login(page: Page, username: string, password: string, rememberMe: boolean = false) {

  await page.getByLabel("User name").fill(username)
  await page.getByLabel("Password").fill(password)
  if (rememberMe) {
    await page.getByRole("checkbox").check()
  }
  await page.getByRole("button").click()
}
