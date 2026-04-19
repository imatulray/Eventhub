import { Locator } from '@playwright/test'

export interface ILoginPage {
    // emailInput: Locator;
    // passwordInput: Locator;
    // signInButton: Locator;
    // dismissButton: Locator;
    // emailError: Locator;
    // passwordError: Locator;
    // errorToast: Locator;
    // registerLink: Locator;
    // apiDocsLink: Locator;
    // heading: Locator;
    // subheading: Locator;
    goToLogin(): Promise<void>;
    login(email: string, password: string): Promise<void>;

}