import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EventsPage } from '../pages/EventsPage';

// Declare the types of your fixtures.
type MyFixtures = {
  loginPage: LoginPage;
  eventsPage: EventsPage;
  clearUserSession: () => Promise<void>;
};

export const test = base.extend<MyFixtures>
({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    // Always navigate to login page to ensure clean state for each test
    await loginPage.goToLogin();
    await use(loginPage);
    // Navigate back to login page after test to ensure next test starts clean
    // try {
    //   await loginPage.logout();
    // } catch (err) {
    //   // ignore errors during logout to avoid teardown failures when logout button is absent
    // }
  },

  eventsPage: async({ page }, use) =>{
    await use(new EventsPage(page));
  },

  clearUserSession: async ({ loginPage }, use) => {
    await use(async () => {
      await loginPage.page.context().clearCookies();
      await loginPage.page.evaluate(() => localStorage.clear());
    });
  },
});
export { expect } from '@playwright/test';