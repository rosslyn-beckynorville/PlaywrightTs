import { test as setup, expect } from '@playwright/test';

const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  if (process.env.BASEURL && process.env.USERNAME && process.env.PASSWORD != null) {
    await page.goto(process.env.BASEURL)
    await page.getByRole('link', { name: "Sign in" }).click()
    await page.getByLabel('User Name').fill(process.env.USERNAME);
    await page.getByLabel('Password').fill(process.env.PASSWORD);
    await page.getByRole("button").click()
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(page.getByRole("heading", {name: process.env.USERNAME})).toBeVisible()
    // End of authentication steps.

    await page.context().storageState({ path: authFile });
    }
  else throw("Environment variables not correctly defined!");
});