import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page.getByRole('heading', { name: 'HOME' })).toBeVisible();

  await expect(page.locator('h1')).toHaveText('HOME');

  await expect(
    page.getByRole('heading', {
      name: 'image with next/image. width and height',
    }),
  ).toBeVisible();
});
