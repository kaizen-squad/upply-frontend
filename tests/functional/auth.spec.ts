import { expect, test } from '@playwright/test';

test('redirects an unauthenticated visitor from a protected dashboard to login', async ({ page }) => {
  await page.goto('/client/dashboard');

  await expect(page).toHaveURL(/\/login$/);
});

test('returns an unauthenticated response from the session endpoint', async ({ request }) => {
  const response = await request.get('/api/auth/login');

  expect(response.ok()).toBe(true);
  await expect(response.json()).resolves.toMatchObject({ success: false });
});
