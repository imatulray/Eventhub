import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export const loginTest = base.extend<{
  loginPage: LoginPage;
  clearUserSession: () => Promise<void>;
  dismissErrorToast: () => Promise<void>;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToLogin();
    await loginPage.login("atulray@gmail.com", "Test@12345");
    await use(loginPage);
    await loginPage.page.close();
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