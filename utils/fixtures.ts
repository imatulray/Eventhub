import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export const loginTest = base.extend<{
  loginPage: LoginPage;
  clearUserSession: () => Promise<void>;
  dismissErrorToast: () => Promise<void>;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    // Always navigate to login page to ensure clean state for each test
    await loginPage.goToLogin();
    await use(loginPage);
    // Navigate back to login page after test to ensure next test starts clean
    await loginPage.goToLogin();
  },

  clearUserSession: async ({ loginPage }, use) => {
    await use(async () => {
      await loginPage.page.context().clearCookies();
      await loginPage.page.evaluate(() => localStorage.clear());
    });
  },

  dismissErrorToast: async ({ loginPage }, use) => {
    await use(() => loginPage.dismissButton.click());
  },
});