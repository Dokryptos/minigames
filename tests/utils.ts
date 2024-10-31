import { Page } from '@playwright/test';

async function sendEndedEvent(page: Page, selector: string) {
  const audios = await page.locator(selector).all();

  audios.forEach((locator) => {
    locator.dispatchEvent('ended');
  });
}

async function closeModal(page: Page) {
  await page
    .getByRole('button')
    .filter({ has: page.locator('iconify-icon[icon="lucide:x"]') })
    .click();
}

export { sendEndedEvent, closeModal };
