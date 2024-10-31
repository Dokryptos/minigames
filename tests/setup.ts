import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

const PLAYWRIGHT_CREDENTIALS = process.env.PLAYWRIGHT_CREDENTIALS;

setup('login', async ({ page, context }) => {
  if (!PLAYWRIGHT_CREDENTIALS) throw new Error('PLAYWRIGHT_CREDENTIALS is not defined');

  /**
   * skip loader
   */
  await context.addInitScript(() => {
    window.localStorage.setItem('loader-has-been-seen', 'true');
    window.localStorage.setItem('redirect', '/tarot');
  });

  await page.goto('/tarot');
  await page.waitForURL('**/sign-in');

  await page.waitForLoadState();

  const { email, password } = JSON.parse(PLAYWRIGHT_CREDENTIALS);

  await page.getByLabel('Identifiant').fill(email);
  await page.getByLabel('Mot de passe').fill(password);
  await page.getByRole('button', { name: 'Connexion' }).click();

  await page.waitForURL('**/tarot/boxes');

  await expect(page.getByText("niveau d'enquête")).toBeVisible();

  /**
   * TODO - Add cookies to the context when supporting cookies
   */
  // const cookies = await context.cookies();

  // context.addCookies([
  //   {
  //     name: 'session',
  //     value: cookies.find((cookie) => cookie.name === 'session')?.value as string,
  //     domain: 'localhost:3000',
  //     path: '/',
  //     expires: -1,
  //     httpOnly: false,
  //     secure: false,
  //     sameSite: 'Lax',
  //   },
  // ]);

  await page.context().storageState({ path: STORAGE_STATE });
});
