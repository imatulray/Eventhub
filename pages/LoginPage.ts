import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ILoginPage } from './interfaces/LoginPage.types';

const LOGIN_URL = 'https://eventhub.rahulshettyacademy.com/login';

export class LoginPage extends BasePage implements ILoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly dismissButton: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly errorToast: Locator;
  readonly registerLink: Locator;
  readonly apiDocsLink: Locator;
  readonly heading: Locator;
  readonly subheading: Locator;

  constructor(page: Page) {
    super(page);

    // ── Inputs ──────────────────────────────────────────────────────────────
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });

    // ── Buttons ─────────────────────────────────────────────────────────────
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.dismissButton = page.getByRole('button', { name: 'Dismiss' });

    // ── Validation messages ──────────────────────────────────────────────────
    this.emailError = page.getByText('Enter a valid email');
    this.passwordError = page.getByText('Password must be at least 6 characters');

    // ── Toast notification ───────────────────────────────────────────────────
    this.errorToast = page.getByText('Invalid email or password');

    // ── Links ────────────────────────────────────────────────────────────────
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.apiDocsLink = page.getByRole('link', { name: 'API Documentation (Swagger)' });

    // ── Headings / text ──────────────────────────────────────────────────────
    this.heading = page.getByRole('heading', { name: 'Sign in to EventHub' });
    this.subheading = page.getByText('Enter your credentials to continue');
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  async goToLogin(): Promise<void> {
    await this.navigate(LOGIN_URL);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
