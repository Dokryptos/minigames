## Playwright Integration

Playwright is a Node.js library to automate Chromium, Firefox, and WebKit with a single API. It enables cross-browser web automation that is ever-green, capable, reliable, and fast.

### Running Playwright


You can run Playwright using the `e2e` script in the `package.json` file:

```bash
pnpm e2e
```

### Environment Variables

You'll need to add some environment variables when launching the command.

```bash
PLAYWRIGHT_CREDENTIALS='{"email":"YOUR_ACCOUNT_EMAIL","password":"YOUR_PASSWORD"}' pnpm e2e
```

If you want to run the tests with your dev server :

```bash
pnpm dev

PLAYWRIGHT_CREDENTIALS='{"email":"YOUR_ACCOUNT_EMAIL","password":"YOUR_PASSWORD"}' CI=true PREVIEW_URL=http://localhost:5173 pnpm e2e
```

You can also add the `--ui` flag to see the browser while the tests are running:

```bash
pnpm e2e --ui
```

### Testing with Playwright

Here's an example of a simple test:

```javascript
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('http://example.com');
  const title = await page.title();
  expect(title).toBe('Example Domain');
});
```

In this test, we're navigating to `http://example.com` and checking that the title is 'Example Domain'.

### Setup

The `setup.ts` is played before each test file. It'll sign in and store login credentials to the local storage in the `playwright` folder.
A report will be generated in the `playwright-report` folder.

### Further Reading

For more detailed information, check out the [Playwright API documentation](https://playwright.dev/docs/api/class-playwright).
