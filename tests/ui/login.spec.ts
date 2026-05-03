import { test, expect } from '../../utils/fixtures';
import 'dotenv/config';

const VALID_EMAIL    = process.env.LOGIN_EMAIL    as string;
const VALID_PASSWORD = process.env.LOGIN_PASSWORD as string;

test.describe('Login Functionality', () => {
  test.afterEach(async ({ loginPage, clearUserSession }, testInfo) => {
    // Clear cookies and localStorage so each test starts from a clean state
    await clearUserSession();

    // On failure, log the URL where the test ended for easier debugging
    if (testInfo.status !== testInfo.expectedStatus) {
      console.error(`[${testInfo.title}] FAILED — final URL: ${loginPage.page.url()}`);
    }
  });

  // ─── TC-001 ───────────────────────────────────────────────────────────────
  test('TC-001: Successful login with valid credentials', async ({  loginPage }) => {
    // Enter valid registered credentials and submit
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);

    // Should leave the /login page on success
    await expect(loginPage.page).not.toHaveURL(/\/login/);

    // No error toast should be visible
    await expect(loginPage.errorToast).not.toBeVisible();
  });

  // ─── TC-002 ───────────────────────────────────────────────────────────────
  test('TC-002: Login with empty email and empty password shows both validation errors', async ({ loginPage }) => {
    // Click Sign In without filling any field
    await loginPage.signInButton.click();

    // Both inline validation messages must appear
    await expect(loginPage.emailError).toBeVisible();
    await expect(loginPage.passwordError).toBeVisible();
  });

  // ─── TC-003 ───────────────────────────────────────────────────────────────
  test('TC-003: Login with invalid email format shows email validation error', async ({ loginPage }) => {
    const invalidEmails = ['invalidemail', 'user@', 'user@domain'];

    for (const email of invalidEmails) {
      // Clear and enter invalid email
      await loginPage.emailInput.fill(email);
      await loginPage.passwordInput.fill('password123');
      await loginPage.signInButton.click();

      await expect(loginPage.emailError).toBeVisible();

      // Reset for next iteration
      await loginPage.emailInput.clear();
      await loginPage.passwordInput.clear();
    }
  });

  // ─── TC-004 ───────────────────────────────────────────────────────────────
  test('TC-004: Login with password shorter than 6 characters shows password validation error', async ({ loginPage }) => {
    // Enter valid email but a short password
    await loginPage.emailInput.fill('testuser@example.com');
    await loginPage.passwordInput.fill('12345');
    await loginPage.signInButton.click();

    await expect(loginPage.passwordError).toBeVisible();
    await expect(loginPage.emailError).not.toBeVisible();
  });

  // ─── TC-005 ───────────────────────────────────────────────────────────────
  test('TC-005: Login with wrong credentials is rejected and stays on login page', async ({ loginPage }) => {
    const loginResponsePromise = loginPage.page.waitForResponse(
      resp => resp.url().includes('/api/auth/login'),
      { timeout: 10000 }
    );

    await loginPage.login('wrong@email.com', 'wrongpassword');
    const response = await loginResponsePromise;

    await expect(response.status()).toBe(400);
    await expect(loginPage.page).toHaveURL(/\/login/);
  });


  // ─── TC-006 ───────────────────────────────────────────────────────────────
  test('TC-006: Register link navigates to the registration page', async ({ loginPage }) => {
    // Click the Register link at the bottom of the form
    await loginPage.registerLink.click();

    await expect(loginPage.page).toHaveURL(/\/register/);
  });

  // ─── TC-007 ───────────────────────────────────────────────────────────────
  test('TC-007: Login page displays all expected UI elements', async ({ loginPage }) => {
    // Page title
    await expect(loginPage.page).toHaveTitle('EventHub — Discover & Book Events');

    // Heading and subheading
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.subheading).toBeVisible();

    // Email field with correct placeholder
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.emailInput).toHaveAttribute('placeholder', 'you@email.com');

    // Password field
    await expect(loginPage.passwordInput).toBeVisible();

    // Sign In button
    await expect(loginPage.signInButton).toBeVisible();
    await expect(loginPage.signInButton).toBeEnabled();

    // Register link
    await expect(loginPage.registerLink).toBeVisible();

    // API docs link
    await expect(loginPage.apiDocsLink).toBeVisible();
  });

  // ─── TC-008 ───────────────────────────────────────────────────────────────
  test('TC-008: Password field masks typed characters', async ({ loginPage }) => {
    // The input type must be "password" to ensure characters are masked
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  // ─── TC-009 ───────────────────────────────────────────────────────────────
  test('TC-009: Login with uppercase email is accepted (case-insensitive match)', async ({ loginPage }) => {
    // Use uppercase version of the registered email
    await loginPage.login(VALID_EMAIL.toUpperCase(), VALID_PASSWORD);

    // Should redirect away from login — email matching is case-insensitive
    await expect(loginPage.page).not.toHaveURL(/\/login/);
  });

  // ─── TC-010 ───────────────────────────────────────────────────────────────
  test('TC-010: Login with leading/trailing whitespace in email', async ({ loginPage }) => {
    await loginPage.emailInput.fill(`  ${VALID_EMAIL}  `);
    await loginPage.passwordInput.fill(VALID_PASSWORD);
    await loginPage.signInButton.click();

    // Checking page.url() synchronously after click() is a race condition —
    // navigation may not have started yet. Instead, wait asynchronously for
    // either the URL to change away from /login (app trimmed whitespace and
    // logged in), or for an error to appear (app rejected the padded email).
    let navigatedAway = false;
    try {
      await loginPage.page.waitForURL(url => !url.pathname.includes('/login'), { timeout: 5000 });
      navigatedAway = true;
    } catch {
      // Did not navigate away within timeout — an error must be visible instead
    }

    if (navigatedAway) {
      await expect(loginPage.page).not.toHaveURL(/\/login/);
    } else {
      await expect(loginPage.emailError.or(loginPage.errorToast)).toBeVisible();
    }
  });
});
